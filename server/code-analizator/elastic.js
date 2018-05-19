const fileUtils = require('./data-preparation');
const metricsCalculator = require('./metrics-js');
const elasticsearch = require('elasticsearch');
const bluebird = require('bluebird');
const fileWalker = bluebird.promisify(fileUtils.filewalker);

const query = {
  index: 'halsetadindex',
  type: 'metrics',
  body: {
    query: {
      match_all: {}
    }
  }
};

const client  = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
  });

class ElasticApiWrapper {

  async loadDataToElastic(config) {
    if (config.usePopulation) {
      const fileNames = await fileWalker(config.populationDirName);
      const fileData = await fileUtils.readFiles(fileNames);
      const parsedData = fileData.map(file => metricsCalculator.getHalsetadMetrics(file.name, file.content));
      const preparedData = this.prepareDataForElastic(parsedData);
      client.bulk({body: preparedData}, (err, resp) => {
        if (err) {
          console.log('bulkInitialData');
          throw new Error(err);
        }
        console.log(resp);
      });
    }
  };


  prepareDataForElastic(data) {
    return data.reduce((acc, cur, index) => {
      let documentIndex = {index: {_index: 'halsetadindex', _type: 'metrics', _id: (index + 1)}};
      acc.push(documentIndex);
      acc.push({metric: cur});
      return acc;
    }, []);
  };


  bulkInitialData(prepearedData) {
    client.bulk({body: prepearedData}, (err, resp) => {
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
