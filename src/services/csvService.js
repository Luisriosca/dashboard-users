import csvDownload from 'json-to-csv-export'

const getCsvFile = (data, fileName) => {
    data.forEach((element, index) => {
        data[index] = flattenObject(element)
    });
    console.log(data, fileName);
    csvDownload(data, fileName);
}

function flattenObject(ob, prefix = false, result = null) {
    result = result || {};

    if (prefix && typeof ob === 'object' && ob !== null && Object.keys(ob).length === 0) {
        result[prefix] = Array.isArray(ob) ? [] : {};
        return result;
    }

    prefix = prefix ? prefix + '.' : '';

    for (const i in ob) {
        if (Object.prototype.hasOwnProperty.call(ob, i)) {
            if (typeof ob[i] === 'object' && ob[i] !== null) {
                flattenObject(ob[i], prefix + i, result);
            } else {
                result[prefix + i] = ob[i];
            }
        }
    }
    return result;
}



export default getCsvFile