'use strict'

const buildDateObject = (pageName, field) => {
    let data = field["text-form-data"];
    let hint = field["text-hint"];

    let dateObject = `{{ form.dateObject(\n`;
    dateObject += 'formData.${data},\n';
    dateObject += `"${data}",\n`;
    dateObject += ` t("$${pageName}:${data}.label"),\n`;

    if (hint != ""){
      dateObject += `options = {\n`;
      dateObject += `hint: t("$${pageName}:${data}.hint")"\n`
      dateObject += `},\n`;
    }
        
    dateObject += `errors=formErrors)\n`;
    dateObject += `}}\n\n`

    return dateObject;

}