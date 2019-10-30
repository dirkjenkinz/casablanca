'use strict'

const phone_JSON = field => {
    let header = field.header;
    let tag = field.tag;
    let hint = field.hint;

    let json = `"${tag}": {\n`;
    json += `"label": "${tag} number",\n`;
    json += ` "validation": {\n`
    json += `"errorMsg": {\n`
    json += ` "inline": "Invalid value",\n`
    json += ` "summary": "${header} - Invalid value"\n`
    json += ` },\n`
    json += `"tooLong": {\n`
    json += `"inline": "Enter a telephone number in 20 characters or less",\n`
    json += `"summary": "${header} - Enter a telephone number in 20 characters or less"\n`
    json += `}\n`
    json += ` }\n`
    json += `},`
    return json;
}

module.exports = phone_JSON;