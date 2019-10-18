"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field");
const { addElement, showSelectedElement } = require("./elements.js");

const buildFragment = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-fragment`;
    let fragment = buildField(prefix, "Fragment", "fragment", ["tag", "textarea-large"])
    $(`.field-build`).append(fragment);
    $(`#elements`).append(addElement("Code", prefix));
    showSelectedElement();
    return fragment;
}

module.exports = buildFragment;