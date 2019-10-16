"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");

const buildErrorSummary = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-error-summary`;
    let error_summary = buildTopOfField(prefix);
    error_summary += `</div></div></div>`;
    $(`.field-build`).append(error_summary);
    $(`#elements`).append(addElement("Error Summary", prefix));
    showSelectedElement();
    return error_summary;
}

const buildTopOfField = (prefix) => {
    let top = `<div id="${prefix}" class="field "error-summary">`;
    top += `<div class="row">`;
    top += `<div class="col-md-2 field-type">Error Summary</div>`;
    top += `<div class="col-md-1">Tag:</div>`;
    top += `<div class="col" id="${prefix}-tag">`;
    top += `<input type="text" id="${prefix}-tag-value" size="40" />`;
    top += `</div>`;
    top += `<div class="col-md-1"></div>`;
    top += `</div>`; // end of row
    top += `<br/><div id="${prefix}-details">`;
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col">`
    top += `<textarea class="form-control rounded-0" id="${prefix}-textarea" rows="20"></textarea>`
    top += `</div>`
    top += `<div class="col-md-2"></div>`
    top += `</div>`; // end of row
    return top;
}

module.exports = buildErrorSummary;