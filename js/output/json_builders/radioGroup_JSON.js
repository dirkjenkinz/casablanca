'use strict'

const radioGroup_JSON = (field) => {
  let tag = field.tag;
  let answers = buildAnswers(field.buttons);
  let validation = buildValidation(field.header);
  let header = field.header;
  let hint = field["text-hint"];

  let json = `"${tag}": {\n`;
  json += `"header": "${header}",\n`;

  if (hint !== "") {
    json += `"hint": "${hint}",\n`;
  };

  json += `"answers": {\n`;
  json += `${answers}},\n`;
  json += `"validation": {\n`;
  json += `${validation}\n`;
  json += `}\n`
  json += `},\n`
  return json;
}

const buildAnswers = buttons => {
  let answers = "";
  for (let i = 0; i < buttons.length; i++) {
    if (i === buttons.length - 1) {
      answers += `"${buttons[i][1]}":"${buttons[i][0]}"\n`;
    } else {
      answers += `"${buttons[i][1]}":"${buttons[i][0]}",\n`;
    }
  }
  return answers;
}

const buildValidation = header => {
  let validation = `"mandatory": {\n`;
  validation += `"inline": "You must complete this section",\n`
  validation += `"summary": "${header} - You must complete this section"\n`;
  validation += `},\n`;
  validation += `"inArray": {\n`;
  validation += `"inline": "Invalid value",\n`;
  validation += `"summary": "${header} - Invalid value"\n`;
  validation += `}`;
  return validation;
}

module.exports = radioGroup_JSON;