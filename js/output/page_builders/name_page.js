'use strict'

const { buildOptions } = require("./page_utilities");

const buildNameObject = (pageName, field) => {
  let tag = field.tag;
  let options1 = buildOptions(pageName, tag, field, 20, false, true);
  let options2 = buildOptions(pageName, tag, field, 35, false, true);

  let nameObject = `{{ form.text(\n`;
  nameObject += `formData.${tag}Title,\n`;
  nameObject += `"${tag}Title",\n`;
  nameObject += `t("${pageName}:${tag}Title.label"),\n`;
  nameObject += options1;
  nameObject += `errors = formErrors,\n`;
  nameObject += `validationVariables = validationVariables)\n`;
  nameObject += `}}\n\n`;
  nameObject += `{{ form.text(\n`;
  nameObject += `formData.${tag}FirstName,\n`;
  nameObject += `"${tag}FirstName",\n`;
  nameObject += `t("$${pageName}:${tag}FirstName.label"),\n`;
  nameObject += options2;
  nameObject += `errors = formErrors,\n`;
  nameObject += `validationVariables = validationVariables)\n`;
  nameObject += `}}\n\n`;
  nameObject += `{{ form.text(`
  nameObject += `formData.${tag}MiddleName,`
  nameObject += `"${tag}MiddleName",\n`;
  nameObject += `t("$${pageName}:${tag}MiddleName.label"),\n`;
  nameObject += options2;
  nameObject += `errors = formErrors,\n`;
  nameObject += `validationVariables = validationVariables)\n`;
  nameObject += `}}\n\n`;
  nameObject += `{{ form.text(`
  nameObject += `formData.${tag}LastName,`
  nameObject += `"${tag}LastName",\n`;
  nameObject += `t("$${pageName}:${tag}LastName.label"),\n`;
  nameObject += options2;
  nameObject += `errors = formErrors,\n`;
  nameObject += `validationVariables = validationVariables)\n`;
  nameObject += `}},\n\n`;

  return nameObject;
}

module.exports = buildNameObject;