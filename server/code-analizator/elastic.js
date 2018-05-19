const fileUtils = require('./data-preparation');
const jsAnalyzer = require('./metrics-js');
const cssAnalyzer = require('./metrics-css');
const elasticsearch = require('elasticsearch');
const bluebird = require('bluebird');
const fileWalker = bluebird.promisify(fileUtils.filewalker);

const client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});

class ElasticApiWrapper {

    async loadDataToElastic(config) {
        if (config.usePopulation) {
            const fileNames = await fileWalker(config.populationDirName);
            const fileData = await fileUtils.readFiles(fileNames);
            const parsedData = config.justCode ? fileData : this.obtainMetrics(fileData);
            const preparedData = this.prepareDataForElastic(parsedData, config);
            client.bulk({body: preparedData}, (err, resp) => {
                if (err) {
                    throw new Error(err);
                }
                console.log("OKAY");
            });
        }
    };

    async obtainMetrics(fileData) {
        let parsedData;
        switch (config.elastic._type) {
            case 'js':
                parsedData = fileData
                    .map(file => {
                        const jsonData = JSON.stringify(jsAnalyzer
                            .getJSMetrics({fileName: file.name, programCode: file.content}));
                        return {data: jsonData}
                    });
                break;
            case 'css':
                parsedData = await  Promise.all(fileData
                    .map(async (file) => {
                            const data = await (cssAnalyzer
                                .analyze({fileName: file.name, programCode: file.content}));
                            return {data: JSON.stringify(data)}
                        }
                    )
                );
                break;
            default:
                throw new NoTargetError('Metric analyze not implemented yet!');
        }
        return parsedData;
    }

    prepareDataForElastic(data, config) {
        let {_index, _type} = config.elastic;
        if (config.justCode) {
            _index = `${_index}code`;
            _type = `${_type}code`;
        }
        return data.reduce((acc, cur, index) => {
            const documentIndex = {index: {_index: _index, _type: _type, _id: (index + 1)}};
            acc.push(documentIndex);
            acc.push(cur);
            return acc;
        }, []);
    };


    bulkInitialData(preparedData) {
        client.bulk({body: preparedData}, (err, resp) => {
            if (err) {
                console.log('bulkInitialData');
                throw new Error(err);
            }
            console.log(resp);
        });
    };

    makeElasticSelect(query) {
        return new Promise((resolve, reject) => {
            let client = new elasticsearch.Client({
                host: 'localhost:9200',
                log: 'trace'
            });
            client.search(query).then((resp) => {
                resolve(resp.hits.hits);
            }, (err) => {
                console.trace(err.message);
                reject(err);
            });
        });
    };
}

module.exports.ElasticApiWrapper = new ElasticApiWrapper();
