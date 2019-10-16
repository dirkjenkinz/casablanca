"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement} = require("./elements.js");

const buildBeginHidden = () => {
  let fieldID = getCode();
  let prefix = `${fieldID}-begin-hidden`;
  let beginHidden = buildTopOfField(prefix);
  beginHidden += `</div></div></div>`
  $(`.field-build`).append(beginHidden);
  $(`#elements`).append(addElement("Begin Hidden Field", prefix));
  showSelectedElement();
  return beginHidden;
}

const buildTopOfField = (prefix) => {
    let top = `<div id="${prefix}" class="field begin-hidden">`;
    top += `<div class="row">`
    top += `<div class="col-md-3 field-type page-label">Begin Hidden Field</div>`
    top += `<div class="col-md-1">Tag:</div>`
    top += `<div class="col" id="${prefix}-tag">`
    top += `<input type="text" id="${prefix}-tag-value" size="40" />`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>`

    top += `<div id="${prefix}-details" class="collapse show">`
    top += `<div class="row">`
    top += `<div class="col-md-2">`
    top += `</div>`
    top += `<div class="col-md-2 page-label">Blanked By:</div>`
    top += `<div class="col" id="${prefix}-blanked-by">`
    top += `<input type="text" id="${prefix}-blanked-by-value" size="60" />`
    top += `</div>`
    top += `</div>` // end of row

    return top;
}

module.exports = buildBeginHidden;