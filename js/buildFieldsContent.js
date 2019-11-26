`use strict`
const { elements } = require("./fields/build_element");

const buttonRed = "button btn-sm btn-block if field-button";
const buttonMauve = "button btn-sm btn-casa btn-block field-button";
const buttonGrey = "button btn-sm  btn-block begin-hidden field-button";
const buttonWhite = "button btn-sm btn-block top-part field-button";;

const buildFieldsContent = () => {
  let sortedElements = elements.sort();

  let fieldsContent = `<div class="row btn-row">`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonRed}" id="if">if</button>`
  fieldsContent += `</div>`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonRed}" id="else">else</button>`
  fieldsContent += `</div>`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonRed}" id="elseif">elseif</button>`
  fieldsContent += `</div>`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonRed}" id="endif">endif</button>`
  fieldsContent += `</div>`
  fieldsContent += `</div>`

  fieldsContent += `<div class="row btn-row">`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonWhite}" id="top-part">Top Part</button>`
  fieldsContent += `</div>`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonWhite}" id="footer">Footer</button>`
  fieldsContent += `</div>`
  fieldsContent += `</div>`

  fieldsContent += `<div class="row btn-row">`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonGrey}" id="begin-hidden">Begin Hidden Field</button>`
  fieldsContent += `</div>`
  fieldsContent += `<div class="col">`
  fieldsContent += `<button class="${buttonGrey}" id="end-hidden">End Hidden Field</button>`
  fieldsContent += `</div>`
  fieldsContent += `</div>`

  sortedElements = sortedElements.filter(e => {
    return (!e.includes(`flow`) && !e.includes(`hidden`) && !e.includes(`bookend`));
  })

  for (let i = 0; i < sortedElements.length; i = i + 2) {
    let id1;
    let id2;
    let label1;
    let label2;

    id1 = sortedElements[i][0];
    label1 = sortedElements[i][1];

    if (i < sortedElements.length - 1) {
      id2 = sortedElements[i + 1][0];
      label2 = sortedElements[i + 1][1];
    }

    fieldsContent += `<div class="row btn-row">`
    fieldsContent += `<div class="col">`
    fieldsContent += `<button class="${buttonMauve}" id="${id1}">${label1}</button>`
    fieldsContent += `</div>`
    fieldsContent += `<div class="col">`;

    if (i < sortedElements.length - 1) {
      fieldsContent += `<button class="${buttonMauve}" id="${id2}">${label2}</button>`;
    };

    fieldsContent += `</div></div>`;
  }

  $(`#fields-tab-content`).append(fieldsContent)
};

module.exports = buildFieldsContent;