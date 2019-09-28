'use strict'

const phone_JSON = data => {
    let messages = `
    "${data}Number": {
        "label": "${data} number",
        "validation": {
            "errorMsg": {
                "inline": "Invalid value",
                "summary": "${data} number - Invalid value"
            },
            "tooLong": {
                "inline": "Enter a telephone number in 20 characters or less",
                "summary": "${data} number - Enter a telephone number in 20 characters or less"
            }
        }
    },
    `
    return messages;
}