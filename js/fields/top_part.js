"use strict"
const { getCode } = require("../codes");
const buildField = require("./build_field");
const { addElement, showSelectedElement } = require("./elements.js");

const buildTopPart = () => {

    let children = $("#elements").children();
    if (children.length === 0 || !children[0].id.includes(`-top-part-`)) {

        let fieldID = getCode();
        let prefix = `${fieldID}-top-part`;
        let top_part = buildField(prefix, "Top Part", "top-part", ["tag", "textarea-small"])
        $(`.field-build`).prepend(top_part);
        $(`#elements`).prepend(addElement("Top Part", prefix));
        showSelectedElement();
        $(`#${prefix}-element-btn`).click()
        return top_part;
    }
}

module.exports = buildTopPart;