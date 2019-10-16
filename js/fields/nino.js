"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");
const BTN = "button btn-danger btn-sm btn-block";

const buildNino = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-nino`;
    let nino = buildTopOfField(prefix, "NINO", "nino")
    nino += `</div></div></div>`
    $(`.field-build`).append(nino);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("NINO", prefix));
    showSelectedElement();
    return nino;
}

const buildTopOfField = prefix => {
    let top = `<div id="${prefix}" class="field nino">`;
    top += `<div class="row">`
    top += `<div class="col-md-2 field-type" id="${prefix}-ftype" >NINO</div>`
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

    top += `<div class="row" id="${prefix}-replacements-start">`;
    top += `<div class="col-md-3">`;
    top += `<button class="${BTN} replacements-btn" id="${prefix}-replacements-btn">Show Replacements</button>`;
    top += `</div>`;
    top += `</div><br>`;

    top += `<div class="replacements" id="${prefix}-replacements">`;
    top += `<div class="row replace-row">`;
    top += `<div class="col-md-2">Field</div>`;
    top += `<div class="col-md-4">From</div>`;
    top += `<div class="col-md-4">To</div>`;
    top += `<div class="col"></div>`;
    top += `</div>`;

    for (let count = 0; count < 10; count++) {
        top += `<div class="row replace-row" id="replace-${count}">`;
        top += `<div class="col-md-2">`;
        top += `<input type="radio" name="${prefix}-field-${count}" id="${prefix}-header-${count}" value="header">&nbsp;&nbsp;Header&nbsp;&nbsp;&nbsp;`;
        top += `<input type="radio" name="${prefix}-field-${count}" id="${prefix}-hint-${count}" value="hint">&nbsp;&nbsp;Hint`;
        top += `</div>`;

        top += `<div class="col-md-4"><input type="text" id="${prefix}-left-${count}" size="32"></div>`;
        top += `<div class="col-md-4"><input type="text" id="${prefix}-right-${count}" size="32"></div>`;
        top += `<div class="col">`
        top += `<button class="${BTN} rep-del-btn" id="${prefix}-del-rep-btn">Delete</button>`;
        top += `</div>`;
        top += `</div>`;
    }

    top += `</div>`;

    return top;
}

module.exports = buildNino;