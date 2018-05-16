const express = require('express');
const router = express.Router();
const elastic = require('../code-analizator/elastic');
const jsMetrics = require('../code-analizator/metrics-js');
const cssMetrics =require('../code-analizator/metric-css');

// declare axios for making http requests
// const axios = require('axios');
// const API = 'https://jsonplaceholder.typicode.com';

const config = {
  usePopulation: false,
  populationDirName: 'data/2010',
  elastic: {
    index: 'halsetadindex',
    type: 'metrics'
  }
};
const query = {
  index: config.elastic.index,
  type: config.elastic.type,
  body: {
    query: {
      match_all: {}
    }
  }
};

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

// Get all posts
// router.get('/getMetrics', (req, res) => {
//   elastic.ElasticApiWrapper.makeElasticSelect(query)
//     .then(records =>  res.status(200).json(records.map(record => record._source)))
//     .catch(error => res.status(500).send(error))
// });


router.post('/getMetrics/js', (req, res) => {

  const metric = jsMetrics.calculateHalsetadMetrics(req.body.code);
  if (metric) {
    return res.json(metric);
  }
  return res.send("Metric calculation error");
});

router.post('/getMetrics/css', (req, res) => {

    cssMetrics.CSSAnalyzer.analyze(req.body.code)
        .then(data => res.status(200).json(data))
        .catch(err => res.send(err, 500));
});

router.post('/obtaincode', (req, res) => {
  const code = req.body.code;
  const result = jsMetrics.getHalsetadMetrics('testName', code);
  res.send(200).json(result);
});

module.exports = router;
