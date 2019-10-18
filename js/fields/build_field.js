"use strict"

const BTN = "button btn-danger btn-sm btn-block";
const BTN2 = "button btn-primary btn-sm btn-block";

const buildField = (prefix, fieldName, type, lines) => {
    let fieldObject = addLabel(prefix, fieldName, type);

    if (lines.includes("tag")) {
        fieldObject += addTag(prefix);
    }

    fieldObject += `</div>`

    if (lines.includes("header")) {
        fieldObject += addHeader(prefix)
    }

    if (lines.includes("hint")) {
        fieldObject += addHint(prefix)
    }

    if (lines.includes("target")) {
        fieldObject += addTarget(prefix)
    };

    if (lines.includes("textarea-small")) {
        fieldObject += addTextArea(prefix, 8)
    }

    if (lines.includes("textarea-medium")) {
        fieldObject += addTextArea(prefix, 12)
    }

    if (lines.includes("textarea-large")) {
        fieldObject += addTextArea(prefix, 16)
    }

    if (lines.includes("length")) {
        fieldObject += addLength(prefix)
    }

    if (lines.includes("blanked")) {
        fieldObject += addBlanked(prefix)
    }

    if (lines.includes("replacements")) {
        fieldObject += addReplacements(prefix)
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

const addReplacements = prefix => {
    let top = `<br><div class="row" id="${prefix}-replacements-start">`;
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

    top += `<div class="replacements-fld">`

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
    let prefix = id.substring(0, id.indexOf(`-rep`));
    let children = $(".replacements-fld").children();
    let next = 0;

    if (children.length > 0) {
        let lastLine = children[children.length - 1].id;
        next = parseInt(lastLine.substring(lastLine.indexOf('replace-') + 8)) + 1;
    }

    let newLine = `<div class="row replace-row" id="${prefix}-replace-${next}">`;
    newLine += `<div class="col-md-2">`;
    newLine += `<input type="radio" name="${prefix}-fld-${next}" id="${prefix}-header-${next}" value="header">&nbsp;&nbsp;Header&nbsp;&nbsp;&nbsp;`;
    newLine += `<input type="radio" name="${prefix}-fld-${next}" id="${prefix}-hint-${next}" value="hint">&nbsp;&nbsp;Hint`;
    newLine += `</div>`;

    newLine += `<div class="col-md-4"><input type="text" id="${prefix}-left-${next}" size="32"></div>`;
    newLine += `<div class="col-md-4"><input type="text" id="${prefix}-right-${next}" size="32"></div>`;
    newLine += `<div class="col">`
    newLine += `<button class="${BTN}" id="${prefix}-del-rep-btn-${next}">Delete</button>`;
    newLine += `</div></div>`;
    $(".replacements-fld").append(newLine)
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

module.exports = buildField;