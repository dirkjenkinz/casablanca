"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field");
const { addElement, showSelectedElement } = require("./elements.js");

const buildAddress = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-address`;
    let address = buildField(prefix, "Address", "address", ["tag", "header", "hint", "target", "replacements"])
    $(`.field-build`).append(address);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Address", prefix));
    showSelectedElement();
    return address;
}

module.exports = buildAddress;