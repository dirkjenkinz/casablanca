"use strict"

const { getCode } = require("../codes");
const { buildTopOfField } = require("./partials");
const { addElement, showSelectedElement } = require("./elements.js");

const buildDate = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-date`;
    let date = buildTopOfField(prefix, "Date", "date");
    date += `</div></div></div>`
    $(`.field-build`).append(date);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Date", prefix));
    showSelectedElement();
    return date;
}

module.exports = buildDate;