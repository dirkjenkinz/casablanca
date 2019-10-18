"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field");
const { addElement, showSelectedElement } = require("./elements.js");

const buildParagraph = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-paragraph`;
    let paragraph = buildField(prefix, "Paragraph", "paragraph", ["tag", "textarea-large"])
    $(`.field-build`).append(paragraph);
    $(`#elements`).append(addElement("Code", prefix));
    showSelectedElement();
    return paragraph;
}

module.exports = buildParagraph;