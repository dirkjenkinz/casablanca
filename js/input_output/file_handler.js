"use strict"

const BTN = `button btn-primary btn-sm btn-block`;
const buildData = require(`../output/build_data`);

const {
  populateAddress,
  populateBeginHidden,
  populateCheckboxArray,
  populateDate,
  populateElse,
  populateElseif,
  populateEmail,
  populateEndHidden,
  populateEndif,
  populateErrorSummary,
  populateCode,
  populateFooter,
  populateHeader,
  populateIf,
  populateName,
  populateNino,
  populateParagraph,
  populatePhone,
  populateRadioGroup,
  populateTextInput,
  populateTextArea,
  populateBankDetails,
  populateTopPart
} = require("./populate");

const saveFile = () => {
  let casa = buildData();
  console.log('SAVE:', casa);
  let item = `casa-${casa.folder}/${casa["page-name"]}`;
  localStorage.setItem(item, JSON.stringify(casa));
  $(`#message-box`).text(`Screen saved: ${casa.folder}/${casa["page-name"]}.`);
}

const listFiles = () => {
  $("#file-display").show();
  $("#main-display").hide();
  $(`#list-of-files`).remove();
  $(`#summary`).hide();
  $(`#fields`).hide();
  let items = `<div id="list-of-files"><br/><button class="button btn-sm btn-danger btn-block field-button" id="return-to-build">Return to Build</button>`
  items += `<div class="row part-label">Saved Pages</div>`
  items += `<div class="row part-label">Click on blue button to load.</div>`;
  items += '<div class="files">'

  let fileList = [];

  for (let i = 0; i < localStorage.length; i++) {
    let key = window.localStorage.key(i);
    if (key.substring(0, 5) === "casa-") {
      fileList.push(key);
    }
  }

  fileList = fileList.sort();

  for (let i = 0; i < fileList.length; i++) {
    let key = fileList[i];
    let key_transformed = key.replace("/", "_");
    key = key.substring(5)
    items += `
        <div class="row load-btn-row">
          <div class="col-md-3"><button class="${BTN} del-file-btn" id="del-file-${key_transformed}">Delete</button></div>
          <div class="col"><button class="${BTN} load-btn" id="${key_transformed}">${key}</button></div>
        </div>`
  }
  items += `</div></div>`
  $("#file-display").append(items);
}

const loadCasa = (id) => {
  let key = id.replace("_", "/")
  let casa = JSON.parse(localStorage.getItem(key));
  console.log('LOAD:', casa)
  $("#file-display").hide();
  $("#main-display").show();
  $("#elements").empty();
  $(`#top-part`).attr("disabled", false);
  $(`#footer`).attr("disabled", false);
  $(`#message-box`).text(``);
  buildDisplay(casa);
  let f = `Current Screen: ${$("#folder").val()}-${$("#page-name").val()}`;
  $(`#folder-and-page`).text(f);
  $(`#summary`).show();
  $(`#fields`).show();
}

const buildDisplay = (casa) => {
  let divide = true;
  $("#folder").val(casa.folder);
  $("#page-name").val(casa["page-name"]);
  $("#page-header").val(casa["page-header"]);
  $("#prevalidate").prop("checked", casa.prevalidate);
  $("#pregather").prop("checked", casa.pregather);
  $("#postvalidate").prop("checked", casa.postvalidate);
  $("#postrender").prop("checked", casa.postrender);
  $("#preredirect").prop("checked", casa.preredirect);
  $(".field-build").empty();
  casa.fields.forEach(field => {
    switch (field["field-name"]) {
      case "radio-group":
        populateRadioGroup(field);
        break;
      case "checkbox-array":
        populateCheckboxArray(field);
        break;
      case "date":
        populateDate(field);
        break;
      case "email":
        populateEmail(field);
        break;
      case "phone":
        populatePhone(field);
        break;
      case "name":
        populateName(field);
        break;
      case "address":
        populateAddress(field);
        break;
      case "nino":
        populateNino(field);
        break;
      case "code":
        populateCode(field)
        break;
      case "footer":
        populateFooter(field)
        break;
      case "paragraph":
        populateParagraph(field);
        break;
      case "top-part":
        populateTopPart(field);
        break;
      case "error-summary":
        populateErrorSummary(field);
        break;
      case "text-input":
        populateTextInput(field);
        break;
      case "text-area":
        populateTextArea(field);
        break;
      case "bank-details":
        populateBankDetails(field);
        break;
      case "header":
        populateHeader(field);
        break;
      case "end-hidden":
        populateEndHidden(field);
        break;
      case "begin-hidden":
        populateBeginHidden(field);
        break;
      case "if":
        populateIf(field);
        break;
      case "endif":
        populateEndif(field);
        break;
      case "elseif":
        populateElseif(field);
        break;
      case "else":
        populateElse(field);
        break;
    }
  })
}

const deleteFile = (id) => {
  let r = confirm("Are you sure you want to delete this file?");
  if (r == true) {
    id = id.substring(9);
    localStorage.removeItem(id.replace("_", "/"));
    listFiles();
  }
}

module.exports = {
  saveFile,
  listFiles,
  deleteFile,
  loadCasa,
  buildDisplay
}