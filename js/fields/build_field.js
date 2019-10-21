"use strict"

const BTN = "button btn-danger btn-sm btn-block";

const buildField = (prefix, lines) => {

    let fieldName = lines[1];
    let type = lines[0];

    let fieldObject = addLabel(prefix, fieldName, type);
    if (lines.includes("tag")) {
        fieldObject += addTag(prefix);
    }
    fieldObject += `</div>`

    if (lines.includes(`header`) && lines[0] !== `header`) {
        fieldObject += addHeader(prefix)
    }

    if (lines.includes(`hint`)) {
        fieldObject += addHint(prefix)
    }

    if (lines.includes(`target`)) {
        fieldObject += addTarget(prefix)
    };

    if (lines.includes(`textarea-small`)) {
        fieldObject += addTextArea(prefix, 8)
    }

    if (lines.includes(`textarea-medium`)) {
        fieldObject += addTextArea(prefix, 12)
    }

    if (lines.includes(`textarea-large`)) {
        fieldObject += addTextArea(prefix, 16)
    }

    if (lines.includes(`length`)) {
        fieldObject += addLength(prefix)
    }

    if (lines.includes(`blanked`)) {
        fieldObject += addBlanked(prefix)
    }

    if (lines.includes(`replacements`)) {
        fieldObject += addReplacements(prefix);
    };

    if (lines.includes(`checkbox`)) {
        fieldObject += addCheckbox(prefix)
    };

    if (lines.includes(`radio`)) {
        fieldObject += addRadio(prefix)
    };

    if (lines.includes(`header-size`)) {
        fieldObject += addHeaderSize(prefix)
    };

    fieldObject += `</div></div></div>`

    return fieldObject;
}

const addLabel = (prefix, fieldName, type) => {
    let top = `<div id="${prefix}" class="field ${type}">`;
    top += `<div class="row">`;
    top += `<div class="col-md-2 field-type" id="${prefix}-ftype" >${fieldName}</div>`;
    return top;
}

const addTag = prefix => {
    let top = `<div class="col-md-1 field-label">Tag:</div>`;
    top += `<div class="col" id="${prefix}-tag">`;
    top += `<input type="text" id="${prefix}-tag-value" size="40" />`;
    top += `</div>`;
    top += `<div class="col-md-1"></div>`;
    return top;
}

const addHeader = prefix => {
    let top = `<div id="${prefix}-details">`;
    top += `<div class="row">`;
    top += `<div class="col-md-2">`;
    top += `</div>`;
    top += `<div class="col-md-1 field-label">Header:</div>`;
    top += `<div class="col" id="${prefix}-form-header">`;
    top += `<input type="text" id="${prefix}-header-value" size="60" />`;
    top += `</div>`;
    top += `</div>`;
    return top;
}

const addHint = prefix => {
    let top = `<div class="row">`;
    top += `<div class="col-md-2">`;
    top += `</div>`;
    top += `<div class="col-md-1 field-label">Hint:</div>`;
    top += `<div class="col" id="${prefix}-form-hint">`;
    top += `<input type="text" id="${prefix}-text-hint-value" size="60" />`;
    top += `</div>`;
    top += `<div class="col-md-1"></div>`;
    top += `</div>`;
    return top;
}

const addBlanked = prefix => {
    let top = `<div class="row">`;
    top += `<div class="col-md-1">`;
    top += `</div>`;
    top += `<div class="col-md-2 blanked field-label">Blanked by:</div>`;
    top += `<div class="col" id="${prefix}-blanked-by">`
    top += `<input type="text" id="${prefix}-blanked-by-value" size="60" />`
    top += `</div>`;
    top += `<div class="col-md-1"></div>`;
    top += `</div>`;
    return top;
}

const addTarget = prefix => {
    let top = `<div class="row">`;
    top += `<div class="col-md-2"></div>`;
    top += `<div class="col-md-1 field-label">Target:</div>`;
    top += `<div class="col" id="${prefix}-target">`;
    top += `<input type="text" id="${prefix}-target-value" size="60" />`;
    top += `</div>`;
    top += `<div class="col-md-1"></div>`;
    top += `</div>`;
    return top;
}

const addLength = prefix => {
    let top = `<div class="row">`;
    top += `<div class="col-md-1"></div>`;
    top += `<div class="col-md-2 field-label">Text Length:</div>`;
    top += `<div class="col" id="${prefix}-length">`;
    top += `<input type="text" id="${prefix}-length-value" size="3" />`;
    top += `</div>`;
    top += `<div class="col-md-1"></div>`;
    top += `</div>`;
    return top;
}

const addTextArea = (prefix, length) => {
    let top = `<br/><div id="${prefix}-details">`
    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col">`
    top += `<textarea class="form-control rounded-0" id="${prefix}-textarea" rows="${length}"></textarea>`
    top += `</div>`
    top += `<div class="col-md-2"></div>`
    top += `</div><br>`
    return top;
}

