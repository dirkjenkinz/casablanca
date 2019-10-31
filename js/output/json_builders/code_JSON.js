'use strict'

const code_JSON = (field) => {
    let tag = field.tag
    let messArray = [];
    let json = "\n";

    let subCodes = field.code.split("<=");

    subCodes.forEach(subCode => {
        let end = subCode.indexOf("=>");
        if (end > -1) {
            let pair = subCode.substring(0, end).split("=");
            messArray.push(pair)
        }
    })

    messArray.forEach(pair => {
        json += `"${tag}.${pair[0].trim()}": "${pair[1].trim()}",\n`
    })

    if (json.length > 0) {
        json + ",\n"
    }
    return json;
}

module.exports = code_JSON;