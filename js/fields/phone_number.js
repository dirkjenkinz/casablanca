"use strict"

const { getCode } = require("../codes");
const { buildTopOfField } = require("./partials");
const { addElement, showSelectedElement } = require("./elements.js");

const buildPhoneNumber = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-phone`;
    let phone = buildTopOfField(prefix, "Phone Number", "phone")
    phone += `</div></div></div>`
    $(`.field-build`).append(phone);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Phone #", prefix));
    showSelectedElement();
    return phone;
}

module.exports = buildPhoneNumber;