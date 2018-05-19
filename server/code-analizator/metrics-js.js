const hash = require('object-hash');
const esprima = require('esprima');
const escomplex = require('escomplex');

class JSAnalyzer {

    getJSMetrics(params) {
        const {fileName, programCode} = params;
        const metrics = escomplex.analyse(programCode);
        const AST = esprima.parse(programCode);
        metrics['hashCode'] = hash(AST);
        if (fileName) {
            metrics.aggregate["name"] = fileName;
        }
        return metrics;
    }
}

module.exports = new JSAnalyzer();
