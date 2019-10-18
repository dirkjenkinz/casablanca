"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field")
const { addElement, showSelectedElement } = require("./elements.js");

const buildBeginHidden = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-begin-hidden`;
    let beginHidden = buildField(prefix, "Begin Hidden", "addbegin-hidden", ["tag", "blanked"])
    $(`.field-build`).append(beginHidden);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Begin Hidden", prefix));
    showSelectedElement();
    return beginHidden;
}

module.exports = buildBeginHidden;