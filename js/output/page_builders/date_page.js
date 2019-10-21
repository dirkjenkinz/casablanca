'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildDateObject = (pageName, field) => {
    let tag = field.tag;
    let dateObject = `{{ form.dateObject(\n`;
    dateObject += `formData.${tag},\n`;
    dateObject += `"${tag}",\n`;
    dateObject += buildHeader(pageName, tag, field);
    dateObject += buildOptions(pageName, tag, field);
    dateObject += `errors=formErrors,\n`
    dateObject += `validationVariables = validationVariables\n`
    dateObject += `)\n`
    dateObject += `}},\n\n`

    return dateObject;
}



module.exports = buildDateObject;