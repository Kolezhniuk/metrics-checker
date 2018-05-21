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
                fromEditor: metricToCompare.metrics,
                fromDb: equalCode[0].metrics,
                message: `Codes are equal to ${equalCode[0].fileName}`

            }
        }
        return this.analyzeCssMetrics(codesMetrics, metricToCompare);
    }


    compareJSMetrics(codesMetrics, metricToCompare) {

    }

    analyzeCssMetrics(codesMetrics, metricToCompare) {
        const notFoundResp = {
            fromEditor: null,
            fromDb: null,
            message: "All metrics of this code are different. Doesn't match anything..."
        };
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
        if(!mostProbableStat.count){
            return notFoundResp;
        }
        // const filteredMetricsToCompare = Object.keys(metricToCompare.metrics).reduce((acc, cur) => {
        //     if (mostProbableStat.equalMetric[cur]) {
        //         acc[cur] = metricToCompare.metrics[cur];
        //     }
        //     return acc;
        // }, {});
        return {
            fromEditor: metricToCompare.metrics,
            // fromEditor: filteredMetricsToCompare,
            fromDb: codesMetrics[mostProbableStat.index].metrics,
            // fromDb: mostProbableStat.equalMetric,
            message: `The this code similar with file: ${mostProbableStat.name}`
        }
    }
}

module.exports = new Comparator();