const wrapper = require('./elastic');

let js_config = {
    usePopulation: true,
    justCode: true,
    populationDirName: 'data/js',
    elastic: {
        _index: 'js',
        _type: 'js'
    }
};
wrapper.ElasticApiWrapper.loadDataToElastic(js_config);
//

let css_config = {
    usePopulation: true,
    justCode: true,
    populationDirName: 'data/css',
    elastic: {
        _index: 'css',
        _type: 'css'
    }
};
wrapper.ElasticApiWrapper.loadDataToElastic(css_config);

