"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field")
const { addElement, showSelectedElement } = require("./elements.js");

const buildPhoneNumber = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-phone`;
    let phone = buildField(prefix, "Phone Number", "phone", ["tag", "header", "hint", "target", "replacements"])
    $(`.field-build`).append(phone);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Phone #", prefix));
    showSelectedElement();
    return phone;
}

module.exports = buildPhoneNumber;