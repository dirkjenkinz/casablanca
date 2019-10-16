"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement} = require("./elements.js");

const buildIf = () => {
  let fieldID = getCode();
  let prefix = `${fieldID}-if`;
  let _if = buildTopOfField(prefix)
  _if += `</div></div></div>`
  $(`.field-build`).append(_if);
  $(`#elements`).append(addElement("If", prefix));
  showSelectedElement();
  return _if;
}

const buildTopOfField = (prefix) => {
  let top = `<div id="${prefix}" class="field "if">`;
  top += `<div class="row">`;
  top += `<div class="col-md-2 field-type">If</div>`;
  top += `<div class="col-md-1">Condition:</div>`;
  top += `<div class="col" id="${prefix}-condition">`;
  top += `<input type="text" id="${prefix}-condition-value" size="60" />`;
  top += `</div>`;
  top += `<div class="col-md-1"></div>`;
  top += `</div>`; // end of row
  return top;
}

module.exports = buildIf;