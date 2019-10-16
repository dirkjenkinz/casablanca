'use strict'

const buildTextInputObject = (pageName, field) => {
  let tag = field.tag;
  let textInputObject = `{{ form.text(\n`;
  textInputObject += `formData.${tag},\n`;
  textInputObject += `"${tag}",\n`;
  textInputObject += `t("${pageName}:${tag}.label"),\n`;
  textInputObject += `options = {\n`;
  textInputObject += `maxlength: 60,\n`
  textInputObject += `trim: true,`
  textInputObject += `},\n`
  textInputObject += `errors=formErrors, validationVariables = validationVariables)\n`
  textInputObject += `}},\n\n`

  return textInputObject;
}

module.exports = buildTextInputObject;