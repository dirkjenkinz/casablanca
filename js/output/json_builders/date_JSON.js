'use strict'

const date_JSON = (data, hint) => {
    let messages = `
    "${data}Date": {
        "label": "${data} date",
        "hint": "${hint}",
        "validation": {
            "errorMsg":{
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "${data} date - You must complete this section",
                "invalidDateInline":"Invalid value",
                "invalidDateSummary":"${data} date - Invalid value"
            }
        }
    }\n`
    console.log(messages)
    return messages.toString();
}