'use strict'

const buildHeaderObject = (pageName, field) => {
    console.log(field)
    let name = field["text-form-data"];
    let size = "h" + field["header-size"];

    let headerObject = `<${size}>{{ t('${pageName}:${name}.text') }}</${size}>\n\n`

    return headerObject;
}