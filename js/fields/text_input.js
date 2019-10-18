"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field")
const { addElement, showSelectedElement } = require("./elements.js");

const buildTextInput = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-textInpur`;
    let text_input = buildField(prefix, "Text Input", "textInput", ["tag", "header", "hint", "target", "replacements", "length"])
    $(`.field-build`).append(text_input);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Text Input", prefix));
    showSelectedElement();
    return text_input;
}

module.exports = buildTextInput;