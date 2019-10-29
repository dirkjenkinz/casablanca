'use strict'

const email_JSON = (field) => {
    let header = field.header;
    let tag = field.tag;

    let json = `
    "${tag}": {
        "emailAddress": {
            "label": "${tag}",
            "validation": {
                "notifyEmailValidation": {
                    "inline": "Enter a valid email address",
                    "summary": "${header} - Enter a valid email address"
                },
                "inline": "Enter a valid email address",
                "summary": "${header} - Enter a valid email address"
            }
        },
        "confirmEmailAddress": {
            "label": "Confirm ${tag}",
            "validation": {
                "inline": "Enter a valid email address",
                "summary": "${header} - Enter a valid email address",
                "match": {
                    "inline": "Emails do not match",
                    "summary": "${header} - Emails do not match"
                }
            }
          }
      },`
    return json.trim();
}

module.exports = email_JSON;