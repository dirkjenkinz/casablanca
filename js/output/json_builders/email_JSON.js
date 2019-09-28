'use strict'

const email_JSON = (data, hint) => {
    let messages = `
    "${data}": {
        "emailAddress": {
            "label": "${data} email address",
            "validation": {
                "notifyEmailValidation": {
                    "inline": "Enter a valid email address",
                    "summary": "${data} - Enter a valid email address"
                },
                "inline": "Enter a valid email address",
                "summary": "${data} - Enter a valid email address"
            }
        },`
    return messages;
}