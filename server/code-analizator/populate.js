const wrapper = require('./elastic');

let config = {
    usePopulation: true,
    justCode: true,
    populationDirName: 'data/js',
    elastic: {
        _index: 'js',
        _type: 'js'
    }
};
wrapper.ElasticApiWrapper.loadDataToElastic(config);
//
config = Object.assign(config, {populationDirName: 'data/css', elastic: {_index: 'css', _type: 'css'}});
wrapper.ElasticApiWrapper.loadDataToElastic(config);

