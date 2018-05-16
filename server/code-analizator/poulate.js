const wrapper = require('./elastic');

const config = {
    usePopulation: true,
    populationDirName: 'data/2010',
    elastic: {
      index: 'halsetadindex',
      type: 'metrics'
    }
  };
wrapper.ElasticApiWrapper.loadDataToElastic(config);
