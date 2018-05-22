class FlatUtils {
    static dive(currentKey, into, target) {
        for (let i in into) {
            if (into.hasOwnProperty(i)) {
                let newKey = i;
                let newVal = into[i];

                if (currentKey.length > 0) {
                    newKey = currentKey + '.' + i;
                }
                if (typeof newVal === "object") {
                    FlatUtils.dive(newKey, newVal, target);
                } else {

                    target[newKey] = newVal;
                }
            }
        }
    }


    static flatten(arr) {
        let newObj = {};
        FlatUtils.dive("", arr, newObj);
        return newObj;
    }


}

module.exports = FlatUtils;