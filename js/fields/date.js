"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field");
const { addElement, showSelectedElement } = require("./elements.js");

const buildDate = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-date`;
    let date = buildField(prefix, "Date", "date", ["tag", "header", "hint", "target", "replacements"])
    $(`.field-build`).append(date);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Date", prefix));
    showSelectedElement();
    return date;
}

module.exports = buildDate;