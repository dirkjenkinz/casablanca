'use strict'

const showPage = (casa, topPart) => {
  $(".field-build").hide();
  $(".page-build").show();
  $(".page-details").hide();
  $(".page-neutral").show();
  $("#page-output").remove();
  let page = buildPage(casa, topPart);
  $(".page-build").append(`<textarea id="page-output" cols="140" rows="30">${page}</textarea>`);
}

const buildPage = (casa) => {
  let pageName = `${casa.folder}-${casa["page-name"]}`;
  let page = "";

  topPart.forEach(item => {
    page += `${item}\n`;
  })

  page += `{% set pageName = "${pageName}" %}\n\n`
  page += `{% block journey_form %}\n`
  page += `{{ super() }}\n\n`
  if (casa.fields) {
    page += buildFields(casa.fields, pageName)
  }
  
  page = indentPage(page.split('\n')).trim();
  return page;
}

const buildFields = (fields, pageName) => {
  let fieldData = "";
  fields.forEach(field => {
    switch (field["field-name"]) {
      case "address":
        fieldData += buildAddressObject(pageName, field["text-form-data"]);
        break;
      case "phone":
        fieldData += buildPhoneObject(pageName, field["text-form-data"]);
        break;
      case "email":
        fieldData += buildEmailObject(pageName, field["text-form-data"]);
        break;
      case "name":
        fieldData += buildNameObject(pageName, field["text-form-data"]);
        break;
      case "nino":
        fieldData += buildNinoObject(pageName, field["text-form-data"]);
        break;
      case "date":
        fieldData += buildDateObject(pageName, field);
        break;
      case "paragraph":
        fieldData += buildParagraphObject(pageName, field);
        break;
      case "header":
        fieldData += buildHeaderObject(pageName, field);
        break;
      case "radio_group":
        fieldData += buildRadioGroupObject(
          pageName,
          field["text-form-data"],
          field["buttons"],
          field.inline,
          field["text-hint"]);
        break;
      case "fragment":
        fieldData += parseFragment(pageName, field);
        break;
    }
  })
  fieldData += `{% endblock %}`
  return fieldData;
}

const indentPage = data => {
  let b = '    ';
  let block = [];
  let padding = "";
  let ind = 0;
  let output = "";
  let newLine = "";

  for (let i = 0; i < 100; i++) {
    block.push(padding);
    padding += b;
  }

  data.forEach(line => {

    line = line.trim();

    if (line.includes("{% endif")) {
      ind--;
    } else if (line.includes("{% endblock")) {
      ind--;
    } else if (line.includes("{% endcall")) {
      ind--;
    } else if (line.includes("errors=formErrors)")) {
      ind--;
    } else if (line.substring(0, 2) === "}}") {
      ind--;
     } else if (line.substring(0, 2) === "%}") {
      ind--;
    } else if (line.substring(0, 3) === "</p") {
      ind--
    }

    if (ind < 0) ind = 0;

    if (line === `errors=formErrors`){
      line += ')'
    } 

    newLine = `${line.trim()}\n`;

    output += `${block[ind]}${newLine}`


    if (newLine.includes("{% if")) {
      ind++;
    } else if (newLine.includes("{% block")) {
      ind++;
    } else if (newLine.includes("{% call")) {
      ind++;
    } else if (newLine.includes("options = {")) {
      ind++;
    } else if (newLine.includes("{{ form")) {
      ind++;
    } else if (newLine.substring(0, 2) === "<p") {
      ind++;
    }
  })

  return output;
}