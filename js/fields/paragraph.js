"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");
const BTN = "button btn-primary btn-sm btn-block";

const buildParagraph = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-paragraph`;
    let paragraph = buildParagraphTop(prefix);
    paragraph += `</div></div></div>`
    $(`.field-build`).append(paragraph);
    $(`#elements`).append(addElement("Paragraph", prefix));
    showSelectedElement();
    return paragraph;
}

const buildParagraphTop = (prefix) => {
    let top = `<div id="${prefix}" class="field paragraph">`;
    top += `<div class="row">`
    top += `<div class="col-md-2 field-type">Paragraph</div>`
    top += `<div class="col-md-1">Tag:</div>`
    top += `<div class="col" id="${prefix}-tag">`
    top += `<input type="text" id="${prefix}-tag-value" size="40" />`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row
    top += `<br><div id="${prefix}-details">`
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col">`
    top += `<textarea class="form-control rounded-0" id="${prefix}-textarea" rows="16"></textarea>`
    top += `</div>`
    top += `<div class="col-md-2"></div>`
    top += `</div><br>` // end of row
    return top;
}

module.exports = buildParagraph;