'use strict'

const { replacementAdd } = require("../fields/build_field");
const { buildElement } = require("../fields/build_element");
const { checkbox_array_addCheckbox } = require("../fields/checkbox_array");
const { radio_group_addRadioButton } = require("../fields/radio_group");

const populateRadioGroup = field => {
    let prefix = buildElement(`radio-group`).substring(9, 23);
    rebuild(prefix, field)
    if (field.inline) {
        $(`#${prefix}-radio-group-inline-yes`).prop("checked", true)
    }
    let radio_group_buttonCount = 0;
    for (let i = 0; i < field.buttons.length; i++) {
        let newButton = radio_group_addRadioButton(`${prefix}-rb-add-1`, radio_group_buttonCount);
        prefix = newButton.substring(38, 52);
        $(`#${prefix}-rb-text-${radio_group_buttonCount}-value`).val(field.buttons[i][0])
        $(`#${prefix}-rb-value-${radio_group_buttonCount}-value`).val(field.buttons[i][1]);
        $(`#${prefix}-rb-trigger-${radio_group_buttonCount}`).val(field.buttons[i][2]);
        radio_group_buttonCount++;
    }
}

const populateCheckboxArray = field => {
    let prefix = buildElement(`checkbox-array`).substring(9, 26);
    rebuild(prefix, field)
    let checkbox_array_boxCount = 0;
    for (let i = 0; i < field.boxes.length; i++) {
        let newBox = checkbox_array_addCheckbox(`${prefix}-cb-add-1`, checkbox_array_boxCount);
        prefix = newBox.substring(40, 57);
        $(`#${prefix}-cb-text-${checkbox_array_boxCount}-value`).val(field.boxes[i][0]);
        $(`#${prefix}-cb-value-${checkbox_array_boxCount}-value`).val(field.boxes[i][1]);
        $(`#${prefix}-cb-trigger-${checkbox_array_boxCount}`).val(field.boxes[i][2]);
        checkbox_array_boxCount++;
    }
}

const populateDate = field => {
    let prefix = buildElement(`date`).substring(9, 16);
    rebuild(prefix, field);
}

const populateEmail = field => {
    let prefix = buildElement(`email`).substring(9, 17);
    rebuild(prefix, field);
}

const populatePhone = field => {
    let prefix = buildElement('phone').substring(9, 17);
    rebuild(prefix, field);
}

const populateName = field => {
    let prefix = buildElement(`name`).substring(9, 16);
    rebuild(prefix, field);
}

const populateAddress = field => {
    let prefix = buildElement(`address`).substring(9, 19);
    rebuild(prefix, field);
}

const populateBeginHidden = field => {
    let prefix = buildElement(`begin-hidden`).substring(9, 24);
    rebuild(prefix, field);
    $(`#${prefix}-blanked-by-value`).val(field[`blanked-by`]);
}

const populateIf = field => {
    let prefix = buildElement(`if`).substring(9, 14);
    let f_condition = `${prefix}-condition-value`;
    $(`#${f_condition}`).val(field.condition);
}

const populateEndif = field => {
    let prefix = buildElement(`endif`).substring(9, 17);
}

const populateElse = field => {
    let prefix = buildElement(`else`).substring(9, 16);
}

const populateElseif = field => {
    let prefix = buildElement(`elseif`).substring(9, 18);
    let f_condition = `${prefix}-condition-value`;
    $(`#${f_condition}`).val(field.condition);
}

const populateEndHidden = field => {
    let prefix = buildElement(`end-hidden`).substring(9, 21);
    rebuild(prefix, field);
}

const populateNino = field => {
    let prefix = buildElement(`nino`).substring(9, 16);
    rebuild(prefix, field);
}

const populateParagraph = field => {
    let prefix = buildElement(`paragraph`).substring(9, 21);
    rebuild(prefix, field);
    $(`#${prefix}-textarea`).val(field.paragraph);
}

const populateFragment = field => {
    let prefix = buildElement(`fragment`).substring(9, 20);
    let f_area = `${prefix}-textarea`;
    $(`#${f_area}`).val(field.fragment);
}

const populateTopPart = field => {
    let prefix = buildElement(`top-part`).substring(9, 20);
    let f_top = `${prefix}-textarea`;
    $(`#${f_top}`).val(field.top);
}

const populateTextInput = field => {
    let prefix = buildElement(`text-input`).substring(9, 22);
    rebuild(prefix, field);
    $(`#${prefix}-length-value`).val(field[`text-length`]);
}

const populateTextArea = field => {
    let prefix = buildElement(`text-area`).substring(9, 21);
    rebuild(prefix, field);
    $(`#${prefix}-length-value`).val(field[`text-length`]);
    $(`#${prefix}-height-value`).val(field[`text-height`]);
}

const populateBankDetails = field => {
    let prefix = buildElement(`bank-details`).substring(9, 24);
    rebuild(prefix, field);
    $(`#${prefix}-length-value`).val(field.length);
}

const populateHeader = field => {
    let prefix = buildElement(`header`).substring(9, 18);
    $(`#${prefix}-tag-value`).val(field["tag"]);
    $(`#${prefix}-header-value`).val(field.header)
    $(`#${prefix}-h${field["header-size"]}`).prop("checked", true);
}

const populateErrorSummary = field => {
    let prefix = buildElement(`error-summary`).substring(9, 25);
    $(`#${prefix}-tag-value`).val(field["tag"]);
    $(`#${prefix}-header-value`).val(field.header)
    $(`#${prefix}-textarea`).val(field["error-summary"]);
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

    if (field.replacements) {
        for (let i = 0; i < field.replacements.length; i++) {
            replacementAdd(`${prefix}-rep-btn-add`)

            if (field.replacements[i][0] === `hint`) {
                $(`#${prefix}-hint-${i}`).prop("checked", true);
            } else {
                $(`#${prefix}-header-${i}`).prop("checked", true);
            };

            $(`#${prefix}-left-${i}`).val(field.replacements[i][1]);
            $(`#${prefix}-right-${i}`).val(field.replacements[i][2]);
        }
    }
}

module.exports = {
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
    populateTextArea,
    populateBankDetails,
    populateTopPart
}