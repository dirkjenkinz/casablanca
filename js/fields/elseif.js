"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");

const buildElseIf = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-elseif`;
    let _elseif = buildTopOfField(prefix)
    _elseif += `</div></div></div>`
    $(`.field-build`).append(_elseif);
    $(`#elements`).append(addElement("Else If", prefix));
    showSelectedElement();
    return _elseif;
}

const buildTopOfField = (prefix) => {
    let top = `<div id="${prefix}" class="field elseif">`;
    top += `<div class="row">`;
    top += `<div class="col-md-2 field-type">Else If</div>`;
    top += `<div class="col-md-1">Condition:</div>`;
    top += `<div class="col" id="${prefix}-condition">`;
    top += `<input type="text" id="${prefix}-condition-value" size="60" />`;
    top += `</div>`;
    top += `<div class="col-md-1"></div>`;
    top += `</div>`; // end of row
    return top;
}

module.exports = buildElseIf;