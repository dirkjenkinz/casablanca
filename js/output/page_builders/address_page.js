'use strict'
const { buildOptions } = require("./page_utilities");

const buildAddressObject = (pageName, field) => {
    let tag = field.tag;
    let options = buildOptions(pageName, tag, field, 36)

    let addressObject = `{{ address.CADSAddress(\n`;
    addressObject += `formData.${tag},\n`;
    addressObject += `"${tag}",\n`;
    addressObject += `t("${pageName}:${tag}.label"),\n`;
    addressObject += `${options}`;
    addressObject += `errors=formErrors)\n`;
    addressObject += `}}\n\n`;

    return addressObject;
}

module.exports = buildAddressObject;