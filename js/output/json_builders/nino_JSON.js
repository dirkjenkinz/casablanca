'use strict'

const nino_JSON = (field) => {
let tag = field.tag;
let hint = field["text-hint"];
    let json = `
    "${tag}NationalInsuranceNumber": {
        "label": "National Insurance number",
        "hint": "${hint}",
        "validation": {
            "invalidNinoInline": "You must enter a valid National Insurance number, eg QQ123456C",
            "invalidNinoSummary": "National Insurance number - You must enter a valid National Insurance number, eg QQ123456C",
            "tooLong": {
                "inline": "Too many characters entered",
                "summary": "National Insurance number - Too many characters entered"
            }
        }
    },`
    return json+`\n`;
}

module.exports = nino_JSON;