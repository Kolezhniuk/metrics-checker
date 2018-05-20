const jsAnalyzer = require('./metrics-js');
const cssAnalyzer = require('./metrics-css');
const elasticWrapper = require('./elastic');


class Comparator {
    constructor() {
    }

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
                fromEditor: metricToCompare,
                fromDb: equalCode[0],
                message: "Codes are equal"

            }
        }
        return this.analyzeCssMetrics(codesMetrics, metricToCompare);
    }


    compareJSMetrics(codesMetrics, metricToCompare) {

    }

    analyzeCssMetrics(codesMetrics, metricToCompare) {
        let statistics = [];
        for (let i = 0; i < codesMetrics.length; i++) {
            let codeMetric = codesMetrics[i].metrics;
            let equalMetric = Object.keys(codeMetric).reduce((acc, cur) => {
                if (codeMetric[cur] && codeMetric[cur] === metricToCompare.metrics[cur]) {
                    acc[cur] = codeMetric[cur];
                }
                return acc;
            }, {});
            statistics.push({equalMetric, count: Object.keys(equalMetric).length, name: codesMetrics[i].fileName});
        }
        if (!statistics.length) {
            return {
                fromEditor: metricToCompare,
                fromDb: null,
                message: "No one code metric aren't equal"
            }
        }
        let mostProbableStat = statistics.sort((a, b) => b.count - a.count)[0];
        return {
            fromEditor: metricToCompare.metrics,
            fromDb: mostProbableStat.equalMetric,
            message: `The this code very similar with file: ${mostProbableStat.name}`
        }
    }
}

module.exports = new Comparator();