'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildCheckboxArrayObject = (pageName, field) => {
    let tag = field.tag;
    let boxes = field.boxes;

    let checkboxArrayObject = `{% call form.checkboxArrayGroup(\n`
    checkboxArrayObject += `formData.${tag},\n`
    checkboxArrayObject += `"${tag}",\n`;
    checkboxArrayObject += buildHeader(pageName, tag, field);
    checkboxArrayObject += buildOptions(pageName, tag, field);
    checkboxArrayObject += `errors=formErrors)\n`;
    checkboxArrayObject += `%},\n\n`

    for (let i = 0; i < boxes.length; i++) {
        let options = "";
        if (boxes[i][2]) {
            options = `options = {\n`;
            options += `targetPanel: "${boxes[i][2]}"\n`;
            options += `},\n`;
        }
        checkboxArrayObject += `{{ form.checkboxArray(\n`
        checkboxArrayObject += `formData.${tag},\n`
        checkboxArrayObject += `"${tag}",\n`
        checkboxArrayObject += `t("${pageName}:${tag}.answers.${boxes[i][1]}"),\n`
        checkboxArrayObject += `"${boxes[i][1]}",\n`;
        checkboxArrayObject += `${options}`
        checkboxArrayObject += `errors=formErrors)\n`
        checkboxArrayObject += `}}\n\n`;
    }

    checkboxArrayObject += `{% endcall %},\n\n`

    return checkboxArrayObject;
}

module.exports = buildCheckboxArrayObject;