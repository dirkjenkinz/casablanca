"use strict"

const BTN = "button btn-primary btn-sm btn-block";
const buildAddress = require("../fields/address");
const buildFragment = require("../fields/fragment");
const buildHeader = require("../fields/header");
const buildName = require("../fields/name");
const buildNino = require("../fields/nino");
const buildParagraph = require("../fields/paragraph");
const buildTopPart = require("../fields/top_part");
const buildErrorSummary = require("../fields/error_summary");
const buildTextInput = require("../fields/text_input");
const buildPhoneNumber = require("../fields/phone_number");
const buildDate = require("../fields/date");
const buildEmail = require("../fields/email");
const buildEndHidden = require("../fields/end_hidden");
const buildBeginHidden = require("../fields/begin_hidden");
const buildIf = require("../fields/if");
const buildEndif = require("../fields/endif");
const buildElse = require("../fields/else");
const buildElseif = require("../fields/elseif");
const { buildRadioGroup, radio_group_addRadioButton } = require("../fields/radio_group");
const { buildCheckboxArray, checkbox_array_addCheckbox } = require("../fields/checkbox_array");
const buildData = require("../output/build_data");

const save_file = () => {
    let casa = buildData();
    let item = `casa-${casa.folder}/${casa["page-name"]}`;
    console.log('SAVE:', casa)
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
    console.log('LOAD', casa)
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

const populateRadioGroup = field => {
    let prefix = buildRadioGroup().substring(9, 23);
    rebuild(prefix, field)
    if (field.inline) {
        $(`#${prefix}-radio-group-inline-yes`).prop("checked", true)
    }
    let radio_group_buttonCount = 0;
    for (let i = 0; i < field.buttons.length; i++) {
        let newButton = radio_group_addRadioButton(`${prefix}-rb-add-1`, radio_group_buttonCount);
        radio_group_buttonCount++;
        prefix = newButton.substring(38, 52);
        $(`#${prefix}-rb-text-${i + 1}-value`).val(field.buttons[i][0])
        $(`#${prefix}-rb-value-${i + 1}-value`).val(field.buttons[i][1]);
        $(`#${prefix}-rb-trigger-${i + 1}`).val(field.buttons[i][2]);
    }
}

const populateCheckboxArray = field => {
    let prefix = buildCheckboxArray().substring(9, 26);
    rebuild(prefix, field)
    let checkbox_array_boxCount = 0;
    for (let i = 0; i < field.boxes.length; i++) {
        let newBox = checkbox_array_addCheckbox(`${prefix}-cb-add-1`, checkbox_array_boxCount);
        checkbox_array_boxCount++;
        prefix = newBox.substring(40, 57);
        $(`#${prefix}-cb-text-${i + 1}-value`).val(field.boxes[i][0]);
        $(`#${prefix}-cb-value-${i + 1}-value`).val(field.boxes[i][1]);
    }
}

const populateDate = field => {
    let prefix = buildDate().substring(9, 16);
    rebuild(prefix, field);
}

const populateEmail = field => {
    let prefix = buildEmail().substring(9, 17);
    rebuild(prefix, field);
}

const populatePhone = field => {
    let prefix = buildPhoneNumber().substring(9, 17);
    rebuild(prefix, field);
}

const populateName = field => {
    let prefix = buildName().substring(9, 16);
    rebuild(prefix, field);
}

const populateAddress = field => {
    let prefix = buildAddress().substring(9, 19);
    rebuild(prefix, field);
}

const populateBeginHidden = field => {
    let prefix = buildBeginHidden().substring(9, 23);
    rebuild(prefix, field);
}

const populateIf = field => {
    let prefix = buildIf().substring(9, 14);
    let f_condition = `${prefix}-condition-value`;
    $(`#${f_condition}`).val(field.condition);
}

const populateEndif = field => {
    let prefix = buildEndif().substring(9, 17);
}

const populateElse = field => {
    let prefix = buildElse().substring(9, 16);
}

const populateElseif = field => {
    let prefix = buildElseif().substring(9, 18);
    let f_condition = `${prefix}-condition-value`;
    $(`#${f_condition}`).val(field.condition);
}

const populateEndHidden = field => {
    let prefix = buildEndHidden().substring(9, 21);
    rebuild(prefix, field);
}

const populateNino = field => {
    let prefix = buildNino().substring(9, 16);
    rebuild(prefix, field);
}

const populateFragment = field => {
    let prefix = buildFragment().substring(9, 20);
    let f_area = `${prefix}-textarea`;
    $(`#${f_area}`).val(field.fragment);
}

const populateTopPart = field => {
    let prefix = buildTopPart().substring(9, 20);
    let f_top = `${prefix}-textarea`;
    $(`#${f_top}`).val(field.top);
}

const populateTextInput = field => {
    let prefix = buildTextInput().substring(9, 22);
    rebuild(prefix, field);
    $(`#${prefix}-length-value`).val(field.length);

}

const populateHeader = field => {
    let prefix = buildHeader().substring(9, 18);
    $(`#${prefix}-tag-value`).val(field["tag"]);
    $(`#${prefix}-header-value`).val(field.header)
    $(`#${prefix}-h${field["header-size"]}`).prop("checked", true);
}

const populateErrorSummary = field => {
    let prefix = buildErrorSummary().substring(9, 25);
    $(`#${prefix}-tag-value`).val(field["tag"]);
    $(`#${prefix}-header-value`).val(field.header)
    $(`#${prefix}-textarea`).val(field["error-summary"]);
}

const populateParagraph = field => {
    let prefix = buildParagraph().substring(9, 21);
    $(`#${prefix}-tag-value`).val(field["tag"]);
    $(`#${prefix}-header-value`).val(field.header);
    $(`#${prefix}-textarea`).val(field.paragraph);
    switch (field["header-size"]) {
        case 1:
            $(`#${prefix}-h1`).prop("checked", true);
            break;
        case 2:
            $(`#${prefix}-h2`).prop("checked", true);
            break;
        case 3:
            $(`#${prefix}-h3`).prop("checked", true);
            break;
        case 4:
            $(`#${prefix}-h4`).prop("checked", true);
            break;
        case 5:
            $(`#${prefix}-h5`).prop("checked", true);
            break;
        case 6:
            $(`#${prefix}-h6`).prop("checked", true);
            break;
    }
}

const rebuild = (prefix, field) => {
    let data_field = `${prefix}-tag-value`;
    $(`#${data_field}`).val(field["tag"])

    let header_field = `${prefix}-header-value`;
    $(`#${header_field}`).val(field.header);

    let hint_field = `${prefix}-text-hint-value`;
    $(`#${hint_field}`).val(field["text-hint"]);

    let target_field = `${prefix}-target-value`;
    $(`#${target_field}`).val(field.target);

    for (let i = 0; i < field.replacements.length; i++) {

        if (field.replacements[i][0] === `hint`) {
            $(`#${prefix}-hint-${i}`).prop("checked", true);
        } else {
            $(`#${prefix}-header-${i}`).prop("checked", true);
        };

        $(`#${prefix}-from-${i}`).val(field.replacements[i][1]);
        $(`#${prefix}-to-${i}`).val(field.replacements[i][2]);
    }

}

module.exports = {
    save_file,
    file_list,
    delete_file,
    load_casa,
    build_display
}