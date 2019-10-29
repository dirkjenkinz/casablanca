"use strict"

const BTN = "button btn-danger btn-sm btn-block";

const buildField = (prefix, lines) => {

    let fieldName = lines[1];
    let type = lines[0];

    let fieldObject = addLabel(prefix, fieldName, type);
    if (lines.includes("tag")) {
        fieldObject += addTag(prefix, lines);
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
        fieldObject += addTextArea(prefix, 20)
    }

    if (lines.includes(`length`)) {
        fieldObject += addLength(prefix)
    }

    if (lines.includes(`height`)) {
        fieldObject += addHeight(prefix)
    }

    if (lines.includes(`blanked`)) {
        fieldObject += addBlanked(prefix);
    }

    if (lines.includes(`replacements`) && !lines.includes(`paragraph`)) {
        fieldObject += addReplacements(prefix);
    };

    if (lines.includes(`checkbox`)) {
        fieldObject += addCheckbox(prefix);
    };

    if (lines.includes(`radio`)) {
        fieldObject += addRadio(prefix);
    };

    if (lines.includes(`header-size`)) {
        fieldObject += addHeaderSize(prefix);
    };

    fieldObject += `</div></div></div>`

    return fieldObject;
}

const addLabel = (prefix, fieldName, type) => {
    let output = `<div id="${prefix}" class="field ${type}">`;
    output += `<div class="row">`;
    output += `<div class="col-md-2 field-type" id="${prefix}-ftype" >${fieldName}</div>`;
    return output;
}

const addTag = (prefix, lines) => {
    let output = `<div class="col-md-1 field-label">Tag:</div>`;
    output += `<div class="col-md-5" id="${prefix}-tag">`;
    output += `<input type="text" id="${prefix}-tag-value" size="40" />`;
    output += `</div>`;

    if (lines.includes(`shrink`)) {
        output += `<div class="col-md-2">`
        output += `<button class="${BTN} rep-btn-add" id="${prefix}-btn-shrink">Shrink Text</button>`;
        output += `</div>`
    }

    output += `<div class="col-md-1"></div>`;
    return output;
}

const addHeader = prefix => {
    let output = `<div id="${prefix}-details">`;
    output += `<div class="row">`;
    output += `<div class="col-md-2">`;
    output += `</div>`;
    output += `<div class="col-md-1 field-label">Header:</div>`;
    output += `<div class="col" id="${prefix}-form-header">`;
    output += `<input type="text" id="${prefix}-header-value" size="60" />`;
    output += `</div>`;
    output += `</div>`;
    return output;
}

const addHint = prefix => {
    let output = `<div class="row">`;
    output += `<div class="col-md-2">`;
    output += `</div>`;
    output += `<div class="col-md-1 field-label">Hint:</div>`;
    output += `<div class="col" id="${prefix}-form-hint">`;
    output += `<input type="text" id="${prefix}-text-hint-value" size="60" />`;
    output += `</div>`;
    output += `<div class="col-md-1"></div>`;
    output += `</div>`;
    return output;
}

const addBlanked = prefix => {
    let output = `<div class="row">`;
    output += `<div class="col-md-1">`;
    output += `</div>`;
    output += `<div class="col-md-2 blanked field-label">Blanked by:</div>`;
    output += `<div class="col" id="${prefix}-blanked-by">`
    output += `<input type="text" id="${prefix}-blanked-by-value" size="60" />`
    output += `</div>`;
    output += `<div class="col-md-1"></div>`;
    output += `</div>`;
    return output;
}

const addTarget = prefix => {
    let output = `<div class="row">`;
    output += `<div class="col-md-2"></div>`;
    output += `<div class="col-md-1 field-label">Target:</div>`;
    output += `<div class="col" id="${prefix}-target">`;
    output += `<input type="text" id="${prefix}-target-value" size="60" />`;
    output += `</div>`;
    output += `<div class="col-md-1"></div>`;
    output += `</div>`;
    return output;
}

