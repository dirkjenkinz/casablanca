'use strict'

const buildPhoneObject = (pageName, data) => {
    let phoneObject = `{{ form.text(formData.${data},\n`;
    phoneObject += `"${data}",\n`;
    phoneObject += `t("${pageName}:${data}.label"),\n`;
    phoneObject += `options = {\n`;
    phoneObject += `maxlength: 20,\n`;
    phoneObject += `trim: true\n`;
    phoneObject += `},\n`;
    phoneObject += `errors=formErrors)\n`;
    phoneObject += `}}\n\n`

    return phoneObject;
}