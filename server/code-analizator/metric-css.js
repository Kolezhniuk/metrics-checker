const Analyzer = require('analyze-css');
const csstree = require('css-tree');
const hash = require('object-hash');

class CSSAnalyzer {

    analyze(code) {
        return new Promise((resolve, reject) => {
            new Analyzer(code, (err, result) => {
                if (err) {
                    reject(err);
                }
                const AST = csstree.parse(code);
                result['hashCode'] = hash(AST);
                delete result['generator'];
                delete result['offenders'];
                resolve(result);
            });
        });
    }
}

module.exports.CSSAnalyzer = new CSSAnalyzer();

