'use strict'


const buildNinoObject = (pageName, field) => {
    let tag = field.tag;
    let options = buildOptions(pageName, tag)


    let ninoObject = `{{ form.text(\n`;
    ninoObject += `formData.${tag},\n`;
    ninoObject += `"${tag}",\n`;
    ninoObject += `t("${pageName}:${tag}.label"),\n`;
    ninoObject += options;
    ninoObject += `errors=formErrors, validationVariables = validationVariables)\n`
    ninoObject += `}},\n\n`

    return ninoObject;
}

const buildOptions = (pageName, tag) => {
    let options = `options = {\n`;
    options += `hint: "For example QQ123456C",\n`;
    options += `trim: true,\n`;
    options += `maxlength: 19,\n`;
    options += `extraCss: [ "uppercase" ],\n`;
    options += `inputPostfixHtml: "<p><span class="form-hint">" + "t("${pageName}:${tag}.hint")" + "</span></p>"\n`;
    options += `},\n`

    return options;
}

module.exports = buildNinoObject;