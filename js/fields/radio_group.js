'use strict'

let radio_group_buttonCount = 0;

const buildRadioGroup = () => {
    let fieldID = codes[0];
    codes.shift();
    let prefix = `${fieldID}-radio_group`;
    let radio_group = buildTopOfField(prefix, 'Radio', 'radio_group')
    radio_group += `<div class="row inline" id="${prefix}-radio_group-inline">
                      <div class="col"></div>
                      <div class="col-md-1">Inline:</div>
                      <div class="col-md-3" id="${prefix}-radio_group-inline-buttons">
                          <input type="radio" name="${prefix}-opt_inline" id="${prefix}-radio_group-inline-yes">&nbsp;Yes
                         &nbsp;&nbsp;&nbsp;&nbsp;
                          <input type="radio" name="${prefix}-opt_inline" id="${prefix}-radio_group-inline-no" checked>&nbsp;No
                      </div>
                      <div class="col"></div>
                    </div>`
    radio_group += `<div class="row">
                      <div class="col-md-1"></div>
                      <div class="col">
                        <button class="${BTN} btn-rb-add" id="${prefix}-rb-add-1">Add A Radio Button</button>
                      </div>
                      <div class="col-md-1"></div>
                    </div>`
    radio_group += `<div id="${prefix}-button-area"></div>`
    radio_group += `</div></div></div>`
    $(`.field-build`).append(radio_group);
    $(`#${prefix}-show`).hide();
    return radio_group;
}

const radio_group_addRadioButton = (id) => {
    radio_group_buttonCount++;
    let prefix = id.substring(0, 14);
    let newButton = `<div class = "radio-button-group" id="${prefix}-rbgroup-${radio_group_buttonCount}">`;
    newButton += buildInputRow('Radio Button Text', `${prefix}-rb-text-${radio_group_buttonCount}`, `Delete`, `${prefix}-rb-del-${radio_group_buttonCount}`);
    newButton += buildInputRow('Radio Button Value', `${prefix}-rb-value-${radio_group_buttonCount}`, '', '', 20);
    newButton += `</div></div id=${prefix}-last-div>`;
    $(`#${prefix}-button-area`).append(newButton);
    return newButton;
}

const radio_group_deleteRadioButton = (id) => {
    id = id.replace("del", "text");
    $(`#${id}`).remove();
    id = id.replace("text", "value");
    $(`#${id}`).remove();
}

$(
    $("body").click((e) => {
        let id = e.target.id;
        if (id.substring(3, 14) === 'radio_group') {
            if (id.includes('-rb-add-')) {
                radio_group_addRadioButton(id);
            } else if (id.includes('-rb-del-')) {
                radio_group_deleteRadioButton(id);
            }
        }
    })
)