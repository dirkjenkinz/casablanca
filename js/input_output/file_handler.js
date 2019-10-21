"use strict"

const BTN = "button btn-primary btn-sm btn-block";
const buildData = require("../output/build_data");


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
    populateFragment,
    populateHeader,
    populateIf,
    populateName,
    populateNino,
    populateParagraph,
    populatePhone,
    populateRadioGroup,
    populateTextInput,
    populateTopPart
} = require("./populate");

const save_file = () => {
    let casa = buildData();
    console.log(casa)
    let item = `casa-${casa.folder}/${casa["page-name"]}`;
    localStorage.setItem(item, JSON.stringify(casa));
}

const file_list = () => {
    $("#file-display").show();
    $("#main-display").hide();
    $(`#list-of-files`).remove();
    let items = `<div id="list-of-files"><br/><button class="button btn-sm btn-danger btn-block field-button" id="return-to-build">Return to Build</button><br/>`
    items += `<div class="row"><h5>&nbsp;&nbsp;Saved Pages.</h5><br/>
  Click on blue button to load...
  <br/></div>`;

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
          <div class="col-md-2"><button class="${BTN} del-file-btn" id="del-file-${key_transformed}">Del&nbsp;&nbsp;&nbsp;&nbsp;</button></div>
          <div class="col"><button class="${BTN} load-btn" id="${key_transformed}">${key}</button></div>
        </div>`
    }
    items += `</div>`
    $("#file-display").append(items);
}

const load_casa = (id) => {
    let key = id.replace("_", "/")
    let casa = JSON.parse(localStorage.getItem(key));
    $("#file-display").hide();
    $("#main-display").show();
    $("#elements").empty();
    build_display(casa);
    let f = `Entity: ${$("#folder").val()}-${$("#page-name").val()}`;
    $(`#folder-and-page`).text(f);
}

const build_display = (casa) => {
    let divide = true;
    $("#folder").val(casa.folder);
    $("#page-name").val(casa["page-name"]);
    $("#page-header").val(casa["page-header"]);
    $("#prevalidate").prop("checked", casa.prevalidate);
    $("#postvalidate").prop("checked", casa.postvalidate);
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
            case "fragment":
                populateFragment(field)
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

const delete_file = (id) => {
    let r = confirm("Are you sure you want to delete this file?");
    if (r == true) {
        id = id.substring(9);
        localStorage.removeItem(id.replace("_", "/"));
        file_list();
    }
}



module.exports = {
    save_file,
    file_list,
    delete_file,
    load_casa,
    build_display
}