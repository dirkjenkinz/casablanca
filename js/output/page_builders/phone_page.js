'use strict'
const { buildOptions, buildHeader } = require("./page_utilities");

const buildPhoneObject = (pageName, field) => {
    let tag = field.tag;
    let phoneObject = `{{ form.text(formData.${tag},\n`;
    phoneObject += `"${tag}",\n`;
    phoneObject += buildHeader(pageName, tag, field);
    phoneObject += buildOptions(pageName, tag, field, 20, false, true);
    phoneObject += `errors=formErrors)\n`;
    phoneObject += `}},\n\n`
    return phoneObject;
}

module.exports = buildPhoneObject;