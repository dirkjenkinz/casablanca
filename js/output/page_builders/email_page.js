'use strict'

const { buildOptions } = require("./page_utilities");

const buildEmailObject = (pageName, field) => {
    let tag = field.tag;
    let options = buildOptions(pageName, tag, field, 0, false, true)

    let emailObject = `{{ form.text(\n`;
    emailObject += `formData.${tag},\n`;
    emailObject += `'tagAddress',\n`;
    emailObject += `t("${pageName}:${tag}.emailAddress.label"),\n`;
    emailObject += options;
    emailObject += `errors=formErrors)\n`;
    emailObject += `}}\n\n`
    emailObject += `{{ form.text(\n`;
    emailObject += `formData.${tag},\n`;
    emailObject += `"${tag}",\n`
    emailObject += `t("${pageName}:${tag}.confirmEmailAddress.label"),\n`;
    emailObject += options;
    emailObject += `errors=formErrors)\n`;
    emailObject += `}}\n\n`

    return emailObject;
}

module.exports = buildEmailObject;