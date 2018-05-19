const wrapper = require('./elastic');

const config = {
    usePopulation: true,
    populationDirName: 'data/js',
    elastic: {
      index: 'halsetadindex',
      type: 'metrics'
    }
  };
wrapper.ElasticApiWrapper.loadDataToElastic(config);