const addReplacements = (prefix) => {
    let top = `<br><div class="row" id="${prefix}-replacements-start">`;
    top += `<div class="col-md-3">`;
    top += `<button class="${BTN} rep-btn-add" id="${prefix}-rep-btn-add">Add a Replacement Field</button>`;
    top += `</div>`;
    top += `</div><br>`;

    top += `<div class="replacements" id="${prefix}-replacements">`;
    top += `<div class="row replace-row">`;
    top += `<div class="col-md-2">Field</div>`;
    top += `<div class="col-md-4">From</div>`;
    top += `<div class="col-md-4">To</div>`;
    top += `<div class="col"></div>`;
    top += `</div>`;

    top += `<div class="replacements-field" id="${prefix}-replacements-field">`

    top += `</div>`

    top += `<div class="row">`
    top += `</div>`;

    top += `</div>`;

    return top;
}

const addCheckbox = prefix => {
    let checkbox_array = `<br><hr><div class="row checkbox-row">`;
    checkbox_array += `<div class="col-md-3">`;
    checkbox_array += `<button class="${BTN} cb-btn-add" id="${prefix}-cb-add-1">Add a checkbox</button>`;
    checkbox_array += `</div></div><br>`;
    checkbox_array += `<div id="${prefix}-checkbox-area"></div>`
    return checkbox_array
}

const addRadio = prefix => {
    let radio_group = `<hr><div class="row inline" id="${prefix}-radio-group-inline">`
    radio_group += `<div class="col"></div > `
    radio_group += `<div class="col-md-1" > Inline:</div>`
    radio_group += `<div class="col-md-3" id="${prefix}-radio-group-inline-buttons">`
    radio_group += `<input type="radio" name="${prefix}-opt_inline" id="${prefix}-radio-group-inline-yes" >&nbsp; Yes`
    radio_group += `&nbsp;&nbsp;&nbsp;&nbsp;`
    radio_group += `<input type="radio" name="${prefix}-opt_inline" id="${prefix}-radio-group-inline-no" checked >&nbsp; No`
    radio_group += `</div >`
    radio_group += `<div class="col"></div>`
    radio_group += `</div> <hr>`
    radio_group += `<div class="row">`
    radio_group += `<div class="col-md-3">`
    radio_group += `<button class="${BTN} btn-rb-add" id="${prefix}-rb-add-1">Add a radio button</button>`
    radio_group += `</div> `
    radio_group += `<div class="col-md-1"></div>`
    radio_group += `</div> `
    radio_group += `<div id="${prefix}-button-area" ></div>`
    return radio_group;
}

const addHeaderSize = prefix => {
    let headerSize = `<div class="row header-size" id="${prefix}-headersize">
    <div class="col-md-2 right-justify">Header Size&nbsp;&nbsp;</div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h1" name="size">&nbsp;&nbsp;H1</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h2" name="size">&nbsp;&nbsp;H2</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h3" name="size" checked>&nbsp;&nbsp;H3</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h4" name="size">&nbsp;&nbsp;H4</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h5" name="size">&nbsp;&nbsp;H5</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h6" name="size">&nbsp;&nbsp;H6</label></div>
  </div>`
    return headerSize;
}

const replacementAdd = (id) => {
    let prefix = id.substring(0, id.indexOf(`-rep`));
    let children = $(`#${prefix}-replacements-field`).children();
    let next = 0;

    if (children.length > 0) {
        let lastLine = children[children.length - 1].id;
        next = parseInt(lastLine.substring(lastLine.indexOf('replace-') + 8)) + 1;
    }

    let newLine = `<div class="row replace-row" id="${prefix}-replace-${next}" > `;
    newLine += `<div class="col-md-2" > `;
    newLine += `<input type="radio" name="${prefix}-field-${next}" id="${prefix}-header-${next}" value="header" >&nbsp;&nbsp; Header<br>`;
    newLine += `<input type="radio" name="${prefix}-field-${next}" id="${prefix}-hint-${next}" value="hint" >&nbsp;&nbsp; Hint`;
    newLine += `</div > `;

    newLine += `<div class="col-md-4" > <input type="text" id="${prefix}-left-${next}" size="32"></div>`;
    newLine += `<div class="col-md-4" > <input type="text" id="${prefix}-right-${next}" size="32"></div>`;
    newLine += `<div class="col" > `
    newLine += `<button class="${BTN}" id="${prefix}-del-rep-btn-${next}" > Delete</button > `;
    newLine += `</div ></div > `;
    $(`#${prefix}-replacements-field`).append(newLine);
    return newLine
}

const replacementDelete = id => {
    let cnt = id.substring(id.length - 1);
    let prefix = id.substring(0, id.indexOf('-del'))
    $(`#${prefix}-replace-${cnt} `).remove()
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

module.exports = { buildField, replacementAdd };