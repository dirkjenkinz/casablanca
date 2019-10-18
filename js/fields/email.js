"use strict"

const { getCode } = require("../codes");
const buildField = require("./build_field")
const { addElement, showSelectedElement } = require("./elements.js");

const buildEmail = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-email`;
    let email = buildField(prefix, "Email", "email", ["tag", "header", "hint", "replacements"])
    $(`.field-build`).append(email);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Email", prefix));
    showSelectedElement();
    return email;
}

module.exports = buildEmail;