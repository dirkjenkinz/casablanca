'use strict'

const overview = require(`./overview`);
const pagePanel = require(`./page_panel`);
const fieldsPanel = require(`./fields_panel`);
const outputPanel = require(`./output_panel`);
const fieldsList = require(`./fields_list`);
const fieldInputArea = require(`./field_input_area`);
const flowControlFields = require(`./fields/flow_control_fields`);
const hiddenFields = require(`./fields/hidden_fields`);
const addressField = require(`./fields/address_field`);
const checkboxArrayField = require(`./fields/checkbox_array_field`);
const codeField = require(`./fields/code_field`);
const dateField = require(`./fields/date_field`);
const emailField = require(`./fields/email_field`);
const errorSummaryField = require(`./fields/error_summary_field`);
const nameField = require(`./fields/name_field`);
const ninoField = require(`./fields/nino_field`);
const paragraphField = require(`./fields/paragraph_field`);
const phoneField = require(`./fields/phone_field`);
const radioGroupField = require(`./fields/radio_group_field`);
const bankDetailsField = require(`./fields/bank_details_field`);
const textInputField = require(`./fields/text_input_field`);
const textAreaField = require(`./fields/text_input_field`);
const topPartField = require(`./fields/top_part_field`);

const showHelp = (casa, topPart, divide) => {
    $(`.field-build`).hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    $(`#summary`).hide();
    buildHelp('overview');
    let sideBar = `<div class="row part-label">`
    sideBar += `<div class="col-md-1"></div>`
    sideBar += `<div class="col">`
    sideBar += `<h4>Help</h4>`
    sideBar += `</div>`
    sideBar += `</div>`;
    sideBar += buildSideBar();
    $(`#return-btn-row`).append(sideBar);
    window.scrollTo(0, 0);
};

const buildHelp = (section) => {
    let output;
    switch (section) {
        case ('overview'):
            output = overview();
            break;
        case ('page-panel'):
            output = pagePanel();
            break;
        case ('fields-panel'):
            output = fieldsPanel();
            break;
        case ('output-panel'):
            output = outputPanel();
            break;
        case ('fields-list'):
            output = fieldsList();
            break;
        case ('field-input-area'):
            output = fieldInputArea();
            break;
        case ('flow-control-fields'):
            output = flowControlFields();
            break;
        case ('hidden-fields'):
            output = hiddenFields();
            break;
        case ('address-field'):
            output = addressField();
            break;
        case ('checkbox-array-field'):
            output = checkboxArrayField();
            break;
        case ('code-field'):
            output = codeField();
            break;
        case ('date-field'):
            output = dateField();
            break;
        case ('email-field'):
            output = emailField();
            break;
        case ('error-summary-field'):
            output = errorSummaryField();
            break;
        case ('name-field'):
            output = nameField();
            break;
        case ('nino-field'):
            output = ninoField();
            break;
        case ('error-summary-field'):
            output = errorSummaryField();
            break;
        case ('paragraph-field'):
            output = paragraphField();
            break;
        case ('phone-field'):
            output = phoneField();
            break;
        case ('radio-group-field'):
            output = radioGroupField();
            break;
        case ('bank-details-field'):
            output = bankDetailsField();
            break;
        case ('text-input-field'):
            output = textInputField();
            break;
        case ('text-area-field'):
            output = textAreaField();
            break;
        case ('top-part-field'):
            output = topPartField();
            break;
    }

    $(`.page-build`).empty();
    $(`.page-build`).append(output + `<br>`);
}

