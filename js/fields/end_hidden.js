"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement} = require("./elements.js");

const buildEndHidden = () => {
  let fieldID = getCode();
  let prefix = `${fieldID}-end-hidden`;
  let endHidden = buildTopOfField(prefix);
  endHidden += `</div></div></div>`
  $(`.field-build`).append(endHidden);
  $(`#elements`).append(addElement("End Hidden Field", prefix));
  showSelectedElement();
  return endHidden;
}

const buildTopOfField = (prefix) => {
    let top = `<div id="${prefix}" class="field end-hidden">`;
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col field-type page-label">End Hidden Field</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>`
    return top;
}

module.exports = buildEndHidden;