'use strict'

const buildAddressObject = (pageName, data) => {
    let addressObject = `{{ address.CADSAddress(\n`;
    addressObject += `formData.${data},\n`;
    addressObject +=  `"${data}",\n`;
    addressObject += `t("$${pageName}:${data}.label"),\n`;
    addressObject += `options = {maxlength: 36}, errors=formErrors)\n`;
    addressObject += `}}\n\n`;

    return addressObject;
}