"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");

const buildTopPart = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-top-part`;
    let top_part = buildTopOfField(prefix);
    top_part += `</div></div></div>`;
    $(`.field-build`).prepend(top_part);
    $(`#elements`).prepend(addElement("Top Part", prefix));
    showSelectedElement();
    $(`#${prefix}-element-btn`).click()
    return top_part;
}

const buildTopOfField = (prefix) => {
    let top = `<div id="${prefix}" class="field top-part">`;
    top += `<div class="row">`
    top += `<div class="col-md-2 field-type">Top Part</div>`
    top += `<div class="col"></div>`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row
    top += `<br/><div id="${prefix}-details">`
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col">`
    top += `<textarea class="form-control rounded-0" id="${prefix}-textarea" rows="10"></textarea>`
    top += `</div>`
    top += `<div class="col-md-2"></div>`
    top += `</div><br>` // end of row
    return top;
}

module.exports = buildTopPart;