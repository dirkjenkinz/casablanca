'use strict'

const { buildOptions } = require("./page_utilities");

const buildPhoneObject = (pageName, field) => {
    let tag = field.tag;
    let options = buildOptions(pageName, tag, field, 20, false, true);
    let phoneObject = `{{ form.text(formData.${tag},\n`;
    phoneObject += `"${tag}",\n`;
    phoneObject += `t("${pageName}:${tag}.label"),\n`;
    phoneObject += options;
    phoneObject += `errors=formErrors)\n`;
    phoneObject += `}},\n\n`
    return phoneObject;
}

module.exports = buildPhoneObject;