"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement} = require("./elements.js");

const BTN = "button btn-primary btn-sm btn-block";

const buildHeader = () => {
    let fieldID = getCode();
    let prefix = `${fieldID}-header`;
    let headerSize = buildHeaderSize(prefix);
    let hdr = buildhdrTop(prefix, "Header", "header", headerSize);
    hdr += `</div></div></div>`
    $(`.field-build`).append(hdr);
    $(`#elements`).append(addElement("Header", prefix));
    showSelectedElement();
    return hdr;
}

const buildHeaderSize = (prefix) => {
    let headerSize = `<div class="row header-size" id="${prefix}-headersize">
    <div class="col-md-2 right-justify">Header Size&nbsp;&nbsp;</div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h1" name="size">&nbsp;&nbsp;H1</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h2" name="size">&nbsp;&nbsp;H2</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h3" name="size" checked>&nbsp;&nbsp;H3</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h4" name="size">&nbsp;&nbsp;H4</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h5" name="size">&nbsp;&nbsp;H5</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h6" name="size">&nbsp;&nbsp;H6</label></div>
  </div>`
    return headerSize;
};

const buildhdrTop = (prefix, fieldType, type, headerSize) => {
    let top = `<div id="${prefix}" class="field ${type}">`;

    top += `<div class="row">`
    top += `<div class="col-md-2 field-type">${fieldType}</div>`
    top += `<div class="col-md-1">Tag:</div>`
    top += `<div class="col-md-4" id="${prefix}-tag">`
    top += `<input type="text" id="${prefix}-tag-value" size="40" />`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row

    top += `<div id="${prefix}-details" class="collapse show">`

    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col-md-1">Header:</div>`
    top += `<div class="col" id="${prefix}-form-header">`
    top += `<input type="text" id="${prefix}-header-value" size="80" />`
    top += `</div>`
    top += `<div class="col"></div>`
    top += `</div>` // end of row
    top += headerSize;

    top += `</div>` // end of row
    return top;
}

module.exports = buildHeader;