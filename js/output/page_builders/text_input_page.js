'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildTextInputObject = (pageName, field) => {
    let tag = field.tag;
    let textInputObject = `{{ form.text(\n`;
    textInputObject += `formData.${tag},\n`;
    textInputObject += `"${tag}",\n`;
    textInputObject += buildHeader(pageName, tag, field);
    textInputObject += buildOptions(pageName, tag, field, 60, false, true);
    textInputObject += `errors=formErrors, validationVariables = validationVariables)\n`
    textInputObject += `}},\n\n`
    return textInputObject;
}

module.exports = buildTextInputObject;