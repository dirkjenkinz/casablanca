'use strict'

const address_validators = require("./validation_builders/address_validators");
const date_validators = require("./validation_builders/date_validators");
const email_validators = require("./validation_builders/email_validators");
const name_validators = require("./validation_builders/name_validators");
const nino_validators = require("./validation_builders/nino_validators");
const phone_validators = require("./validation_builders/phone_validators");
const textInput_validators = require("./validation_builders/textInput_validators");
const radioGroup_validators = require("./validation_builders/radioGroup_validators");
const checkboxArray_validators = require("./validation_builders/checkboxArray_validators");


const showValidators = (casa, divide) => {
    $(".field-build").hide();
    $(`#show-all`).hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    $(`#summary`).hide();
    let validators = buildValidators(casa, divide);
    $(".page-build").append(`<textarea id="page-output" cols="120" rows="30">${validators}</textarea>`);
    window.scrollTo(0, 0);
}

const buildValidators = (casa, divide) => {
    let tag;
    let pageName = casa["page-name"];
    let top = buildTopSection(casa.fields);
    let validators = top + `const fieldValidators = {`

    casa.fields.forEach(field => {
        let tag = field.tag;
        switch (field["field-name"]) {
            case 'address':
                validators += address_validators(pageName, tag);
                break;
            case 'phone':
                validators += phone_validators(pageName, tag);
                break;
            case 'email':
                validators += email_validators(pageName, tag);
                break;
            case 'name':
                validators += name_validators(pageName, tag);
                break;
            case 'nino':
                validators += nino_validators(pageName, tag);
                break;
            case 'date':
                validators += date_validators(pageName, tag);
                break;
            case 'radio-group':
                validators += radioGroup_validators(pageName, field);
                break;
            case 'text-input':
                validators += textInput_validators(pageName, field);
                break;
            case 'checkbox-array':
                validators += checkboxArray_validators(pageName, field);
                break;
        }
        if (divide) {
            validators += `\n[]=======================================================================================[]\n\n`;
        }
    })

    validators = validators.substring(0, validators.length - 1);

    validators += `\n};\n\nmodule.exports = fieldValidators;`

    return validators;
}

const buildTopSection = (fields) => {
    let top = `
const Validation = require('govuk-casa/lib/Validation');
const r = Validation.rules;
const sf = Validation.SimpleField;\n`
    fields.forEach(field => {
        switch (field["field-name"]) {
            case 'address':
                top += `const addressValidation = require('ui-citizen-casa-extensions/app/custom-validators/cadsAddress');\n`
                break;
            case 'phone':
            case 'text-input':
                top += `const regexDefinitions = require('ui-citizen-casa-extensions/app/helpers/regexDefinitions');\n`
                break;
            case 'email':
                top += `const emailFormatValidator = require('ui-citizen-casa-extensions/app/custom-validators/emailFormatValidator');\n`
                top += `const emailValidator = require('../../../custom-validators/emailMatchValidator');\n`
                break;
        }
    })
    return top + '\n';
}

module.exports = { showValidators, buildValidators };