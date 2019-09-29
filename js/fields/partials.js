'use strict'

const buildInputRow = (label, name, button, btnID, size = 60) => {
    let row = `<div class="row" id="${name}"><div class="col-md-2 right-justify">`;
    row += label + `</div><div class="col"><input type="text" id="${name}-value" `;
    if (button) {
        row += `size="${size}"></div>
              <div class="col-md-2">
                <button class="button btn-primary btn-sm btn-block" id="${btnID}">
                  ${button}
                </button>
              </div>
            </div>`
    } else {
        row += `size="${size}"></div><div class="col-md-1"></div></div>`
    }
    return row
}

const buildTopOfField = (prefix, fieldType, type) => {
    let top = `<div id="${prefix}" class="field ${type}">`;
    top += `<div class="row">`
    top += `<div class="col-md-1 field-type" data-toggle="collapse" data-target="#${prefix}-details">${fieldType}</div>`
    top += `<div class="col-md-1">Data:</div>`
    top += `<div class="col" id="${prefix}-text-form-data">`
    top += `<input type="text" id="${prefix}-text-form-data-value" size="40" />`
    top += `</div>`
    top += `<div class="col-md-1 arrows">`
    top += `<i class="fa fa-arrow-up" id="${prefix}-up"></i>&nbsp`
    top += `<i class="fa fa-arrow-down" id="${prefix}-down"></i>`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row
    top += `<div id="${prefix}-details" class="collapse show">`
    top += `<div class="row">`
    top += `<div class="col-md-1">`
    top += `</div>`
    top += `<div class="col-md-1">Header:</div>`
    top += `<div class="col" id="${prefix}-text-form-header">`
    top += `<input type="text" id="${prefix}-text-header-value" size="60" />`
    top += `</div>`
    top += `</div>` // end of row

    top += `<div class="row">`
    top += `<div class="col-md-1">`
    top += `</div>`
    top += `<div class="col-md-1">Hint:</div>`
    top += `<div class="col" id="${prefix}-text-form-hint">`
    top += `<input type="text" id="${prefix}-text-hint-value" size="60" />`
    top += `</div>`
    top += `<div class="col-md2">`
    top += `<button class="${BTN} delete-btn" id="${prefix}-delete-btn">Delete</button>`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row

    return top;
}