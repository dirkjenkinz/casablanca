"use strict"
const { buildOptions, buildHeader } = require("./page_utilities");

const buildCheckboxArrayObject = (pageName, field) => {
    let tag = field.tag;
    let checkboxArrayObject = `{{ form.checkboxArray(formData.${tag},\n`
    checkboxArrayObject += `"${tag}",\n`;
    checkboxArrayObject += buildHeader(pageName, tag, field);
    checkboxArrayObject += buildOptions(pageName, tag, field);
    checkboxArrayObject += `"${tag}",\n`
    checkboxArrayObject += `errors=formErrors)\n`;
    checkboxArrayObject += `}},\n\n`
    return checkboxArrayObject;
}

module.exports = buildCheckboxArrayObject;