const addLength = prefix => {
    let output = `<div class="row">`;
    output += `<div class="col-md-1"></div>`;
    output += `<div class="col-md-2 field-label">Text Length:</div>`;
    output += `<div class="col" id="${prefix}-length">`;
    output += `<input type="text" id="${prefix}-length-value" size="3" />`;
    output += `</div>`;
    output += `<div class="col-md-1"></div>`;
    output += `</div>`;
    return output;
}

const addHeight = prefix => {
    let output = `<div class="row">`;
    output += `<div class="col-md-1"></div>`;
    output += `<div class="col-md-2 field-label">Text Height:</div>`;
    output += `<div class="col" id="${prefix}-height">`;
    output += `<input type="text" id="${prefix}-height-value" size="3" />`;
    output += `</div>`;
    output += `<div class="col-md-1"></div>`;
    output += `</div>`;
    return output;
}

const addTextArea = (prefix, length) => {
    let output = `<br/><div id="${prefix}-details">`
    output += `<div class="row">`
    output += `<div class="col-md-1"></div>`
    output += `<div class="col">`
    output += `<textarea class="form-control rounded-0" id="${prefix}-textarea" rows="${length}"></textarea>`
    output += `</div>`
    output += `<div class="col-md-2"></div>`
    output += `</div><br>`
    return output;
}

const addReplacements = (prefix) => {
    let output = `<br><div class="row" id="${prefix}-replacements-start">`;
    output += `<div class="col-md-3">`;
    output += `<button class="${BTN} rep-btn-add" id="${prefix}-rep-btn-add">Add a Replacement Field</button>`;
    output += `</div>`;
    output += `</div><br>`;

    output += `<div class="replacements" id="${prefix}-replacements">`;
    output += `<div class="row replace-row">`;
    output += `<div class="col-md-2">Field</div>`;
    output += `<div class="col-md-4">From</div>`;
    output += `<div class="col-md-4">To</div>`;
    output += `<div class="col"></div>`;
    output += `</div>`;

    output += `<div class="replacements-field" id="${prefix}-replacements-field">`

    output += `</div>`

    output += `<div class="row">`
    output += `</div>`;

    output += `</div>`;

    return output;
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
    newLine += `<div class="col-md-2">`;
    if (id.includes(`-para`)) {
        newLine += `&nbsp`
    } else {
        newLine += `<input type="radio" name="${prefix}-field-${next}" id="${prefix}-header-${next}" value="header" >&nbsp;&nbsp; Header<br>`;
        newLine += `<input type="radio" name="${prefix}-field-${next}" id="${prefix}-hint-${next}" value="hint" >&nbsp;&nbsp; Hint`;
    }
    newLine += `</div > `;

    newLine += `<div class="col-md-4" > <input type="text" id="${prefix}-left-${next}" size="32"></div>`;
    newLine += `<div class="col-md-4" > <input type="text" id="${prefix}-right-${next}" size="32"></div>`;
    newLine += `<div class="col" > `
    newLine += `<button class="button btn-danger btn-sm btn-block delete-btn" id="${prefix}-del-rep-btn-${next}" > Delete</button > `;
    newLine += `</div ></div > `;
    $(`#${prefix}-replacements-field`).append(newLine);
    return newLine
}

const replacementDelete = id => {
    let cnt = id.substring(id.length - 1);
    let prefix = id.substring(0, id.indexOf('-del'));
    $(`#${prefix}-replace-${cnt} `).remove();
}

const shrinkOrUnshrinkText = (id) => {
    let text = $(`#${id}`).text();
    let id2 = id.replace(`-btn-shrink`, `-textarea`);
    if (text === `Shrink Text`) {
        $(`#${id}`).text(`Unshrink Text`);
        $(`#${id2}`).addClass(`shrink`)
    } else {
        $(`#${id}`).text(`Shrink Text`);
        $(`#${id2}`).removeClass(`shrink`)
    }
}

$(
    $("body").click((e) => {
        let id = e.target.id;
        if (id.includes("-del-rep-")) {
            replacementDelete(id);
        } else if (id.includes(`rep-btn-add`)) {
            replacementAdd(id);
        } else if (id.includes('shrink')) {
            shrinkOrUnshrinkText(id)
        }
    })
)

module.exports = { buildField, replacementAdd };