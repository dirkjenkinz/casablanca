'use strict'

const textInput_JSON = (field) => {
    let header = field.header;
    let hint = field["text-hint"];

    let json = `"${header}": {\n`;;
    json += `"label": "${header}",\n`;
    json += `"hint": "${hint}",\n`;
    json += `"validation": {\n`;
    json += `"mandatoryInline": "You must complete this section",\n`;
    json += `"mandatorySummary": "${header} - You must complete this section",\n`;
    json += `"invalidRegexInline":"Invalid value",\n`;
    json += `"invalidRegexSummary":"${header} - Invalid value",\n`;
    json += `"tooLongInline": "${header}",\n`;
    json += `"tooLongSummary": "${header} - Too many characters entered"\n`;
    json += `}\n`;
    json += `},\n`;


    return json.trim();
}

module.exports = textInput_JSON;