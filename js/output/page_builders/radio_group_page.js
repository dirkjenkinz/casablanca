'use strict'

const buildRadioGroupObject = (pageName, data, buttons, inline, hint) => {
  let radioGroupObject;
  let options = "";

  if (hint && inline) {
    options = `options = {\n`;;
    options += `hint: t('${pageName}:${data}.label.hint'),\n`;
    options += `inline: true\n`;
    options += `},\n`;
  } else if (inline) {
    options = `options = { inline: true },\n`;
  } else if (hint) {
    options = `options = hint: t('${pageName}:${data}.label.hint'),\n`;
  };

  if (options) {
    radioGroupObject = `{% call form.radioGroup(\n`;
    radioGroupObject += `formData.${data},\n`;
    radioGroupObject += `"${data}",\n`;
    radioGroupObject += `t('${pageName}:${data}.label'),\n`;
    radioGroupObject += `${options}`;
    radioGroupObject += `errors=formErrors\n`;
    radioGroupObject += `%}\n\n`
  } else {
    radioGroupObject = `{% call form.radioGroup(\n`;
    radioGroupObject += `formData.${data},\n`;
    radioGroupObject += `"${data}",\n`;
    radioGroupObject += `t('${pageName}:${data}.label'),\n`;
    radioGroupObject += `errors=formErrors\n`;
    radioGroupObject += `%}\n\n`;
  }

  const err = "errors=formErrors"
  for (let i = 0; i < buttons.length; i = i + 2) {
    radioGroupObject += `{{ form.radio(\n`
    radioGroupObject += `formData.${data}},\n`
    radioGroupObject += `"${data}",\n`
    radioGroupObject += `t('${pageName}:${data}.answers.${buttons[i + 1]}'),\n`;
    radioGroupObject += `"${buttons[i + 1]}"\n`;
    radioGroupObject += `errors=formErrors\n`;
    radioGroupObject += `}}\n\n`;
  }

  radioGroupObject += `{% endcall %}\n\n`


  return radioGroupObject;
}