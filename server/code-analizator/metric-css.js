const Analyzer = require('analyze-css');

class CSSAnalyzer {

    analyze(code) {
        return new Promise((resolve, reject) => {
            new Analyzer(code, (err, result) => {
                if (err) {
                    reject(err);
                }
                console.log(result);
                delete result['generator'];
                delete result['offenders'];
                resolve(result);
            });
        });
    }
}

module.exports.CSSAnalyzer = new CSSAnalyzer();

