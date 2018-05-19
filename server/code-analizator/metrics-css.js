const Analyzer = require('analyze-css');
const csstree = require('css-tree');
const hash = require('object-hash');

class CSSAnalyzer {
    analyze(params) {
        let {fileName, programCode} = params;
        return new Promise((resolve, reject) => {
            new Analyzer(programCode, (err, result) => {
                if (err) {
                    reject(err);
                }
                const AST = csstree.parse(programCode);
                result['hashCode'] = hash(AST);
                result['fileName'] = fileName;
                delete result['generator'];
                delete result['offenders'];
                resolve(result);
            });
        });
    }
}
module.exports = new CSSAnalyzer();

