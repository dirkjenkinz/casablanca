"use strict"

const { getCode } = require("../codes");
const { addElement, showSelectedElement } = require("./elements.js");
const { buildInputRow, buildTopOfField } = require("./partials");
const BTN = "box btn-primary btn-sm btn-block";
let checkbox_array_boxCount;


const buildCheckboxArray = () => {
    checkbox_array_boxCount = 0;
    let fieldID = getCode();
    let prefix = `${fieldID}-checkbox-array`;
    let checkbox_array = buildTopOfField(prefix, "Checkbox Array", "checkbox-array")
    checkbox_array += `<hr><div class="row">
                      <div class="col-md-1"></div>
                      <div class="col">
                        <button class="${BTN} btn-cb-add" id="${prefix}-cb-add-1">Add a checkbox</button>
                      </div>
                      <div class="col-md-1"></div>
                    </div><br>`
    checkbox_array += `<div id="${prefix}-checkbox-area"></div>`
    checkbox_array += `</div></div></div>`
    $(`.field-build`).append(checkbox_array);
    $(`#${prefix}-replacements`).hide();
    $(`#elements`).append(addElement("Check Boxes", prefix));
    showSelectedElement();
    return checkbox_array;
}

const checkbox_array_addCheckbox = (id) => {
    checkbox_array_boxCount++;
    let prefix = id.substring(0, 17);
    let newBox = `<div class = "checkbox-array-group" id="${prefix}-cbgroup-${checkbox_array_boxCount}">`;
    newBox += buildCheckbox(`${prefix}-cb-text-${checkbox_array_boxCount}`, `${prefix}-cb-del-${checkbox_array_boxCount}`);
    newBox += buildInputRow("Box Value", `${prefix}-cb-value-${checkbox_array_boxCount}`, "", "", 20);
    $(`#${prefix}-checkbox-area`).append(newBox);
    return newBox;
}

const checkbox_array_deleteCheckbox = (id) => {
    id = id.replace("-cb-del-", "-cbgroup-")
    $(`#${id}`).remove();
}

const buildCheckbox = (name, btnID) => {
    let row = `<div class="row" id="${name}"><div class="col-md-2 right-justify">`;
    row += `Box Text</div><div class="col"><input type="text" id="${name}-value" `;
    row += `size="60"></div>
              <div class="col-md-2">
                <box class="box btn-primary btn-sm btn-block delete-btn" id="${btnID}">  
                  Delete
                </box>
              </div>
              <div  class="col-md-1"></div>
            </div>`
    return row
}

$(
    $("body").click((e) => {
        let id = e.target.id;
        if (id.substring(3, 17) === "checkbox-array") {
            if (id.includes("-cb-add-")) {
                checkbox_array_addCheckbox(id);
            } else if (id.includes("-cb-del-")) {
                checkbox_array_deleteCheckbox(id);
            }
        }
    })
)

module.exports = { buildCheckboxArray, checkbox_array_addCheckbox }