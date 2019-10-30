'use strict'

const date_JSON = (field) => {
    let header = field.header;
    let tag = field.tag;
    let hint = field.hint;

    let json = `"${tag}": {\n`;

    if (header !== "") {
        json += `"label": "${header}",\n`
    }

    if (hint !== "") {
        json += `"hint": "${hint}",\n`
    }

    json += `"validation": {\n`
    json += `"mandatoryInline": "You must complete this section",\n`
    json += `"mandatorySummary": "${header} - You must complete this section",\n`
    json += `"invalidDateInline":"Invalid value",\n`
    json += `"invalidDateSummary":"${header} - Invalid value"\n`
    json += `}\n`
    json += `},\n`
    return json;
}

module.exports = date_JSON;