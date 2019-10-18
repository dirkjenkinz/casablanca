"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field");
const { addElement, showSelectedElement } = require("./elements.js");

const buildErrorSummary = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-error-summary`;
    let errorSummary = buildField(prefix, "Error Summary", "error-summary", ["tag", "textarea-medium"])
    $(`.field-build`).append(errorSummary);
    $(`#elements`).append(addElement("Code", prefix));
    showSelectedElement();
    return errorSummary;
}

module.exports = buildErrorSummary;