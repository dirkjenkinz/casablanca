'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildTextAreaObject = (pageName, field) => {
    let tag = field.tag;
    let height = field["text-height"];
    let textAreaObject = `{{ form.textarea(formData.${tag},\n`;
    textAreaObject += `'${tag}',\n`
    textAreaObject += `t('${pageName}:${tag}.label'),\n`
    textAreaObject += `options={\n`
    textAreaObject += `trim: true,\n`
    textAreaObject += `maxlength: 3000,\n`
    textAreaObject += `size: 'form-control-full',\n`
    textAreaObject += `inputAttributes: { rows: ${height} }\n`
    textAreaObject += `},\n`
    textAreaObject += `errors=formErrors, validationVariables=validationVariables)\n`
    textAreaObject += `}},\n\n`

    return textAreaObject;
}

module.exports = buildTextAreaObject;