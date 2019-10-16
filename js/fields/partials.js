"use strict"

const BTN = "button btn-danger btn-sm btn-block";
const BTN2 = "button btn-primary btn-sm btn-block";

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
  top += `<div class="col-md-2 field-type" id="${prefix}-ftype" >${fieldType}</div>`
  top += `<div class="col-md-1">Tag:</div>`
  top += `<div class="col" id="${prefix}-tag">`
  top += `<input type="text" id="${prefix}-tag-value" size="40" />`
  top += `</div>`
  top += `<div class="col-md-1"></div>`
  top += `</div>` // end of row

  top += `<div id="${prefix}-details">`;
  top += `<div class="row">`;
  top += `<div class="col-md-2">`;
  top += `</div>`;
  top += `<div class="col-md-1">Header:</div>`;
  top += `<div class="col" id="${prefix}-form-header">`;
  top += `<input type="text" id="${prefix}-header-value" size="60" />`;
  top += `</div>`;
  top += `</div>`; // end of row 

  top += `<div class="row">`;
  top += `<div class="col-md-2">`;
  top += `</div>`;
  top += `<div class="col-md-1">Hint:</div>`;
  top += `<div class="col" id="${prefix}-form-hint">`;
  top += `<input type="text" id="${prefix}-text-hint-value" size="60" />`;
  top += `</div>`;
  top += `<div class="col-md-1"></div>`;
  top += `</div>`; // end of row

  top += `<div class="row">`;
  top += `<div class="col-md-2"></div>`;
  top += `<div class="col-md-1">Target:</div>`;
  top += `<div class="col" id="${prefix}-target">`;
  top += `<input type="text" id="${prefix}-target-value" size="60" />`;
  top += `</div>`;
  top += `<div class="col-md-1"></div>`;
  top += `</div><br>`; // end of row

  top += `<div class="row" id="${prefix}-replacements-start">`;
  top += `<div class="col-md-3">`;
  top += `<button class="${BTN2} replacements-btn" id="${prefix}-replacements-btn">Show Replacements</button>`;
  top += `</div>`;
  top += `</div><br>`;

  top += `<div class="replacements" id="${prefix}-replacements">`;
  top += `<div class="row replace-row">`;
  top += `<div class="col-md-2">Field</div>`;
  top += `<div class="col-md-4">From</div>`;
  top += `<div class="col-md-4">To</div>`;
  top += `<div class="col"></div>`;
  top += `</div>`;

  top += `<div class="replacements-field">`


  for (let count = 0; count < 2; count++) {
    top += `<div class="row replace-row" id="${prefix}-replace-${count}">`;
    top += `<div class="col-md-2">`;
    top += `<input type="radio" name="${prefix}-field-${count}" id="${prefix}-header-${count}" value="header">&nbsp;&nbsp;Header&nbsp;&nbsp;&nbsp;`;
    top += `<input type="radio" name="${prefix}-field-${count}" id="${prefix}-hint-${count}" value="hint">&nbsp;&nbsp;Hint`;
    top += `</div>`;

    top += `<div class="col-md-4"><input type="text" id="${prefix}-left-${count}" size="32"></div>`;
    top += `<div class="col-md-4"><input type="text" id="${prefix}-right-${count}" size="32"></div>`;
    top += `<div class="col">`
    top += `<button class="${BTN}" id="${prefix}-del-rep-btn-${count}">Delete</button>`;
    top += `</div></div>`;
  }

  top += `</div>`

  top += `<div class="row">`
  top += `<div class="col-md-8"></div>`;
  top += `<div class="col-md-3">`;
  top += `<button class="${BTN2} rep-btn-add" id="${prefix}-rep-btn-add">Add a Replacement Field</button>`;
  top += `</div>`
  top += `</div>`;

  top += `</div>`;

  return top;
}

const replacementAdd = (id) => {
  console.log(id)

  // AA-address-rep-btn-add

  let prefix = id.substring(0, id.indexOf(`-rep`));
  let children = $(".replacements-fld").children();
  let lastLine = children[children.length - 1].id;
  let next = parseInt(lastLine.substring(lastLine.indexOf('replace-') + 8)) + 1;
  let newLine =  `<div class="row replace-row" id="${prefix}-replace-${next}">`;
    newLine += `<div class="col-md-2">`;
    newLine += `<input type="radio" name="${prefix}-fld-${next}" id="${prefix}-header-${next}" value="header">&nbsp;&nbsp;Header&nbsp;&nbsp;&nbsp;`;
    newLine += `<input type="radio" name="${prefix}-fld-${next}" id="${prefix}-hint-${next}" value="hint">&nbsp;&nbsp;Hint`;
    newLine += `</div>`;

    newLine += `<div class="col-md-4"><input type="text" id="${prefix}-left-${next}" size="32"></div>`;
    newLine += `<div class="col-md-4"><input type="text" id="${prefix}-right-${next}" size="32"></div>`;
    newLine += `<div class="col">`
    newLine += `<button class="${BTN}" id="${prefix}-del-rep-btn-${next}">Delete</button>`;
    newLine += `</div></div>`;
    $(".replacements-field").append(newLine)
}

const replacementDelete = id => {
  let cnt = id.substring(id.length - 1);
  let prefix = id.substring(0, id.indexOf('-del'))
  $(`#${prefix}-replace-${cnt}`).remove()
}

$(
  $("body").click((e) => {
    let id = e.target.id;
    if (id.includes("-del-rep-")) {
      replacementDelete(id);
    } else if (id.includes(`rep-btn-add`)) {
      replacementAdd(id);
    }
  })
)

module.exports = { buildInputRow, buildTopOfField };