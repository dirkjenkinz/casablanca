'use strict'

const buildIfObject = require("./page_builders/if_page.js");
const buildElseifObject = require("./page_builders/elseif_page.js");
const buildAddressObject = require("./page_builders/address_page.js");
const buildPhoneObject = require("./page_builders/phone_page.js");
const buildEmailObject = require("./page_builders/email_page.js");
const buildNameObject = require("./page_builders/name_page.js");
const buildNinoObject = require("./page_builders/nino_page.js");
const buildDateObject = require("./page_builders/date_page.js");
const buildCheckboxArrayObject = require("./page_builders/checkbox_array_page.js");
const buildParagraphObject = require("./page_builders/paragraph_page.js");
const buildErrorSummaryObject = require("./page_builders/error_summary_page.js");
const buildTextInputObject = require("./page_builders/text_input_page.js")
const buildHeaderObject = require("./page_builders/header_page.js");
const buildRadioGroupObject = require("./page_builders/radio_group_page.js");
const buildBeginHiddenObject = require("./page_builders/begin_hidden_page.js");
const parseFragment = require("./page_builders/fragment_page.js");

const showPage = (casa, topPart, divide) => {
    $(`.field-build`).hide();
    $(`#show-all`).hide();
    $(`.page-build`).show();
    $(`.page-details`).hide();
    $(`.page-neutral`).show();
    $(`#page-output`).remove();
    $(`#summary`).hide();
    let page = buildPage(casa, topPart, divide);
    $(`.page-build`).append(`<textarea id="page-output" cols="120" rows="30">${page}</textarea>`);
    window.scrollTo(0, 0);
}

const buildPage = (casa, topPart, divide) => {

        let pageName = `${casa.folder}-${casa[`page-name`]}`;
  let page = ``;

  let firstField = casa.fields[0];

  if (firstField) {

    if (firstField["field-name"] === `top-part`) {
      page += `${firstField.top}\n`;
    } else {
      topPart.forEach(item => {
        page += `${item}\n`;
      })
    }

    page += `{% set pageName = "${pageName}" %}\n\n`
    page += `{% block journey_form %}\n`
    page += `{{ super() }}\n\n`
    if (casa.fields) {
      page += buildFields(casa.fields, pageName, divide)
    }
    page = indentPage(page.split('\n')).trim();

  }
  return page;
}

const buildFields = (fields, pageName, divide) => {
  let fieldData = ``;
  fields.forEach(field => {
    switch (field[`field-name`]) {
      case `address`:
        fieldData += buildAddressObject(pageName, field);
        break;
      case `phone`:
        fieldData += buildPhoneObject(pageName, field);
        break;
      case `email`:
        fieldData += buildEmailObject(pageName, field);
        break;
      case `name`:
        fieldData += buildNameObject(pageName, field);
        break;
      case `nino`:
        fieldData += buildNinoObject(pageName, field);
        break;
      case `date`:
        fieldData += buildDateObject(pageName, field);
        break;
      case `paragraph`:
        fieldData += buildParagraphObject(pageName, field);
        break;
      case `error-summary`:
        fieldData += buildErrorSummaryObject(pageName, field);
        break;
      case `text-input`:
        fieldData += buildTextInputObject(pageName, field);
        break;
      case `header`:
        fieldData += buildHeaderObject(pageName, field);
        break;
      case `if`:
        fieldData += buildIfObject(pageName, field);
        break;
      case `elseif`:
        fieldData += buildElseifObject(pageName, field);
        break;
      case `end-hidden`:
        fieldData += `</div>\n\n`
        break;
      case `endif`:
        fieldData += ` {% endif %}\n\n`
        break;
      case `else`:
        fieldData += ` {% else %}\n\n`
        break;
      case `begin-hidden`:
        fieldData += buildBeginHiddenObject(pageName, field);
        break;
      case `radio-group`:
        fieldData += buildRadioGroupObject(pageName, field);
        break;
      case `checkbox-array`:
        fieldData += buildCheckboxArrayObject(pageName, field);
        break;
      case `fragment`:
        fieldData += parseFragment(pageName, field);
        break;
    }
    if (divide) {
      fieldData += `\n[]=======================================================================================[]\n\n`;
    }
  });

  fieldData += `{% endblock %}`
  return fieldData;
}

const indentPage = data => {
  let b = `        `;
  let block = [];
  let padding = ``;
  let ind = 0;
  let output = ``;

  for (let i = 0; i < 100; i++) {
    block.push(padding);
    padding += b;
  }

  data.forEach(line => {
    line = line.trim();

    if (line.includes(`{% endif`)) {
      ind--;
    } else if (line.includes(`{% else`)) {
      ind--;
    } else if (line.includes(`{% endblock`)) {
      ind--;
    } else if (line.substring(0, 2) === `}}`) {
      ind--;
    } else if (line.substring(0, 5) === `</ul>`) {
      ind--;
    } else if (line.substring(0, 2) === `},`) {
      ind--;
    } else if (line.substring(0, 2) === `%}`) {
      ind--;
    } else if (line.substring(0, 3) === `</p`) {
      ind--;
    } else if (line.substring(0, 6) === `</div>`) {
      ind--;
    } else if (line.includes("| replace")) {
      ind++;
    }

    if (ind < 0) ind = 0;

    if (line === `errors=formErrors`) {
      line += ')'
    }

    output += `${block[ind]}${line}\n`

    if (line.includes(`{% if`)) {
      ind++;
    } else if (line.includes(`{% else`)) {
      ind++;
    } else if (line.includes(`{% block`)) {
      ind++;
    } else if (line.includes(`{% call`)) {
      ind++;
    } else if (line.includes(`options = {`)) {
      ind++;
    } else if (line.includes(`{{ form`)) {
      ind++;
    } else if (line.includes(`{{ address`)) {
      ind++;
    } else if (line.substring(0, 2) === `<p`) {
      ind++;
    } else if (line.substring(0, 3) === `<ul`) {
      ind++;
    } else if (line.substring(0, 4) === `<div`) {
      ind++;
    } else if (line.includes("| replace")) {
      ind--;
    }
  })

  return output;
}

module.exports = { showPage, buildPage };