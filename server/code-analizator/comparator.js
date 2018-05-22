const jsAnalyzer = require('./metrics-js');
const cssAnalyzer = require('./metrics-css');
const elasticWrapper = require('./elastic');
const FlatUtils = require('./utils');


class Comparator {
    constructor() {
    }

    get notFoundResp() {
        return {
            fromEditor: null,
            fromDb: null,
            message: "All metrics of this code are different. Doesn't match anything..."
        }
    };

    async compare(programCode, type) {
        const allCodeFiles = await this.getData(type);
        const codesMetricsData = await elasticWrapper.ElasticApiWrapper.obtainMetrics(allCodeFiles, type);
        const codesMetrics = codesMetricsData.map(i => JSON.parse(i.data));
        const metricToCompare = type === 'js' ? jsAnalyzer.getJSMetrics({programCode}) :
            await cssAnalyzer.analyze({programCode});
        return type === 'js' ? this.compareJSMetrics(codesMetrics, metricToCompare)
            : this.compareCssMetrics(codesMetrics, metricToCompare);

    }

    async getData(type) {
        const query = {
            index: `${type}code`,
            type: `${type}code`,
            body: {
                query: {
                    match_all: {}
                }
            }
        };
        const elasticData = await elasticWrapper.ElasticApiWrapper.makeElasticSelect(query);
        return elasticData.map(elasticItem => elasticItem._source);
    }

    compareCssMetrics(codesMetrics, metricToCompare) {
        const equalCode = codesMetrics.filter(i => i.hashCode === metricToCompare.hashCode);
        if (equalCode.length) {
            return {
                fromEditor: metricToCompare.metrics,
                fromDb: equalCode[0].metrics,
                message: `Code are equal to ${equalCode[0].fileName}`

            }
        }
        return this.analyzeCssMetrics(codesMetrics, metricToCompare);
    }


    compareJSMetrics(codesMetrics, metricToCompare) {
        const equalCode = codesMetrics.filter(i => i.hashCode === metricToCompare.hashCode);
        if (equalCode.length) {
            return {
                fromEditor: metricToCompare,
                fromDb: equalCode[0],
                message: `Code are equal to ${equalCode[0].fileName}`
            }
        }
        return this.analyzeJSMetrics(codesMetrics, metricToCompare);
    }

    analyzeCssMetrics(codesMetrics, metricToCompare) {
        let statistics = [];
        for (let i = 0; i < codesMetrics.length; i++) {
            let codeMetric = codesMetrics[i].metrics;
            let equalMetric = Object.keys(codeMetric).reduce((acc, cur) => {
                if (codeMetric[cur] === metricToCompare.metrics[cur]) {
                    acc[cur] = codeMetric[cur];
                }
                return acc;
            }, {});
            statistics.push({
                equalMetric,
                count: Object.keys(equalMetric).length, index: i, name: codesMetrics[i].fileName
            });
        }
        const mostProbableStat = statistics.sort((a, b) => b.count - a.count)[0];
        if (!mostProbableStat.count) {
            return this.notFoundResp;
        }
        return {
            fromEditor: metricToCompare.metrics,
            fromDb: codesMetrics[mostProbableStat.index].metrics,
            message: `The this code similar with file: ${mostProbableStat.name}`
        }
    }

    analyzeJSMetrics(codesMetrics, metricToCompare) {
        let statistics = [];
        let flattenMetricToCompare = FlatUtils.flatten(metricToCompare);
        const exclude = ['identifiers', 'functions'];
        for (let i = 0; i < codesMetrics.length; i++) {
            let codeMetric = FlatUtils.flatten(codesMetrics[i]);
            let equalMetric = Object.keys(codeMetric).reduce((acc, cur) => {
                if (codeMetric[cur] === flattenMetricToCompare[cur]) {
                    acc[cur] = codeMetric[cur];
                }
                return acc;
            }, {});
            statistics.push({
                equalMetric,
                count: Object.keys(equalMetric).length, index: i, name: codesMetrics[i].fileName
            });
        }
        const mostProbableStat = statistics.sort((a, b) => b.count - a.count)[0];
        if (!mostProbableStat.count) {
            return this.notFoundResp;
        }
        const flattenDb = this.filterByExcludingKeys(mostProbableStat.equalMetric, exclude);
        const flattenEditor = this.filterByExcludingKeys(flattenMetricToCompare, exclude);
        return {
            fromEditor: metricToCompare,
            fromDb: codesMetrics[mostProbableStat.index],
            message: `The this code similar with file: ${mostProbableStat.name}`,
            flattenDb,
            flattenEditor
        }
    }

    filterByExcludingKeys(props, filterKey) {
        return Object.keys(props).reduce((acc, cur) => {
            let isExclude = !!filterKey.filter(i => cur.includes(i)).length;
            if (!isExclude) {
                const prop = cur.replace('aggregate.','');
                acc[prop] = props[cur];
            }
            return acc;
        }, {});
    }

}

module.exports = new Comparator();