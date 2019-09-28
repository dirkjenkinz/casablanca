'use strict'

const name_JSON = data => {
    let messages = `
    "${data}Title": {
        "label": "Title",
        "validation": {
            "mandatoryInline": "You must complete this section",
            "mandatorySummary": "Title - You must complete this section",
            "invalidCharsInline": "Enter details again without using {titleInvalidChars}",
            "invalidCharsSummary": "Title - Enter details again without using {titleInvalidChars}",
            "tooLong": {
                "inline": "Too many characters entered",
                "summary": "Title - Too many characters entered"
            }
        }
    },
    "${data}FirstName": {
        "label": "First name",
        "validation": {
            "mandatoryInline": "You must complete this section",
            "mandatorySummary": "First name - You must complete this section",
            "invalidCharsInline": "Enter details again without using {firstNameInvalidChars}",
            "invalidCharsSummary": "First name - Enter details again without using {firstNameInvalidChars}",
            "invalidNonAlphaCharsInline": "Enter details again without using consecutive non-alphabetical characters",
            "invalidNonAlphaCharsSummary": "First name - Enter details again without using consecutive non-alphabetical characters",
            "invalidUseOfHyphensInline": "Enter details again without using a dash at the beginning or end",
            "invalidUseOfHyphensSummary": "First name - Enter details again without using a dash at the beginning or end",
             "tooLong": {
                "inline": "Too many characters entered",
                "summary": "First name - Too many characters entered"
            }
        }
    },
    "${data}MiddleName": {
        "label": "Middle name(s)",
        "validation": {
            "invalidCharsInline": "Enter details again without using {middleNameInvalidChars}",
            "invalidCharsSummary": "Middle name(s) - Enter details again without using {middleNameInvalidChars}",
            "invalidNonAlphaCharsInline": "Enter details again without using consecutive non-alphabetical characters",
            "invalidNonAlphaCharsSummary": "Middle name(s) - Enter details again without using consecutive non-alphabetical characters",
            "invalidUseOfHyphensInline": "Enter details again without using a dash at the beginning or end",
            "invalidUseOfHyphensSummary": "Middle name(s) - Enter details again without using a dash at the beginning or end",
            "tooLong": {
                "inline": "Too many characters entered",
                "summary": "Middle name(s) - Too many characters entered"
            }
        }
    },
    "${data}LastName": {
        "label": "Last name",
        "validation": {
            "mandatoryInline": "You must complete this section",
            "mandatorySummary": "Last name - You must complete this section",
            "invalidCharsInline": "Enter details again without using {lastNameInvalidChars}",
            "invalidCharsSummary": "Last name - Enter details again without using {lastNameInvalidChars}",
            "invalidNonAlphaCharsInline": "Enter details again without using consecutive non-alphabetical characters",
            "invalidNonAlphaCharsSummary": "Last name - Enter details again without using consecutive non-alphabetical characters",
            "invalidUseOfHyphensInline": "Enter details again without using a dash at the beginning or end",
            "invalidUseOfHyphensSummary": "Last name - Enter details again without using a dash at the beginning or end",
             "tooLong": {
                "inline": "Too many characters entered",
                "summary": "Last name - Too many characters entered"
            }
        }
    }`
    return messages;
}