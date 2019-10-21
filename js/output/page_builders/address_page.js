'use strict'
const { buildOptions, buildHeader } = require("./page_utilities");

const buildAddressObject = (pageName, field) => {
    let tag = field.tag;
    let addressObject = `{{ address.CADSAddress(\n`;
    addressObject += `formData.${tag},\n`;
    addressObject += `"${tag}",\n`;
    addressObject += buildHeader(pageName, tag, field);
    addressObject += buildOptions(pageName, tag, field, 36);
    addressObject += `errors=formErrors)\n`;
    addressObject += `}}\n\n`;
    return addressObject;
}

module.exports = buildAddressObject;