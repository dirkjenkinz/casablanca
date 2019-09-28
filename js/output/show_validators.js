'use strict'

const showValidators = (casa) => {
  $(".field-build").hide();
  $(".page-build").show();
  $(".page-details").hide();
  $(".page-neutral").show();
  $("#page-output").remove();
  let validators = buildValidators(casa)
  $(".page-build").append(`<textarea id="page-output" cols="140" rows="30">${validators}</textarea>`);
}

const buildValidators = (casa) => {
  let data;
  let pageName = casa["page-name"];
  let top = buildTopSection(casa.fields);
  let validators = top + `const fieldValidators = {\n`

  casa.fields.forEach(field => {
    switch (field["field-name"]) {
      case 'address':
        data = field["text-form-data"];
        validators += address_validators(pageName, data);
        break;
      case 'phone':
        data = field["text-form-data"];
        validators += phone_validators(pageName, data);
        break;
      case 'email':
        data = field["text-form-data"];
        validators += email_validators(pageName, data);
        break;
      case 'name':
        data = field["text-form-data"];
        validators += name_validators(pageName, data);
        break;
      case 'nino':
        data = field["text-form-data"];
        validators += nino_validators(pageName, data);
        break;
      case 'date':
        data = field["text-form-data"];
        validators += date_validators(pageName, data);
        break;
      case 'radio_group':
        data = field["text-form-data"];
        validators += radioGroup_validators(pageName, data);
        break;
    }
  })

  validators += `
};\n\nmodule.exports = fieldValidators;`

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
        top += `const addressValidation = require('ui-citizen-casa-extensions/app/custom-validators/cadsAddress')\n`;
        top += `const addressValidation = require('ui-citizen-casa-extensions/app/custom-validators/cadsAddress');\n`
        break;
      case 'phone':
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