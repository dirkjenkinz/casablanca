'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildEmailObject = (pageName, field) => {
    let tag = field.tag;
    let emailObject = `{{ form.text(\n`;
    emailObject += `formData.${tag},\n`;
    emailObject += `'tagAddress',\n`;
    emailObject += buildHeader(pageName, tag, field);
    emailObject += buildOptions(pageName, tag, field);
    emailObject += `errors=formErrors)\n`;
    emailObject += `}}\n\n`
    emailObject += `{{ form.text(\n`;
    emailObject += `formData.${tag},\n`;
    emailObject += `"${tag}",\n`
    emailObject += `t("${pageName}:${tag}.confirmEmailAddress.label"),\n`;
    emailObject += buildOptions(pageName, tag, field);
    emailObject += `errors=formErrors)\n`;
    emailObject += `}}\n\n`

    return emailObject;
}

module.exports = buildEmailObject;