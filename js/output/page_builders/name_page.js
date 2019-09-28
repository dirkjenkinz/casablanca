'use strict'

const buildNameObject = (pageName, data) => {
  let nameObject = `{{ form.text(\n`;
  nameObject += `formData.${data}Title,\n`;
  nameObject += `"${data}Title",\n`;
  nameObject += `t("${pageName}:${data}Title.label"),\n`;
  nameObject += `options = {\n`;
  nameObject += `trim: true,\n`;
  nameObject += `maxlength: 20\n`;
  nameObject += `},\n`;
  nameObject += `errors = formErrors, validationVariables = validationVariables)\n`;
  nameObject += `}}\n\n`;
  nameObject += `{\n`;
  nameObject += `{\n`;
  nameObject += `form.text(\n`;
  nameObject += `formData.${ data } FirstName,\n`;
  nameObject += `"${data}FirstName",\n`;
  nameObject += `t("$${pageName}:${data}FirstName.label"),\n`;
  nameObject += `options = {\n`;
  nameObject += `trim: true,\n`;
  nameObject += `maxlength: 35\n`;
  nameObject += `},\n`;
  nameObject += `errors = formErrors, validationVariables = validationVariables)`
  nameObject += `}\n`;
  nameObject += `}\n\n`;
  nameObject += `{\n`;
  nameObject += `{\n`;
  nameObject += `form.text(`
  nameObject += `formData.${ data } MiddleName,`
  nameObject += `"${data}MiddleName",\n`;
  nameObject += `t("$${pageName}:${data}MiddleName.label"),\n`;
  nameObject += `options = {\n`;
  nameObject += `trim: true,\n`;
  nameObject += `maxlength: 35\n`;
  nameObject += `},\n`;
  nameObject += `errors = formErrors, validationVariables = validationVariables)\n`;
  nameObject += `}\n`;
  nameObject += `}\n\n`;
  nameObject += `{\n`;
  nameObject += `{\n`;
  nameObject += `form.text(`
  nameObject += `formData.${ data } LastName,`
  nameObject += `"${data}LastName",\n`;
  nameObject += `t("$${pageName}:${data}LastName.label"),\n`;
  nameObject += `options = {\n`;
  nameObject += `trim: true,\n`;
  nameObject += `maxlength: 35\n`;
  nameObject += `},\n`;
  nameObject += `errors = formErrors, validationVariables = validationVariables)\n`;
  nameObject += `}\n`;
  nameObject += `}\n\n`;

  return nameObject;
}