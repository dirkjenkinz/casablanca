'use strict'

const radioGroup_JSON = (f) => {

    let question = f["text-form-data"];
    let answers = buildAnswers(f.buttons);
    let validation = buildValidation(f["text-header"]);
    let header = f["text-header"];
    let hint = f["text-hint"];

    let messages = `  "${question}": {
        "header": "${header}",
        "hint": "${hint}",
        "answers": {
            ${answers}},
        "validation": {
            ${validation}
        }
    },`
    return messages;
}

	
const buildAnswers = buttons => {
  let answers = "";
    for (let i = 0; i < buttons.length; i = i + 2) {
        if (i === buttons.length - 2){
          answers += `"${buttons[i + 1]}":"${buttons[i]}"\n`
        } else {
          answers += `"${buttons[i + 1]}":"${buttons[i]}",\n`
        }
    }

    return answers;
}

const buildValidation = header => {
    let validation = ` "mandatory": {
                "inline": "You must complete this section",
                "summary": "${header} - You must complete this section"
              },
                "inArray": {
                "inline": "Invalid value",
            "summary": "${header} - Invalid value"
            }`

    return validation;
}