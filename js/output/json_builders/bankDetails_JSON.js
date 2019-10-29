'use strict'

const bankDetails_JSON = (field) => {

    let json = `
"bankAccount": {
        "haveBankAccount": {
            "label": "Do you have a bank account?",
            "validation": {
                "mandatory": {
                    "inline": "You must complete this section",
                    "summary": "Do you have a bank account? - You must complete this section"
                },
                "inArray": {
                    "inline": "Invalid value",
                    "summary": "Do you have a bank account? - Invalid value"
                }
            }
        },

        "noBankAccountWarning": {
            "warningText1": "You won't be paid Carer's Allowance without a bank account.",
            "warningText2": {
                "gb": "You can add bank details after you apply by contacting the Carer's Allowance Unit.",
                "ni": "You can add bank details after you apply by contacting the Disability and Carers Service."
            }
        },

        "accountHolderName": {
            "label": "Account holder name",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Account holder name - You must complete this section",
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Account holder name - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Account Holder name - Too many characters"
                }
            }
        },

        "bankName": {
            "label": "Name of bank or building society",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Name of bank or building society - You must complete this section",
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Name of bank or building society - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Name of bank or building society - Too many characters"
                }
            }
        },

        "sortCode": {
            "label": "Sort code",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Sort code - You must complete this section",
                "invalidLengthInline": "The sort code must be 6 digits long",
                "invalidLengthSummary": "Sort code - The sort code must be 6 digits long",
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Sort code - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops"
            }
        },

        "accountNumber": {
            "label": "Account number",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Account number - You must complete this section",
                "invalidCharsInline": "You must only enter numbers",
                "invalidCharsSummary": "Account number - You must only enter numbers",
                "fieldLengthInline": "Minimum length is 6",
                "fieldLengthSummary": "Account number - Minimum length is 6",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Account number - Too many characters"
                }
            }
        },

        "postOfficeCard": {
            "link": "Post Office card account numbers",
            "messageText1": "If you're using a Post Office card account, your account number isn't the number on your card.",
            "messageText2": "Find the correct number on any letter you've had from the Post Office about your account."
        },

        "rollNumber": {
            "label": "Building society roll or reference number (optional)",
            "validation": {
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Building society roll or reference number - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Building society roll or reference number - Too many characters"
                }
            }
        }
    },`

    return json;
}

module.exports = bankDetails_JSON;