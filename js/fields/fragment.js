"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");
const BTN = "button btn-primary btn-sm btn-block";

const buildFragment = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-fragment`;
    let fragment = buildTop(prefix)
    fragment += `</div></div></div>`
    $(`.field-build`).append(fragment);
    $(`#elements`).append(addElement("Code", prefix));
    showSelectedElement();
    return fragment;
}

const buildTop = (prefix) => {
    let top = `<div id="${prefix}" class="field fragment">`;
    top += `<div class="row">`
    top += `<div class="col-md-2 field-type">Code Fragment</div>`
    top += `<div class="col"></div>`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row
    top += `<br/><div id="${prefix}-details">`
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col">`
    top += `<textarea class="form-control rounded-0" id="${prefix}-textarea" rows="16"></textarea>`
    top += `</div>`
    top += `<div class="col-md-2"></div>`
    top += `</div><br>` // end of row
    return top;
}

module.exports = buildFragment;