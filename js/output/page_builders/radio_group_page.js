'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildRadioGroupObject = (pageName, field) => {
    let tag = field.tag;
    let buttons = field.buttons;
    let inline = field.inline;
    let radioGroupObject;

    radioGroupObject = `{% call form.radioGroup(\n`;
    radioGroupObject += `formData.${tag},\n`;
    radioGroupObject += `"${tag}",\n`;
    radioGroupObject += buildHeader(pageName, tag, field);
    radioGroupObject += buildOptions(pageName, tag, field, 0, inline, false);
    radioGroupObject += `errors=formErrors\n`;
    radioGroupObject += `%}\n\n`

    for (let i = 0; i < buttons.length; i++) {
        let options = "";
        if (buttons[i][2]) {
            options = `options = {\n`;
            options += `targetPanel: "${buttons[i][2]}"\n`;
            options += `},\n`;
        }
        radioGroupObject += `{{ form.radio(\n`
        radioGroupObject += `formData.${tag},\n`
        radioGroupObject += `"${tag}",\n`
        radioGroupObject += `t("${pageName}:${tag}.answers.${buttons[i][1]}"),\n`
        radioGroupObject += `"${buttons[i][1]}")\n`;
        radioGroupObject += `${options}`
        radioGroupObject += `}}\n\n`;
    }

    radioGroupObject += `{% endcall %},\n\n`

    return radioGroupObject;
}

module.exports = buildRadioGroupObject;