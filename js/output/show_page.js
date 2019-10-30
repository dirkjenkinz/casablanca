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
const buildTextInputObject = require("./page_builders/text_input_page.js");
const buildTextAreaObject = require("./page_builders/text_area_page.js");
const buildBankDetailsObject = require("./page_builders/bank_details_page.js");
const buildHeaderObject = require("./page_builders/header_page.js");
const buildRadioGroupObject = require("./page_builders/radio_group_page.js");
const buildBeginHiddenObject = require("./page_builders/begin_hidden_page.js");
const parseFragment = require("./page_builders/fragment_page.js");

const showPage = (casa, topPart, divide) => {
    $(`.field-build`).hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(`.page-build`).show();
    $(`.page-details`).hide();
    $(`.page-neutral`).show();
    $(`#page-output`).remove();
    $(`#summary`).hide();
    let page = buildPage(casa, topPart, divide);
    $(`.page-build`).empty();
    $(`.page-build`).append(`<textarea id="page-output" cols="130" rows="38">${page}</textarea>`);
    window.scrollTo(0, 0);
};

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

    page += otherTopParts(casa.fields);
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

const otherTopParts = (fields) => {
  let other = "";
  let address = false;
  let bankDetails = false;
  fields.forEach(field => {
    if (field[`field-name`] === 'address') {
      address = true;
    };
    if (field[`field-name`] === 'bank-details') {
      bankDetails = true;
    };
  })
  if (address) {
    other += `{% import "cads/macros/cads-address.html" as address %}\n`
  };
  if (bankDetails) {
    other += `{% import "cads/macros/cads-sortCode.html" as sortCode %}\n`
  }
  return other;
};

const buildFields = (fields, pageName, divide) => {
  let fieldData = ``;
  fields.forEach(field => {
    if (divide) {
      fieldData += `============ ${[field["field-name"]]} ============\n`;
    }
    console.log(field)
    let fieldCopy = parseHeader(field, pageName);
    fieldCopy = parseHint(field, pageName);
    switch (field[`field-name`]) {
      case `address`:
        fieldData += buildAddressObject(pageName, fieldCopy);
        break;
      case `phone`:
        fieldData += buildPhoneObject(pageName, fieldCopy);
        break;
      case `email`:
        fieldData += buildEmailObject(pageName, fieldCopy);
        break;
      case `name`:
        fieldData += buildNameObject(pageName, fieldCopy);
        break;
      case `nino`:
        fieldData += buildNinoObject(pageName, fieldCopy);
        break;
      case `date`:
        fieldData += buildDateObject(pageName, fieldCopy);
        break;
      case `paragraph`:
        fieldData += buildParagraphObject(pageName, fieldCopy);
        break;
      case `error-summary`:
        fieldData += buildErrorSummaryObject(pageName, fieldCopy);
        break;
      case `text-input`:
        fieldData += buildTextInputObject(pageName, fieldCopy);
        break;
      case `text-area`:
        fieldData += buildTextAreaObject(pageName, fieldCopy);
        break;
      case `bank-details`:
        fieldData += buildBankDetailsObject(pageName, fieldCopy);
        break;
      case `header`:
        fieldData += buildHeaderObject(pageName, fieldCopy);
        break;
      case `if`:
        fieldData += buildIfObject(pageName, fieldCopy);
        break;
      case `elseif`:
        fieldData += buildElseifObject(pageName, fieldCopy);
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
        fieldData += buildBeginHiddenObject(pageName, fieldCopy);
        break;
      case `radio-group`:
        fieldData += buildRadioGroupObject(pageName, fieldCopy);
        break;
      case `checkbox-array`:
        fieldData += buildCheckboxArrayObject(pageName, fieldCopy);
        break;
      case `fragment`:
        fieldData += parseFragment(pageName, fieldCopy);
        break;
    }
  });

  fieldData += `{% endblock %}`
  return fieldData;
}

const parseHeader = (field, pageName) => {
  let start;
  let end;
  let cnt = 0;
  let header = field.header;
  let tag = field.tag;

  do {
    cnt++
    start = header.indexOf(`<=`);
    end = header.indexOf(`=>`);
    if (start > -1 && end > -1) {
      let subHeader = header.substring(start + 2, end).trim();
      let varName = subHeader.substring(0, subHeader.indexOf(`=`)).trim();
      let newText = `{{ t("${pageName}:${tag}.${varName}) }}`
      let oldText = header.substring(start, end + 2);
      header = header.replace(oldText, newText)
    }
  } while (start > -1 && end > -1 && cnt < 500);
  field.header = header;
  return field;
};

const parseHint = (field, pageName) => {
  let start;
  let end;
  let cnt = 0;
  let hint = field.hint;
  let tag = field.tag;

  do {
    cnt++
    start = hint.indexOf(`<=`);
    end = hint.indexOf(`=>`);
    if (start > -1 && end > -1) {
      let subHint = hint.substring(start + 2, end).trim();
      let varName = subHint.substring(0, subHint.indexOf(`=`)).trim();
      let newText = `{{ t("${pageName}:${tag}.${varName}) }}`
      let oldText = hint.substring(start, end + 2);
      hint = hint.replace(oldText, newText)
    }
  } while (start > -1 && end > -1 && cnt < 500);
  field.hint = hint;
  return field;
};

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