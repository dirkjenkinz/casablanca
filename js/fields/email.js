"use strict"

const { getCode } = require("../codes");
const { buildTopOfField } = require("./partials");
const { addElement, showSelectedElement } = require("./elements.js");

const buildEmail = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-email`;
    let email = buildTopOfField(prefix, "Email", "email")
    email += `</div></div></div>`
    $(`.field-build`).append(email);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Email", prefix));
    showSelectedElement();
    return email;
}

module.exports = buildEmail;