'use strict'

const { buildOptions } = require("./page_utilities");

const buildDateObject = (pageName, field) => {
    let tag = field.tag;
    let options = buildOptions(pageName, tag, field)

    let dateObject = `{{ form.dateObject(\n`;

    dateObject += `formData.${tag},\n`;
    dateObject += `"${tag}",\n`;
    dateObject += `t("${pageName}:${tag}.label"),\n`;
    dateObject += options;
    dateObject += `errors=formErrors,\n`
    dateObject += `validationVariables = validationVariables\n`
    dateObject += `)\n`
    dateObject += `}},\n\n`

    return dateObject;
}



module.exports = buildDateObject;