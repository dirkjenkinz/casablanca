"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement} = require("./elements.js");

const buildElse = () => {
  let fieldID = getCode();
  let prefix = `${fieldID}-else`;
  let _else = buildTopOfField(prefix);
  _else += `</div></div></div>`
  $(`.field-build`).append(_else);
  $(`#elements`).append(addElement("Else", prefix));
  showSelectedElement();
  return _else;
}

const buildTopOfField = (prefix) => {
    let top = `<div id="${prefix}" class="field else">`;
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col field-type page-label">Else</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>`
    return top;
}

module.exports = buildElse;