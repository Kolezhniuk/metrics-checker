
// const hash = require('object-hash');
const escomplex = require('escomplex');

class MetrictsCalculator {

    getHalsetadMetrics(fileName, programCode) {
        const metrics = this.calculateHalsetadMetrics(programCode);
        if (!metrics.aggregate.name) {
            metrics.aggregate["name"] = fileName;
        }
        return metrics;
    }

    // processInitialMetrics(tokens, filterType, options) {
    //     const operators = tokens.filter(item => item.type === filterType);
    //     const uniqueOperators = [...new Set(operators.map(item => item.value))];
    //     return {
    //         unique: uniqueOperators.length,
    //         total: operators.length
    //     };
    // }
    //
    // removeComments(src) {
    //     return src.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '$1');
    // }

    calculateHalsetadMetrics(programCode) {
        const result = escomplex.analyse(programCode);
        // result['hashCode'] = hash(programCode);
        return result;


//     programCode = this.removeComments(programCode);
//     const tokens = esprima.tokenize(programCode);
//     const AST = esprima.parse(programCode);
//     const operators = this.processInitialMetrics(tokens, TokenTypes.operator);
//     const operands = this.processInitialMetrics(tokens, TokenTypes.operand);
//     const distinctOperators_n1 = operators.unique;
//     const totalOperators_N1 = operators.total;
//     const distinctOperands_n2 = operands.unique;
//     const totalOperands_N2 = operands.total;
//     // Halstead vocabulary
//     const vocabulary = distinctOperators_n1 + distinctOperands_n2;
//     // Program length
//     const programLength = totalOperators_N1 + totalOperands_N2;
//     // Halstead Volume (HV)
//     const volume = Math.round(programLength * Math.log2(vocabulary));
//     //Difficulty
//     const difficulty = Math.round((distinctOperators_n1 * totalOperands_N2) / ( 2 * distinctOperands_n2));
//     //Effort
//     const effort = Math.round(difficulty * volume);
//     //hash
//     const hashCode = hash(programCode);
//
//     console.log(AST);
//     console.log('==========');
//
// /*note that AST is stringified */
//     return {
//       halsetadMetrics: {
//         uniqueOperators: operators.unique,
//         totalOperators: operators.total,
//         uniqueOperands: operands.unique,
//         totalOperands: operands.total,
//         vocabulary,
//         volume,
//         programLength,
//         difficulty,
//         effort
//       },
//       AST: JSON.stringify(AST.body),
//       hashCode
//     };
    }
}

module.exports = new MetrictsCalculator();
