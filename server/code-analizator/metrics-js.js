const hash = require('object-hash');
const esprima = require('esprima');
const escomplex = require('escomplex');

class MetricsJSCalculator {

    getHalsetadMetrics(fileName, programCode) {
        const metrics = this.calculateHalsetadMetrics(programCode);
        if (!metrics.aggregate.name) {
            metrics.aggregate["name"] = fileName;
        }
        return metrics;
    }

    calculateHalsetadMetrics(programCode) {
        const result = escomplex.analyse(programCode);
        const AST = esprima.parse(programCode);
        result['hashCode'] = hash(AST);
        return result;
    }
}

module.exports = new MetricsJSCalculator();
