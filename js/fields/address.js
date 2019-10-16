"use strict"

const { getCode } = require("../codes");
const { buildTopOfField } = require("./partials");
const { addElement, showSelectedElement } = require("./elements.js");

const buildAddress = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-address`;
    let date = buildTopOfField(prefix, "Address", "address");
    date += `</div></div></div>`
    $(`.field-build`).append(date);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Address", prefix));
    showSelectedElement();
    return date;
}

module.exports = buildAddress;