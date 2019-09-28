'use strict'

const address_JSON = (casa) => {
  let error1 = casa.error1;
  let error2 = casa.error2;
  let error3 = casa.error3;
    let messages = `
    "addressDetails": {
        "label": "Address",
        "validation": {
            "errorMsgAddress1and2": {
                "inline": "${error1} You must complete the first two lines.",
                "summary": "${error1} You must complete the first two lines."
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
                "inline": "${error2}",
                "summary": "${error2}"
            },
            "mandatoryAndRegexErrors": {
                "inline": "${error3}",
                "summary": "${error3}
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
    }`
    return messages;
}