"use strict"

const { getCode } = require("../codes");
const { buildTopOfField } = require("./partials");
const { addElement, showSelectedElement } = require("./elements.js");

const buildTextInput = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-textInput`;
    let text_input = buildTopOfField(prefix, "Text Input", "textInput");

    length = `<div class="row" id="${prefix}-length"><div class="col-md-3 right-justify">`;
    length += `Text Length: </div><div class="col"><input type="text" id="${prefix}-length-value" `;
    length += `size="3"></div><div class="col-md-1"></div></div><br>`


    text_input += `</div></div></div>`
    $(`.field-build`).append(text_input);
    $(`#${prefix}-replacements-start`).before(length);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Text Input", prefix));
    showSelectedElement();
    return text_input;
}

module.exports = buildTextInput;