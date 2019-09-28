'use strict'

const buildEmailObject = (pageName, data) => {
    let emailObject = `{{ form.text(\n`;
    emailObject += `formData.${data},\n`;
    emailObject += `'dataAddress',\n`;
    emailObject += `t('${pageName}:${data}.emailAddress.label'),`;
    emailObject += `options={trim: true},\n`;
    emailObject += `errors=formErrors)\n`;
    emailObject += `}}\n\n`

    return emailObject;
}