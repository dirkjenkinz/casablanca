"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field")
const { addElement, showSelectedElement } = require("./elements.js");

const buildNino = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-nino`;
    let nino = buildField(prefix, "NINO", "nino", ["tag", "header", "replacements"])
    $(`.field-build`).append(nino);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("NINO", prefix));
    showSelectedElement();
    return nino;
}

module.exports = buildNino;