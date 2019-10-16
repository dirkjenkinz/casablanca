"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");

const buildName = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-name`;
    name = buildTopOfField(prefix);
    name += `</div></div></div>`
    $(`.field-build`).append(name);
    $(`#${prefix}-replacements`).hide();

    $(`#elements`).append(addElement("Name", prefix));
    $(`#${prefix}-replacements`).hide();

    showSelectedElement();
    return name;
}

const buildTopOfField = prefix => {
    let top = `<div id="${prefix}" class="field name">`;
    top += `<div class="row">`
    top += `<div class="col-md-2 field-type" id="${prefix}-ftype" >Name</div>`
    top += `<div class="col-md-1">Tag:</div>`
    top += `<div class="col" id="${prefix}-tag">`
    top += `<input type="text" id="${prefix}-tag-value" size="40" />`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row

    top += `<div id="${prefix}-details">`;
    top += `<div class="row">`;
    top += `<div class="col-md-2">`;
    top += `</div>`;
    top += `<div class="col-md-1">Header:</div>`;
    top += `<div class="col" id="${prefix}-form-header">`;
    top += `<input type="text" id="${prefix}-header-value" size="60" />`;
    top += `</div>`;
    top += `</div>`; // end of row 

    top += `</div>`;

    return top;
}

module.exports = buildName;