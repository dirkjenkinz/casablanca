'use strict'

const address_JSON = (field) => {
    let json = `
    "addressDetails": {
        "label": "Address",
        "validation": {
            "mandatory": "Enter your address. You must complete the first two lines.",
            "errorMsgAddress1and2": {
                "inline": "${field.header} You must complete the first two lines.",
                "summary": "${field.header} You must complete the first two lines."
            },
            "errorMsgPostcode": {
                "inline": "A post code must be in the format PR2 8AE",
                "summary": "Postcode - A post code must be in the format PR2 8AE"
            },
            "errorMsgPostcodeRegex": {
                "inline": "Remove any characters apart from letters or numbers",
                "summary": "Postcode - Remove any characters apart from letters or numbers"
            },
            "invalidRegexAddress": {
                "inline": "Enter a valid address using only letters and numbers",
                "summary": "Enter a valid address using only letters and numbers"
            },
            "mandatoryAndRegexErrors": {
              "inline": "${field.header} You must complete the first two lines and you must only use letters and numbers",
              "summary": "${field.header} You must complete the first two lines and you must only use letters and numbers"
            },
            "errorMsgAddressTooLong": {
                "inline": "Too many characters in address line",
                "summary": "Address - Too many characters in address line"
            },
            "errorMsgPostcodeTooLong": {
                "inline": "Too many characters in postcode",
                "summary": "Address - Too many characters in postcode"
            }
        }
    },\n`
    return json;
}

module.exports = address_JSON;