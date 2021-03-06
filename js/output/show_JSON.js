'use strict'

const address_JSON = require("./json_builders/address_JSON");
const date_JSON = require("./json_builders/date_JSON");
const email_JSON = require("./json_builders/email_JSON");
const code_JSON = require("./json_builders/code_JSON");
const header_JSON = require("./json_builders/header_JSON");
const name_JSON = require("./json_builders/name_JSON");
const nino_JSON = require("./json_builders/nino_JSON");
const paragraph_JSON = require("./json_builders/paragraph_JSON");
const errorSummary_JSON = require("./json_builders/errorSummary_JSON");
const textInput_JSON = require("./json_builders/textInput_JSON");
const bankDetails_JSON = require("./json_builders/bankDetails_JSON");
const phone_JSON = require("./json_builders/phone_JSON");
const radioGroup_JSON = require("./json_builders/radioGroup_JSON");
const checkboxArray_JSON = require("./json_builders/checkboxArray_JSON");

const showJSON = (casa, divide) => {
    $(".field-build").hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    $(`#summary`).hide();
    let json = buildJSON(casa, divide);
    $(`.page-build`).empty();
    $('.page-build').append(`<textarea id="page-output" cols="130" rows="38">${json}</textarea>`);
    window.scrollTo(0, 0);
}

const buildJSON = (casa, divide) => {
    let header = casa['page-header'];
    let json = `{\n`;
    json += `"pageHeader": "${header}",`
    json += buildMessages(casa.fields, divide);
    json = indentJSON(json.split('\n')).trim();

    if (json.substring(json.length - 1) === ",") {
        json = json.substring(0, json.length - 1)
    }

    if (json.substring(json.length - 1) === ",") {
        json = json.substring(0, json.length - 1)
    }

    json += `\n}`
    return json
}

const buildMessages = (fields, divide) => {
    let json = [];
    fields.forEach(field => {
        if (divide) {
            json += `\n============ ${[field["field-name"]]} ============\n`;
        }
        switch (field['field-name']) {
            case 'address':
                json += address_JSON(field);
                break;
            case 'phone':
                json += phone_JSON(field);
                break;
            case 'email':
                json += email_JSON(field);
                break;
            case 'name':
                json += name_JSON(field);
                break;
            case 'nino':
                json += nino_JSON(field);
                break;
            case 'date':
                json += date_JSON(field);
                break;
            case 'paragraph':
                json += paragraph_JSON(field);
                break;
            case 'error-summary':
                json += errorSummary_JSON(field);
                break;
            case 'text-input':
                json += textInput_JSON(field);
                break;
            case 'bank-details':
                json += bankDetails_JSON(field);
                break;
            case 'header':
                json += header_JSON(field);
                break;
            case 'code':
                json += code_JSON(field);
                break;
            case 'radio-group':
                json += radioGroup_JSON(field);
                break;
            case 'checkbox-array':
                json += checkboxArray_JSON(field);
                break;
        }
    })
    return json;
}

const indentJSON = data => {
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
        newLine = `${line.trim()}\n`;

        if (newLine.includes("}")) {
            ind--;
        }

        output += `${block[ind]}${newLine}`

        if (newLine.includes("{")) {
            ind++;
        }

    })

    return output;
}

module.exports = { showJSON, buildJSON };