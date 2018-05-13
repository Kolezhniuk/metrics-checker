const express = require('express');
const router = express.Router();
const elastic = require('../code-analizator/index');
const metrics = require('../code-analizator/metrics');

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


router.post('/getMetrics', (req, res) => {

  const metric = metrics.calculateHalsetadMetrics(req.body.code);
  if (metric) {
    return res.json(metric);
  }
  return res.send("Metric calculation error");
});

router.post('/obtaincode', (req, res) => {
  const code = req.body.code;
  const result = metrics.getHalsetadMetrics('testName', code);
  res.send(200).json(result)
});

module.exports = router;
