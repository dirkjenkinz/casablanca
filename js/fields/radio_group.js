"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");
const { buildTopOfField } = require("./partials");
const BTN = "button btn-primary btn-sm btn-block";

let radio_group_buttonCount;

const buildRadioGroup = () => {
    radio_group_buttonCount = 0;
    let fieldID = getCode();
    let prefix = `${fieldID}-radio-group`;
    let radio_group = buildTopOfField(prefix, "Radio Group", "radio-group")
    radio_group += `<hr><div class="row inline" id="${prefix}-radio-group-inline">
                      <div class="col"></div>
                      <div class="col-md-1">Inline:</div>
                      <div class="col-md-3" id="${prefix}-radio-group-inline-buttons">
                          <input type="radio" name="${prefix}-opt_inline" id="${prefix}-radio-group-inline-yes">&nbsp;Yes
                         &nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="radio" name="${prefix}-opt_inline" id="${prefix}-radio-group-inline-no" checked>&nbsp;No
                      </div>
                      <div class="col"></div>
                    </div><hr>`
    radio_group += `<div class="row">
                      <div class="col-md-1"></div>
                      <div class="col">
                        <button class="${BTN} btn-rb-add" id="${prefix}-rb-add-1">Add a radio button</button>
                      </div>
                      <div class="col-md-1"></div>
                    </div>`
    radio_group += `<div id="${prefix}-button-area"></div>`
    radio_group += `</div></div></div>`
    $(`.field-build`).append(radio_group);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Radio Group", prefix));
    showSelectedElement();
    return radio_group;
}

const radio_group_addRadioButton = (id) => {
    radio_group_buttonCount++;
    let prefix = id.substring(0, 14);
    let newButton = `<div class = "radio-button-group" id="${prefix}-rbgroup-${radio_group_buttonCount}">`;
    newButton += buildButton(`${prefix}-rb-text-${radio_group_buttonCount}`, `${prefix}-rb-del-${radio_group_buttonCount}`);
    newButton += buildInputRow(`${prefix}-rb-value-${radio_group_buttonCount}`);
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
    row += `Button Text</div><div class="col"><input type="text" id="${name}-value" `;
    row += `size="60"></div>
              <div class="col-md-2">
                <button class="button btn-primary btn-sm btn-block delete-btn" id="${btnID}">  
                  Delete
                </button>
              </div>
              <div  class="col-md-1"></div>
            </div>`
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

module.exports = { buildRadioGroup, radio_group_addRadioButton }