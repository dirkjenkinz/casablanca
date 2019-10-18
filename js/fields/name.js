"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field");
const { addElement, showSelectedElement } = require("./elements.js");

const buildName = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-name`;
    let name = buildField(prefix, "Name", "name", ["tag", "header", "hint", "target", "replacements"])
    $(`.field-build`).append(name);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Name", prefix));
    showSelectedElement();
    return name;
}

module.exports = buildName;