const buildSideBar = () => {
    let sideBar = `<div class="sidebar">`
    sideBar += helpButton(`overview`, `Overview`);
    sideBar += helpButton(`page-panel`, `Section 2: The Page Panel`);
    sideBar += helpButton(`fields-panel`, `Section 2: The Fields Panel`);
    sideBar += helpButton(`output-panel`, `Section 2: The Output Panel`);
    sideBar += helpButton(`fields-list`, `Section 3: The Fields List`);
    sideBar += helpButton(`field-input-area`, `Section 4: The Field Input Area`);
    sideBar += doubleButton('flow-control-fields', `Flow Control`, 'hidden-fields', `Hidden Fields`);
    sideBar += doubleButton(`address-field`, `Address`, 'checkbox-array-field', `Checkbox Array`);
    sideBar += doubleButton('code-field', `Code`, 'date-field', `Date`);
    sideBar += doubleButton(`email-field`, `Email`, `error-summary-field`, `Error Summary`);
    sideBar += doubleButton(`name-field`, `Name`, `nino-field`, `Nino`);
    sideBar += doubleButton(`paragraph-field`, `Paragraph`, `phone-field`, `Phone`);
    sideBar += doubleButton(`radio-group-field`, `Radio Group`, `bank-details-field`, `Bank Details`);
    sideBar += doubleButton(`text-input-field`, `Text Input`, `top-part-field`, `Top Part`);
    sideBar += helpButton(`text-area-field`, `Text Area`);

    sideBar += `</div>`;
    sideBar += `</div>`;

    return sideBar;
};

const helpButton = (id, label) => {
    let hButton = `<div class="row">`;
    hButton += `<div class="col">`;
    hButton += `<button class="btn btn-sm btn-dark btn-block btn-help" id="${id}">${label}</button>`;
    hButton += `</div>`;
    hButton += `</div>`;
    return hButton;
};

const doubleButton = (id1, label1, id2, label2) => {
    let hButton = `<div class="row">`;
    hButton += `<div class="col">`;
    hButton += `<button class="btn btn-sm btn-dark btn-block btn-help" id="${id1}">${label1}</button>`;
    hButton += `</div>`;
    hButton += `<div class="col">`;
    hButton += `<button class="btn btn-sm btn-dark btn-block btn-help" id="${id2}">${label2}</button>`;
    hButton += `</div>`;
    hButton += `</div>`;
    return hButton;
};

$(
    $(`body`).click(
        (e) => {
            if (e.target.id === 'overview') {
                buildHelp('overview');
            } else if (e.target.id === 'page-panel') {
                buildHelp('page-panel');
            } else if (e.target.id === 'fields-panel') {
                buildHelp('fields-panel');
            } else if (e.target.id === 'output-panel') {
                buildHelp('output-panel');
            } else if (e.target.id === 'fields-list') {
                buildHelp('fields-list');
            } else if (e.target.id === 'field-input-area') {
                buildHelp('field-input-area');
            } else if (e.target.id === 'flow-control-fields') {
                buildHelp('flow-control-fields');
            } else if (e.target.id === 'hidden-fields') {
                buildHelp('hidden-fields');
            } else if (e.target.id === 'address-field') {
                buildHelp('address-field');
            } else if (e.target.id === 'checkbox-array-field') {
                buildHelp('checkbox-array-field');
            } else if (e.target.id === 'code-field') {
                buildHelp('code-field');
            } else if (e.target.id === 'date-field') {
                buildHelp('date-field');
            } else if (e.target.id === 'email-field') {
                buildHelp('email-field');
            } else if (e.target.id === 'error-summary-field') {
                buildHelp('error-summary-field');
            } else if (e.target.id === 'name-field') {
                buildHelp('name-field');
            } else if (e.target.id === 'nino-field') {
                buildHelp('nino-field');
            } else if (e.target.id === 'paragraph-field') {
                buildHelp('paragraph-field');
            } else if (e.target.id === 'phone-field') {
                buildHelp('phone-field');
            } else if (e.target.id === 'radio-group-field') {
                buildHelp('radio-group-field');
            } else if (e.target.id === 'bank-details-field') {
                buildHelp('bank-details-field');
            } else if (e.target.id === 'text-input-field') {
                buildHelp('text-input-field');
            } else if (e.target.id === 'text-area-field') {
                buildHelp('text-area-field');
            } else if (e.target.id === 'top-part-field') {
                buildHelp('top-part-field');
            }
        }
    )
)

module.exports = showHelp;