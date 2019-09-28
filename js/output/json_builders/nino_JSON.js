'use strict'

const nino_JSON = (data, hint) => {
    let messages = `
    "${data}NationalInsuranceNumber": {
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
    return messages;
}