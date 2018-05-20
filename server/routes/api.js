const express = require('express');
const router = express.Router();
const jsMetrics = require('../code-analizator/metrics-js');
const cssMetrics = require('../code-analizator/metrics-css');
const comparator = require('../code-analizator/comparator');

/* GET api listing. */
router.get('/', (req, res) => {
    res.send('api works');
});


router.post('/getMetrics/js', (req, res) => {

    const metric = jsMetrics.getJSMetrics({programCode: req.body.code});
    if (metric) {
        return res.json(metric);
    }
    return res.send("Metric calculation error");
});

router.post('/getMetrics/css', (req, res) => {

    cssMetrics.analyze({programCode: req.body.code})
        .then(data => res.status(200).json(data))
        .catch(err => res.send(err, 500));
});

router.post('/compare-code/css', async (req, res) => {
    const code = req.body.code;
    const compareResult = await comparator.compare(code, 'css');
    return res.status(200).json(compareResult);
});

router.post('/compare-code/js', (req, res) => {
    // const code = req.body.code;

    // const result = jsMetrics.getJSMetrics({fileNam'testName', code);
    res.send(200).json('mock');
});

module.exports = router;
