"use strict"
let radio_group_buttonCount = 0;

const radio_group_addRadioButton = (id, buttonCount = radio_group_buttonCount) => {
    radio_group_buttonCount++;
    let prefix = id.substring(0, 14);
    let newButton = `<div class = "radio-button-group" id="${prefix}-rbgroup-${buttonCount}">`;
    newButton += buildButton(`${prefix}-rb-text-${buttonCount}`, `${prefix}-rb-del-${buttonCount}`);
    newButton += buildInputRow(`${prefix}-rb-value-${buttonCount}`);
    $(`#${prefix}-button-area`).append(newButton);
    return newButton;
}

const buildInputRow = (name) => {
    let row = `<div class="row btn-value" id="${name}">`
    row += `<div class="col-md-2 right-justify">`;
    row += `Button Value</div><div class="col"><input type="text" id="${name}-value" size="20">`;
    row += `</div>`
    row += `<div class="col-md-2 right-justify">`;
    name = name.replace(`value`, `trigger`);
    row += `Target:</div><div class="col"><input type="text" id="${name}" size="40">`;
    row += `</div>`
    row += `<div class="col"></div>`
    row += `</div>`
    return row
}

const radio_group_deleteRadioButton = (id) => {
    id = id.replace("-rb-del-", "-rbgroup-")
    $(`#${id}`).remove();
}

const buildButton = (name, btnID) => {
    let row = `<div class="row" id="${name}"><div class="col-md-2 right-justify">`;
    row += `Button Text</div><div class="col"><input type="text" id="${name}-value"`;
    row += `size="60"></div>`
    row += `<div class="col-md-2">`
    row += `<button class="button btn-danger btn-sm btn-block delete-btn" id="${btnID}">`
    row += `Delete`
    row += `</button>`
    row += `</div>`
    row += `<div  class="col-md-1"></div>`
    row += `</div>`
    return row
}

$(
    $("body").click((e) => {
        let id = e.target.id;
        if (id.substring(3, 14) === "radio-group") {
            if (id.includes("-rb-add-")) {
                radio_group_addRadioButton(id);
            } else if (id.includes("-rb-del-")) {
                radio_group_deleteRadioButton(id);
            }
        }
    })
)

module.exports = { radio_group_addRadioButton }