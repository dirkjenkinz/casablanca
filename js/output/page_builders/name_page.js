'use strict'

const { buildOptions } = require("./page_utilities");

const buildNameObject = (pageName, field) => {
    let tag = field.tag;

    let nameObject = `{{ form.text(\n`;
    nameObject += `formData.${tag}Title,\n`;
    nameObject += `"${tag}Title",\n`;
    nameObject += `t("${pageName}:${tag}Title.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 20, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}}\n\n`;
    nameObject += `{{ form.text(\n`;
    nameObject += `formData.${tag}FirstName,\n`;
    nameObject += `"${tag}FirstName",\n`;
    nameObject += `t("$${pageName}:${tag}FirstName.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 35, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}}\n\n`;
    nameObject += `{{ form.text(`
    nameObject += `formData.${tag}MiddleName,`
    nameObject += `"${tag}MiddleName",\n`;
    nameObject += `t("$${pageName}:${tag}MiddleName.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 35, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}}\n\n`;
    nameObject += `{{ form.text(`
    nameObject += `formData.${tag}LastName,`
    nameObject += `"${tag}LastName",\n`;
    nameObject += `t("$${pageName}:${tag}LastName.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 35, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}},\n\n`;

    return nameObject;
}

module.exports = buildNameObject;