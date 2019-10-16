"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement} = require("./elements.js");

const buildEndIf = () => {
  let fieldID = getCode();
  let prefix = `${fieldID}-endif`;
  let endIf = buildTopOfField(prefix);
  endIf += `</div></div></div>`
  $(`.field-build`).append(endIf);
  $(`#elements`).append(addElement("End If", prefix));
  showSelectedElement();
  return endIf;
}

const buildTopOfField = (prefix) => {
    let top = `<div id="${prefix}" class="field endif">`;
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col field-type page-label">End If</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>`
    return top;
}

module.exports = buildEndIf;