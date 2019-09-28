'use strict'

const buildNinoObject = (pageName, data) => {
  let ninoObject = `{{ form.text(\n`;
  ninoObject += `formData.${data},\n`;
  ninoObject += `"${data}",\n`;
  ninoObject += `t("${pageName}:${data}.label"),\n`;
  ninoObject += `options = {\n`;
  ninoObject += ` hint: "For example QQ123456C",\n`;
  ninoObject += `trim: true,\n`;
  ninoObject += `maxlength: 19,\n`;
  ninoObject += `extraCss: [ "uppercase" ],\n`;
  ninoObject += `inputPostfixHtml: "<p><span class="form-hint">" + "t("${pageName}:${data}.hint")" + "</span></p>"\n`;
  ninoObject += `},\n`
  ninoObject += `errors=formErrors, validationVariables = validationVariables)\n`
  ninoObject += `}}\n\n`

  return ninoObject;
}