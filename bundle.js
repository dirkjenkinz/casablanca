(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
`use strict`

const { buildElement, elements } = require("./js/fields/build_element");
const { saveFile, listFiles } = require("./js/input_output/file_handler")
const { buildCodes, getCode } = require("./js/codes");
const buildData = require("./js/output/build_data");
const { showPage } = require("./js/output/show_page");
const { showJSON } = require("./js/output/show_JSON");
const { showValidators } = require("./js/output/show_validators");
const { showJavaScript } = require("./js/output/show_javascript");
const exportFiles = require(`./js/input_output/export`);
const { initView, bodyClick, buildTopPartDisplay, keyUp, topPart, showAll } = require("./js/control");
const showHelp = require(`./js/help/help`);

const buildFieldsContent = () => {
    let sortedElements = elements.sort();
    let fieldsContent = `<div class="row btn-row">`
    fieldsContent += `<div class="col">`
    fieldsContent += `<button class="button btn-sm btn-danger btn-block field-button" id="if">if</button>`
    fieldsContent += `</div>`
    fieldsContent += `<div class="col">`
    fieldsContent += `<button class="button btn-sm btn-danger btn-block field-button" id="else">else</button>`
    fieldsContent += `</div>`
    fieldsContent += `<div class="col">`
    fieldsContent += `<button class="button btn-sm btn-danger btn-block field-button" id="elseif">elseif</button>`
    fieldsContent += `</div>`
    fieldsContent += `<div class="col">`
    fieldsContent += `<button class="button btn-sm btn-danger btn-block field-button" id="endif">endif</button>`
    fieldsContent += `</div>`
    fieldsContent += `</div>`
    fieldsContent += `<div class="row btn-row">`
    fieldsContent += `<div class="col">`
    fieldsContent += `<button class="button btn-sm btn-secondary btn-block field-button" id="begin-hidden">Begin Hidden Field</button>`
    fieldsContent += `</div>`
    fieldsContent += `<div class="col">`
    fieldsContent += `<button class="button btn-sm btn-secondary btn-block field-button" id="end-hidden">End Hidden Field</button>`
    fieldsContent += `</div>`
    fieldsContent += `</div>`

    sortedElements = sortedElements.filter(e => {
        return (!e.includes(`flow`) && !e.includes(`hidden`));
    })

    for (let i = 0; i < sortedElements.length; i = i + 2) {
        let id1;
        let id2;
        let label1;
        let label2;

        id1 = sortedElements[i][0];
        label1 = sortedElements[i][1];

        if (i < sortedElements.length - 1) {
            id2 = sortedElements[i + 1][0];
            label2 = sortedElements[i + 1][1];
        }

        fieldsContent += `<div class="row btn-row">
        <div class="col">
        <button class="button btn-sm btn-casa btn-block field-button" id="${id1}">${label1}</button>
        </div>
        <div class="col">`;

        if (i < sortedElements.length - 1) {
            fieldsContent += `<button class="button btn-sm btn-casa btn-block field-button" id="${id2}">${label2}</button>`;
        };

        fieldsContent += `</div></div>`;
    }

    $(`#fields-tab-content`).append(fieldsContent)
}

$(
    buildFieldsContent(),
    $(window).keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    }),
    getCode(),
    buildCodes(),
    initView(),
    $(`.field-button`).click((e) => {
        buildElement(e.target.id);
    }),
    $("#show-all").click(() => {
        showAll();
    }),
    $(`#show-help`).click(() => {
        showHelp();
    }),
    $(`#show-page`).click(() => {
        let casa = buildData();
        let divide = false;
        if ($("#divide-page").prop("checked")) {
            divide = true;
        }
        showPage(casa, topPart, divide);
    }),
    $(`#show-json`).click(() => {
        let casa = buildData();
        let divide = false;
        if ($("#divide-JSON").prop("checked")) {
            divide = true;
        }
        showJSON(casa, divide)
    }),
    $(`#show-javascript`).click(() => {
        let casa = buildData();
        showJavaScript(casa)
    }),
    $(`#show-validators`).click(() => {
        let casa = buildData();
        let divide = false;
        if ($("#divide-validators").prop("checked")) {
            divide = true;
        }
        showValidators(casa, divide)
    }),
    $(`#save`).click(() => {
        saveFile();
    }),
    $(`#file-list`).click(() => {
        listFiles();
    }),
    $(`#export`).click(() => {
        let casa = buildData();
        exportFiles(casa, topPart);
    }),
    $("body").keyup((e) => {
        keyUp(e);
    }),
    $("body").click((e) => {
        if (e.target.id != 'save') {
            $(`#message-box`).text(``);
        }
        bodyClick(e);
    }),
    buildTopPartDisplay()
);
},{"./js/codes":2,"./js/control":3,"./js/fields/build_element":4,"./js/help/help":28,"./js/input_output/export":32,"./js/input_output/file_handler":33,"./js/output/build_data":35,"./js/output/show_JSON":69,"./js/output/show_javascript":70,"./js/output/show_page":71,"./js/output/show_validators":72}],2:[function(require,module,exports){
'use strict'

  let codes = [];


const buildCodes = () => {
  let seed = 'ABCDEFGHIJKLMNOPQRUSTUVWXYZ';
  seed = seed + seed + seed + seed;
  for (let i = 0; i < seed.length; i++) {
    for (let j = 0; j < 26; j++) {
      codes.push(seed[i] + seed[j])
    }
  }
}

const getCode = () => {
  let fieldID = codes[0];
  codes.shift();
  return fieldID;
}

module.exports = {buildCodes, getCode}
},{}],3:[function(require,module,exports){
`use strict`

const { deleteFile, loadCasa, buildDisplay } = require("./input_output/file_handler");
const buildData = require("./output/build_data");

let topPart = [
    `{% extends "cads/layouts/journey-claim.html" %}`,
    `{% import "casa/macros/form.html" as form %}`
];

const buildTopPartDisplay = () => {
    let tp = `<div class="row"><div class="col"><h6>Default Top Part:</h6><div></div>`;

    topPart.forEach(item => {
        tp += `<div class="row"><div class="col">${item}</div></div>`
    });

    tp += `<br><br><br>`;
    tp += `<div class="row"><div class="col">Use the "Top Part" field to override these defaults.</div></div>`;

    $(`#top-parts`).append(tp);
}

const initView = () => {
    $(`.help-build`).hide();
    $(`.page-build`).hide();
    $(`.page-neutral`).hide();
    $(`#file-display`).hide();
}

const flipView = () => {
    $(`.field-build`).show();
    $(`#show-all`).show();
    $(`.page-details`).show();
    $(`#main-display`).show();
    $(`#summary`).show();
    $(`#fields`).show();
    $(`.help-build`).hide();
    $(`.page-build`).hide();
    $(`.page-neutral`).hide();
    $(`#file-display`).hide();
    $(`#return-btn-row`).empty();
    $(`#field-input-area`).show();
}

const deleteButton = (id) => {
    let r = confirm("Are you sure you want to delete this element?");
    if (r == true) {
        let field = id.substring(0, id.length - 11);
        $(`#${field}`).remove();
        field = field + "-element";
        $(`#${field}`).remove();
    }
}

const changeSelection = (id) => {
    let children = $("#elements").children();
    for (let i = 0; i < children.length; i++) {
        let thisID = children[i].id;
        $(`#${thisID}-btn`).removeClass("selected");
    }
    $(`#${id}`).addClass("selected");

    children = $(".field-build").children();
    for (let i = 0; i < children.length; i++) {
        let thisID = children[i].id;
        $(`#${thisID}`).hide();
    }
    id = id.replace("-element-btn", "");
    $(`#${id}`).show();
}

const showAll = () => {
    let casa = buildData();
    $("#elements").empty();
    buildDisplay(casa);
    children = $(".field-build").children();
    for (let i = 0; i < children.length; i++) {
        let thisID = children[i].id;
        $(`#${thisID}`).show();
    }
}

const keyUp = e => {
    let f = `Entity: ${$("#folder").val()}-${$("#page-name").val()}`;
    $(`#folder-and-page`).text(f);
    if (e.target.id.substring(3, 11) === `fragment` ||
        e.target.id.substring(3, 12) === `paragraph` ||
        e.target.id.substring(3, 11) === `top-part` ||
        e.target.id.substring(3, 16) === `error-summary` |
        e.target.id.substring(3, 8) === `input`
    ) {
        if (e.keyCode === 13) {
            let $txt = $($(`#${e.target.id}`));
            let caretPos = $txt[0].selectionStart;
            let textAreaTxt = $txt.val();
            let txtToAdd = "\n";
            $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos));
        }
    }
}

const moveUp = id => {
    id = id.replace("-arrow", "");
    id = id.substring(0, id.length - 3);
    let casa = buildData();
    let children = ($(`.field-build`).children());
    let index;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === id) {
            index = i;
        }
    }
    if (index > 0) {
        let hold = casa.fields[index - 1];
        casa.fields[index - 1] = casa.fields[index];
        casa.fields[index] = hold;
        $("#elements").empty();
        buildDisplay(casa);
        children = ($(`.field-build`).children());
        let newID = (children[index - 1].id);
        $(`#${newID}-element-btn`).click();
    }
}

const moveDown = id => {
    id = id.replace("-arrow", "");
    id = id.substring(0, id.length - 5);
    let casa = buildData();
    let children = ($(`.field-build`).children());
    let index;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === id) {
            index = i;
        }
    }
    if (index < children.length - 1) {
        let hold = casa.fields[index + 1];
        casa.fields[index + 1] = casa.fields[index];
        casa.fields[index] = hold;
        $("#elements").empty();
        buildDisplay(casa);
        children = ($(`.field-build`).children());
        let newID = (children[index + 1].id);
        $(`#${newID}-element-btn`).click();
    }
}

const bodyClick = e => {
    let id = e.target.id;

    if (id) {
        if (id.includes(`-ftype`)) {
            id = id.replace(`ftype`, `element-btn`);
            $(`#${id}`).click();
        } else if (id.includes("-up")) {
            moveUp(id)
        } else if (id.includes("-down")) {
            moveDown(id)
        } else if (id === "return-to-build") {
            console.log('!!!!!')
            flipView();
        } else if (id.includes("element-btn")) {
            changeSelection(id);
        } else if ($(`#${id}`).hasClass(`delete-btn`)) {
            deleteButton(id);
        } else if ($(`#${id}`).hasClass(`load-btn`)) {
            loadCasa(id);
        } else if ($(`#${id}`).hasClass(`del-file-btn`)) {
            deleteFile(id);
        } else if ($(`#${id}`).hasClass(`replacements-btn`)) {
            if ($(`#${id}`).text() === "Show Replacements") {
                $(`#${id}`).text("Hide Replacements")
            } else {
                $(`#${id}`).text("Show Replacements")
            }

            id = id.replace(`-btn`, ``);
            $(`#${id}`).toggle();
        }
    }
}

module.exports = {
    initView,
    bodyClick,
    buildTopPartDisplay,
    keyUp,
    topPart,
    showAll
};
},{"./input_output/file_handler":33,"./output/build_data":35}],4:[function(require,module,exports){
`use strict`
const { getCode } = require(`../codes`);
const { buildField } = require(`./build_field`);
const { addElement, showSelectedElement } = require(`./elements.js`);

let elements = [
    [`top-part`, `Top Part`, `textarea-small`],
    [`else`, `else`, `flow`],
    [`if`, `if`, 'flow'],
    [`elseif`, `elseif`, 'flow'],
    [`endif`, `endif`, 'flow'],
    [`begin-hidden`, `Begin Hidden`, `tag`, `blanked`, `hidden`],
    [`end-hidden`, `End Hidden`, `hidden`],
    [`radio-group`, `Radio Group`, `tag`, `header`, `hint`, `replacements`, `radio`],
    [`date`, `Date`, `tag`, `header`, `hint`, `replacements`],
    [`email`, `Email`, `tag`, `header`, `hint`, `replacements`],
    [`checkbox-array`, `Checkbox Array`, `tag`, `header`, `hint`, `replacements`, `checkbox`],
    [`phone`, `Phone`, `tag`, `header`, `hint`, `replacements`],
    [`name`, `Name`, `tag`, `header`, `hint`, `replacements`],
    [`address`, `Address`, `tag`, `header`, `hint`, `replacements`],
    [`nino`, `NINO`, `tag`, `header`, `replacements`, `hint`],
    [`fragment`, `Code`, `tag`, `textarea-large`, 'shrink'],
    [`paragraph`, `Paragraph`, `tag`, `textarea-medium`, `shrink`],
    [`error-summary`, `Error Summary`, `tag`, `textarea-medium`],
    [`text-area`, `Text Area`, "tag", "header", "hint", "replacements", "length", "height"],
    [`text-input`, `Text Input`, "tag", "header", "hint", "replacements", "length"],
    [`header`, `Header`, `tag`, `header-size`],
    [`bank-details`, `Bank Details`, `tag`]
]

const buildElement = (id) => {
    let element_details = "";

    elements.forEach(element => {
        if (element[0] === id) {
            element_details = element;
        }
    })

    if (element_details[0] === `top-part`) {
        let children = $("#elements").children();
        if (children.length > 0 && children[0].id.includes(`-top-part-`)) {
            element_details = "";
        }
    }

    if (element_details !== "") {
        let fieldID = getCode();
        let prefix = `${fieldID}-${id}`;
        let element = buildField(prefix, element_details)
        if (element_details[0] === `top-part`) {
            $(`.field-build`).prepend(element);
            $(`#elements`).prepend(addElement(element_details[1], prefix));
        } else {
            $(`.field-build`).append(element);
            $(`#elements`).append(addElement(element_details[1], prefix));
        }
        showSelectedElement();

        return element;
    }
}

module.exports = { buildElement, elements };
},{"../codes":2,"./build_field":5,"./elements.js":7}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
let checkbox_array_boxCount = 0;

const checkbox_array_addCheckbox = (id, boxCount = checkbox_array_boxCount) => {
    checkbox_array_boxCount++;
    let prefix = id.substring(0, 17);
    let newBox = `<div class = "checkbox-array-group" id="${prefix}-cbgroup-${boxCount}">`;
    newBox += buildCheckbox(`${prefix}-cb-text-${boxCount}`, `${prefix}-cb-del-${boxCount}`);
    newBox += buildInputRow(`${prefix}-cb-value-${boxCount}`);

    $(`#${prefix}-checkbox-area`).append(newBox);
    return newBox;
}

const checkbox_array_deleteCheckbox = (id) => {
    id = id.replace("-cb-del-", "-cbgroup-")
    $(`#${id}`).remove();
}

const buildCheckbox = (name, btnID) => {
    let row = `<div class="row" id="${name}">`
    row += `     <div class="col-md-2 right-justify">`;
    row += `       Box Text </div>`
    row += `     <div class="col">`
    row += `        <input type="text" id="${name}-value" size="60">`;
    row += `     </div>`
    row += `     <div class="col-md-2">`
    row += `       <button class="button btn-danger btn-sm btn-block delete-btn" id="${btnID}">`
    row += `         Delete`
    row += `       </button>`
    row += `     </div>`
    row += `     <div class="col-md-1"></div>`
    row += `   </div>`
    return row
}

const buildInputRow = name => {
    let row = `<div class="row btn-value" id="${name}">`
    row += `<div class="col-md-2 right-justify">`;
    row += `Box Value</div><div class="col"><input type="text" id="${name}-value" size="20">`;
    row += `</div>`
    row += `<div class="col-md-2 right-justify">`;
    name = name.replace(`value`, `trigger`);
    row += `Target:</div><div class="col"><input type="text" id="${name}" size="40">`;
    row += `</div>`
    row += `<div class="col"></div>`
    row += `</div>`
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

module.exports = { checkbox_array_addCheckbox }
},{}],7:[function(require,module,exports){
const addElement = (element, prefix) => {
    let elementRow = `<div class="row element-row"  id="${prefix}-element">`
    elementRow += `<div class="col-md-3">`
    elementRow += ` <button class="btn-sm btn-danger delete-btn" id="${prefix}-delete-btn">Delete</button>`
    elementRow += `</div>`
    elementRow += `<div class="col">`
    elementRow += `<button class="btn-sm btn-dark btn-block btn-select selected" id="${prefix}-element-btn">${element}</button>`
    elementRow += `</div>`

    if (element !== `Top Part`) {
        elementRow += `<div class="col-md-1">`
        elementRow += `<img id="${prefix}-up-arrow" src="../../images/arrow.png" class="arrow" height="25px">`
        elementRow += `</div>`
        elementRow += `<div class="col-md-1">`
        elementRow += `<img id="${prefix}-down-arrow" src="../../images/arrow.png" class="arrow" height="25px" style="transform:rotate(180deg);">`
        elementRow += `</div>`
    }

    elementRow += `</div>`

    return elementRow;
}
const showSelectedElement = () => {
    let children = $(".field-build").children();
    let thisID;
    for (let i = 0; i < children.length - 1; i++) {
        thisID = children[i].id;
        $(`#${thisID}`).hide();
        $(`#${thisID}-element-btn`).removeClass("selected");
    }
}

module.exports = { addElement, showSelectedElement };
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
'use strict'

const fieldInputArea = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot6" src="../images/screenshot06.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`The Field Input Area...`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = fieldInputArea;
},{}],10:[function(require,module,exports){
'use strict'

const addressField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="address" src="../images/address.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="address output" src="../images/address_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Address Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = addressField;
},{}],11:[function(require,module,exports){
'use strict'

const bankDetailsField = () => {
    let text = `<div class="row">`;

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="bank details" src="../images/bank_details.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="bank details output" src="../images/bank_details_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Bank Details Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = bankDetailsField;
},{}],12:[function(require,module,exports){
'use strict'

const checkboxArrayField = () => {
    let text = `<div class="row">`
    text += `<div class="col-md-1"></div>`;

    text += `<div class="col-md-6">`; // left side
    text += `<img alt="check box array" src="../images/checkboxarray.png" width="500px">`;
    text += '<br><br>';
    text += `<img alt="checkbox array output" src="../images/checkbox_array_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Checkbox Array Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = checkboxArrayField;
},{}],13:[function(require,module,exports){
'use strict'

const codeFragmentField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="code fragment" src="../images/code.png" width="500px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Code Fragment Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = codeFragmentField;
},{}],14:[function(require,module,exports){
'use strict'

const dateField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="date" src="../images/date.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="date output" src="../images/date_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Date Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = dateField;
},{}],15:[function(require,module,exports){
'use strict'

const emailField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="email" src="../images/email.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="email output" src="../images/email_output.png" width="400px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Email Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = emailField;
},{}],16:[function(require,module,exports){
'use strict'

const errorSummaryField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="error summary" src="../images/errorsummary.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="error summary output" src="../images/error_summary_output.png" width="500px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Error Summary Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = errorSummaryField;
},{}],17:[function(require,module,exports){
'use strict'

const flowControlField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot13" src="../images/screenshot13.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Flow Control Fields.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = flowControlField;
},{}],18:[function(require,module,exports){
'use strict'

const hiddenField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-5">`; // left side
    text += `<img alt="screenshot14" src="../images/screenshot14.png" width="500px">`;
    text += `<br><br>`
    text += `<img alt="screenshot15" src="../images/screenshot15.png" width="500px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Hidden Fields.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = hiddenField;
},{}],19:[function(require,module,exports){
'use strict'

const nameField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="name" src="../images/name.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="name output" src="../images/name_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Name Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = nameField;
},{}],20:[function(require,module,exports){
'use strict'

const ninoField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="nino" src="../images/nino.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="nino output" src="../images/nino_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Nino Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = ninoField;
},{}],21:[function(require,module,exports){
'use strict'

const paragraphField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="paragraph" src="../images/paragraph.png" width="600px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Paragraph Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = paragraphField;
},{}],22:[function(require,module,exports){
'use strict'

const phoneField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="phone" src="../images/phone.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="phone output" src="../images/phone_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Phone Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = phoneField;
},{}],23:[function(require,module,exports){
'use strict'

const radioGroupField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="radio" src="../images/radio_group.png" width="500px">`;
    text += '<br><br>';
    text += `<img alt="radio output" src="../images/radio_group_output.png" width="400px">`;
    text += '<br><br>';
    text += `<img alt="radio inline output" src="../images/radio_group_inline_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Radio Group Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = radioGroupField;
},{}],24:[function(require,module,exports){
'use strict'

const textInputField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="text input" src="../images/textinput.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="text input output" src="../images/text_input_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Text Input Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = textInputField;
},{}],25:[function(require,module,exports){
'use strict'

const topPartField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="topPart" src="../images/toppart.png" width="600px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Top Part Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = topPartField;
},{}],26:[function(require,module,exports){
'use strict'

const fieldsList = () => {
    let text = `<div class="row">`;

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot 12" src="../images/screenshot12.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`The Fields List...`);
    text += `<br>`;
    text += `</div>`; // right side end

    text += `</div>`;

    console.log(text)

    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = fieldsList;
},{}],27:[function(require,module,exports){
'use strict'

const fieldsPanel = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot6" src="../images/screenshot06.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`The Screen Panel is where you build up your page by adding Fields to it.`);
    text += `<br>`;
    text += buildLine(`Each field represents a discrete component such as a name or a date.`);
    text += buildLine(`Most fields translate to one or more HTML/Nunjucks components.`);
    text += `<br>`;
    text += buildLine(`For instance, the Name Field consists of a header (mandatory), a hint (optional) and four text inputs - Title, First Name, Middle Name, Last Name.`);
    text += `<br>`
    text += buildLine('When a field is selected, a corresponding button is placed in Section 3 and a corresponding Field Input Segment is placed in Segment 4.');
    text += `<br>`
    text += buildLine('Field Input Segments are used to gather the data needed to build the corresponding HTML/Nunjucks, JSON, validators and Javascript for the field.')
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = fieldsPanel;
},{}],28:[function(require,module,exports){
'use strict'

const overview = require(`./overview`);
const pagePanel = require(`./page_panel`);
const fieldsPanel = require(`./fields_panel`);
const outputPanel = require(`./output_panel`);
const fieldsList = require(`./fields_list`);
const fieldInputArea = require(`./field_input_area`);
const flowControlFields = require(`./fields/flow_control_fields`);
const hiddenFields = require(`./fields/hidden_fields`);
const addressField = require(`./fields/address_field`);
const checkboxArrayField = require(`./fields/checkbox_array_field`);
const codeFragmentField = require(`./fields/code_fragment_field`);
const dateField = require(`./fields/date_field`);
const emailField = require(`./fields/email_field`);
const errorSummaryField = require(`./fields/error_summary_field`);
const nameField = require(`./fields/name_field`);
const ninoField = require(`./fields/nino_field`);
const paragraphField = require(`./fields/paragraph_field`);
const phoneField = require(`./fields/phone_field`);
const radioGroupField = require(`./fields/radio_group_field`);
const bankDetailsField = require(`./fields/bank_details_field`);
const textInputField = require(`./fields/text_input_field`);
const textAreaField = require(`./fields/text_input_field`);
const topPartField = require(`./fields/top_part_field`);

const showHelp = (casa, topPart, divide) => {
    $(`.field-build`).hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    $(`#summary`).hide();
    buildHelp('overview');
    let sideBar = `<div class="row part-label">`
    sideBar += `<div class="col-md-1"></div>`
    sideBar += `<div class="col">`
    sideBar += `<h4>Help</h4>`
    sideBar += `</div>`
    sideBar += `</div>`;
    sideBar += buildSideBar();
    $(`#return-btn-row`).append(sideBar);
    window.scrollTo(0, 0);
};

const buildHelp = (section) => {
    let output;
    switch (section) {
        case ('overview'):
            output = overview();
            break;
        case ('page-panel'):
            output = pagePanel();
            break;
        case ('fields-panel'):
            output = fieldsPanel();
            break;
        case ('output-panel'):
            output = outputPanel();
            break;
        case ('fields-list'):
            output = fieldsList();
            break;
        case ('field-input-area'):
            output = fieldInputArea();
            break;
        case ('flow-control-fields'):
            output = flowControlFields();
            break;
        case ('hidden-fields'):
            output = hiddenFields();
            break;
        case ('address-field'):
            output = addressField();
            break;
        case ('checkbox-array-field'):
            output = checkboxArrayField();
            break;
        case ('code-fragment-field'):
            output = codeFragmentField();
            break;
        case ('date-field'):
            output = dateField();
            break;
        case ('email-field'):
            output = emailField();
            break;
        case ('error-summary-field'):
            output = errorSummaryField();
            break;
        case ('name-field'):
            output = nameField();
            break;
        case ('nino-field'):
            output = ninoField();
            break;
        case ('error-summary-field'):
            output = errorSummaryField();
            break;
        case ('paragraph-field'):
            output = paragraphField();
            break;
        case ('phone-field'):
            output = phoneField();
            break;
        case ('radio-group-field'):
            console.log('fukiy')
            output = radioGroupField();
            break;
        case ('bank-details-field'):
            output = bankDetailsField();
            break;
        case ('text-input-field'):
            output = textInputField();
            break;
        case ('text-area-field'):
            output = textAreaField();
            break;
        case ('top-part-field'):
            output = topPartField();
            break;
    }

    $(`.page-build`).empty();
    $(`.page-build`).append(output + `<br>`);
}

const buildSideBar = () => {
    let sideBar = `<div class="sidebar">`
    sideBar += helpButton(`overview`, `Overview`);
    sideBar += helpButton(`page-panel`, `Section 2: The Page Panel`);
    sideBar += helpButton(`fields-panel`, `Section 2: The Fields Panel`);
    sideBar += helpButton(`output-panel`, `Section 2: The Output Panel`);
    sideBar += helpButton(`fields-list`, `Section 3: The Fields List`);
    sideBar += helpButton(`field-input-area`, `Section 4: The Field Input Area`);
    sideBar += doubleButton('flow-control-fields', `Flow Control`, 'hidden-fields', `Hidden Fields`);
    sideBar += doubleButton(`address-field`, `Address`, 'checkbox-array-field', `Checkbox Array`);
    sideBar += doubleButton('code-fragment-field', `Code Fragment`, 'date-field', `Date`);
    sideBar += doubleButton(`email-field`, `Email`, `error-summary-field`, `Error Summary`);
    sideBar += doubleButton(`name-field`, `Name`, `nino-field`, `Nino`);
    sideBar += doubleButton(`paragraph-field`, `Paragraph`, `phone-field`, `Phone`);
    sideBar += doubleButton(`radio-group-field`, `Radio Group`, `bank-details-field`, `Bank Details`);
    sideBar += doubleButton(`text-input-field`, `Text Input`, `top-part-field`, `Top Part`);
    sideBar += helpButton(`text-area-field`, `Text Area`);

    sideBar += `</div>`;
    sideBar += `</div>`;

    return sideBar;
};

const helpButton = (id, label) => {
    let hButton = `<div class="row">`;
    hButton += `<div class="col">`;
    hButton += `<button class="btn btn-sm btn-dark btn-block btn-help" id="${id}">${label}</button>`;
    hButton += `</div>`;
    hButton += `</div>`;
    return hButton;
};

const doubleButton = (id1, label1, id2, label2) => {
    let hButton = `<div class="row">`;
    hButton += `<div class="col">`;
    hButton += `<button class="btn btn-sm btn-dark btn-block btn-help" id="${id1}">${label1}</button>`;
    hButton += `</div>`;
    hButton += `<div class="col">`;
    hButton += `<button class="btn btn-sm btn-dark btn-block btn-help" id="${id2}">${label2}</button>`;
    hButton += `</div>`;
    hButton += `</div>`;
    return hButton;
};

$(
    $(`body`).click(
        (e) => {
            if (e.target.id === 'overview') {
                buildHelp('overview');
            } else if (e.target.id === 'page-panel') {
                buildHelp('page-panel');
            } else if (e.target.id === 'fields-panel') {
                buildHelp('fields-panel');
            } else if (e.target.id === 'output-panel') {
                buildHelp('output-panel');
            } else if (e.target.id === 'fields-list') {
                buildHelp('fields-list');
            } else if (e.target.id === 'field-input-area') {
                buildHelp('field-input-area');
            } else if (e.target.id === 'flow-control-fields') {
                buildHelp('flow-control-fields');
            } else if (e.target.id === 'hidden-fields') {
                buildHelp('hidden-fields');
            } else if (e.target.id === 'address-field') {
                buildHelp('address-field');
            } else if (e.target.id === 'checkbox-array-field') {
                buildHelp('checkbox-array-field');
            } else if (e.target.id === 'code-fragment-field') {
                buildHelp('code-fragment-field');
            } else if (e.target.id === 'date-field') {
                buildHelp('date-field');
            } else if (e.target.id === 'email-field') {
                buildHelp('email-field');
            } else if (e.target.id === 'error-summary-field') {
                buildHelp('error-summary-field');
            } else if (e.target.id === 'name-field') {
                buildHelp('name-field');
            } else if (e.target.id === 'nino-field') {
                buildHelp('nino-field');
            } else if (e.target.id === 'paragraph-field') {
                buildHelp('paragraph-field');
            } else if (e.target.id === 'phone-field') {
                buildHelp('phone-field');
            } else if (e.target.id === 'radio-group-field') {
                buildHelp('radio-group-field');
            } else if (e.target.id === 'bank-details-field') {
                buildHelp('bank-details-field');
            } else if (e.target.id === 'text-input-field') {
                buildHelp('text-input-field');
            } else if (e.target.id === 'text-area-field') {
                buildHelp('text-area-field');
            } else if (e.target.id === 'top-part-field') {
                buildHelp('top-part-field');
            }
        }
    )
)

module.exports = showHelp;
},{"./field_input_area":9,"./fields/address_field":10,"./fields/bank_details_field":11,"./fields/checkbox_array_field":12,"./fields/code_fragment_field":13,"./fields/date_field":14,"./fields/email_field":15,"./fields/error_summary_field":16,"./fields/flow_control_fields":17,"./fields/hidden_fields":18,"./fields/name_field":19,"./fields/nino_field":20,"./fields/paragraph_field":21,"./fields/phone_field":22,"./fields/radio_group_field":23,"./fields/text_input_field":24,"./fields/top_part_field":25,"./fields_list":26,"./fields_panel":27,"./output_panel":29,"./overview":30,"./page_panel":31}],29:[function(require,module,exports){
'use strict'

const outputPanel = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot 8" src="../images/screenshot08.png" width="300px">`
    text += `</div>` //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`
    text += buildLine(`The Output Panel is used for creating the 4 main files needed to build a screen using CASA.`);
    text += `<br>`
    text += `</div>` // right side end

    text += `</div>`

    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = outputPanel;
},{}],30:[function(require,module,exports){
'use strict'

const overview = () => {
    let text = topBit();
    text += headerBar();
    text += controlPanel();
    text += fieldsPanel();
    text += topPartsPanel();
    text += outputPanel();
    text += buildLine(`Section 3 & 4 display the Fields that have been added to the page.`);
    text += `<hr>`
    text += screenInProgress();
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

const topBit = () => {
    let text = buildLine(`Casablanca is a high-level compiler for the CASA framework.`);
    text += buildLine(`It allows for rapid development of screens by simply clicking buttons to create fields and adding a few details.`);
    text += buildLine(`For each object, Casablanca builds the relevent Nunjucks/HTML, JSON, validation and javascript files.`);
    text += `<hr>`;
    text += buildLine(`For instance:`);
    text += buildLine(`Clicking the "Address" button will create an Address field to which various details need to be added.`);
    text += buildLine(`Once this is done, clicking the "Page" button will generate the Nunjucks/HTML to create an address field in CASA.`);
    text += buildLine(`The JSON button will generate all the JSON needed for the page (including error messages).`);
    text += `<br>`
    text += buildLine(`The validators button will generate the requisite validation.`);
    text += buildLine(`And the Javascript button will create a skeleton Javascript file.`);
    text += `<br>`
    text += buildLine(`To create all the files needed for a screen, use the "EXPORT BUTTON"`);
    text += `<hr>`
    text += buildLine(`At start-up, the user is presented with the following screen, which is divided into 4 parts:`)
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`
    text += `<img alt="screenshot 1" src="../images/screenshot01.png" width="1000px">`
    text += `</div></div>`
    text += `<hr>`
    return text;
}

const headerBar = () => {
    let text = buildLine('Section 1 is the header bar, about which more later.')
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`
    text += `<img alt="screenshot 2" src="../images/screenshot02.png" width="1000px">`
    text += `</div></div>`
    text += `<hr>`
    return text
}

const controlPanel = () => {
    let text = buildLine('Section 2 is the control panel.')
    text += `<div class="row"><div class="col-md-1"></div>`
    text += `<div class="col">`
    text += `<img alt="screenshot 3" src="../images/screenshot03.png" width="400px">`
    text += `</div>`
    text += `<div class="col">`
    text += buildLine(`It is from here that you add fields to your page and display and text the results.`)
    text += `<hr>`

    // selection tab header
    text += buildLine(`The selection tab header.`)
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`
    text += `<img alt="screenshot 4" src="../images/screenshot04.png" width="300px">`
    text += `</div></div>`
    text += `<br>`
    text += buildLine(`Here 'Page' has been selected. To switch to 'Fields' or 'Top', click the appropriate tab.`)
    text += `<hr>`

    // page panel
    text += buildLine(`Because 'Page' has been selected, Casablanca displays the Page panel.`)
    text += `<div class="row">`
    text += `  <div class="col-md-1"></div>`
    text += `  <div class="col">`
    text += `    <img alt="screenshot 5" src="../images/screenshot05.png" width="300px">`
    text += `  </div>`
    text += `</div>`
    text += buildLine('This is where you enter the details of the page you are working on.')
    text += '</div>'

    text += `</div>`;
    text += `<hr>`;
    return text;
}

const fieldsPanel = () => {
    let text = buildLine(`Clicking 'Fields' brings up the Fields panel.`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 6" src="../images/screenshot06.png" width="300px">`;
    text += `</div></div>`;
    text += buildLine('This gives you a selection of fields to add to your page by clicking on the appropriate button.');
    text += `<hr>`;
    return text
}

const topPartsPanel = () => {
    let text = buildLine(`Clicking 'Top' brings up the Top Parts panel.`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 7" src="../images/screenshot07.png" width="300px">`;
    text += `</div></div>`;
    text += buildLine('This shows the default lines that go at the top of each page. They can be over-ridden by adding a Top Part field in the Fields panel.');
    text += `</div>`;
    text += `</div>`;
    text += `<hr>`;
    return text;
}

const outputPanel = () => {
    let text = buildLine(`At the bottom of Section 2 we have the 'Output' panel which has options for display the pages created by Casablanca and a button to text them all to disk.`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 8" src="../images/screenshot08.png" width="400px">`;
    text += `</div></div>`;
    text += `<hr>`
    return text;
}

const screenInProgress = () => {
    let text = buildLine(`Here's screenshot from a work in progress -`);
    text += `<div class="row"><div class="col-md-1"></div><div class="col">`;
    text += `<img alt="screenshot 11" src="../images/screenshot11.png" width="1000px">`;
    text += `</div></div>`;
    text += `<br>`;
    text += buildLine(`It's for the screen 'about-you-contact-details, with the name being constructed from the folder name and page name as displayed in the page panel.`);
    text += `<br>`;
    text += buildLine(`The screen name is displayed in Section 1, the header bar.`)
    text += `<br>`;
    text += buildLine(`Section 3 shows the fields that have been added to the screen. The arrows allow the fields to be shuffled around.`);
    text += `<br>`;
    text += buildLine(`Section 4 is displaying the input panel for the Radio Group highlighted in red in Section 3. This is where the user enters the relevent details for the field.`);
    text += `<br>`;
    text += buildLine(`To highlight another field, simply click on its button in Section 3.`);
    text += `<br>`;
    text += buildLine(`To display the input panels for all fields in Section 4, click on the 'Show All' button.`);
    return text;
}

module.exports = overview;
},{}],31:[function(require,module,exports){
'use strict'

const pagePanel = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot 5" src="../images/screenshot05.png" width="300px">`
    text += `</div>` //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`
    text += buildLine(`The Page Panel is where you enter the Folder and Page Name of the screen you are working on.`);
    text += `<br>`
    text += buildLine(`These two fields are combined to create the Screen Name. So, for instance, if the Folder is called "your-details" and 
    the Page Name = "annual-income", the Screen = "your-details-annual-income".`);
    text += `</div>`
    text += `</div>` // right side end

    text += `</div>`

    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = pagePanel;
},{}],32:[function(require,module,exports){
'use strict'

const { saveAs } = require("file-saver");

const { buildPage } = require("../output/show_page.js");
const { buildJavaScript } = require("../output/show_javascript.js");
const { buildJSON } = require("../output/show_JSON.js");
const { buildValidators } = require("../output/show_validators.js");

const exportFiles = (casa, topPart) => {
    let folder = casa.folder || "defaultfolder";
    let fileName = casa["page-name"] || "defaultfn";
    let page = buildPage(casa, topPart, false);
    page = page.replace(/  /g, " ");
    let javaScript = buildJavaScript(casa);
    let json = buildJSON(casa, false);
    let validators = buildValidators(casa, false);
    let pageBlob = new Blob([page], { type: "text/plain" });
    let javaScriptBlob = new Blob([javaScript], { type: "text/plain" });
    let validatorsBlob = new Blob([validators], { type: "text/plain" });
    let jsonBlob = new Blob([json], { type: "text/plain" });

    saveAs(pageBlob, `app/views/pages/${folder}-${fileName}.html`);
    saveAs(javaScriptBlob, `app/definitions/pages/${fileName}.js`);
    saveAs(validatorsBlob, `app/definitions/field-validators/${folder}/${fileName}.js`);
    saveAs(jsonBlob, `app/locales/en/${fileName}.json`);
};

module.exports = exportFiles;
},{"../output/show_JSON.js":69,"../output/show_javascript.js":70,"../output/show_page.js":71,"../output/show_validators.js":72,"file-saver":83}],33:[function(require,module,exports){
"use strict"

const BTN = `button btn-primary btn-sm btn-block`;
const buildData = require(`../output/build_data`);

const {
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
} = require("./populate");

const saveFile = () => {
    let casa = buildData();
    console.log('SAVE:', casa);
    let item = `casa-${casa.folder}/${casa["page-name"]}`;
    localStorage.setItem(item, JSON.stringify(casa));
    $(`#message-box`).text(`Screen saved: ${casa.folder}/${casa["page-name"]}.`);
}

const listFiles = () => {
    $("#file-display").show();
    $("#main-display").hide();
    $(`#list-of-files`).remove();
    $(`#summary`).hide();
    $(`#fields`).hide();
    let items = `<div id="list-of-files"><br/><button class="button btn-sm btn-danger btn-block field-button" id="return-to-build">Return to Build</button>`
    items += `<div class="row part-label">Saved Pages</div>`
    items += `<div class="row part-label">Click on blue button to load.</div>`;
    items += '<div class="files">'

    let fileList = [];

    for (let i = 0; i < localStorage.length; i++) {
        let key = window.localStorage.key(i);
        if (key.substring(0, 5) === "casa-") {
            fileList.push(key);
        }
    }

    fileList = fileList.sort();

    for (let i = 0; i < fileList.length; i++) {
        let key = fileList[i];
        let key_transformed = key.replace("/", "_");
        key = key.substring(5)
        items += `
        <div class="row load-btn-row">
          <div class="col-md-3"><button class="${BTN} del-file-btn" id="del-file-${key_transformed}">Delete</button></div>
          <div class="col"><button class="${BTN} load-btn" id="${key_transformed}">${key}</button></div>
        </div>`
    }
    items += `</div></div>`
    $("#file-display").append(items);
}

const loadCasa = (id) => {
    let key = id.replace("_", "/")
    let casa = JSON.parse(localStorage.getItem(key));
    console.log('LOAD:', casa)
    $("#file-display").hide();
    $("#main-display").show();
    $("#elements").empty();
    buildDisplay(casa);
    let f = `Current Screen: ${$("#folder").val()}-${$("#page-name").val()}`;
    $(`#folder-and-page`).text(f);
    $(`#summary`).show();
    $(`#fields`).show();
}

const buildDisplay = (casa) => {
    let divide = true;
    $("#folder").val(casa.folder);
    $("#page-name").val(casa["page-name"]);
    $("#page-header").val(casa["page-header"]);
    $("#prevalidate").prop("checked", casa.prevalidate);
    $("#pregather").prop("checked", casa.pregather);
    $("#postvalidate").prop("checked", casa.postvalidate);
    $("#postrender").prop("checked", casa.postrender);
    $("#preredirect").prop("checked", casa.preredirect);
    $(".field-build").empty();
    casa.fields.forEach(field => {
        switch (field["field-name"]) {
            case "radio-group":
                populateRadioGroup(field);
                break;
            case "checkbox-array":
                populateCheckboxArray(field);
                break;
            case "date":
                populateDate(field);
                break;
            case "email":
                populateEmail(field);
                break;
            case "phone":
                populatePhone(field);
                break;
            case "name":
                populateName(field);
                break;
            case "address":
                populateAddress(field);
                break;
            case "nino":
                populateNino(field);
                break;
            case "fragment":
                populateFragment(field)
                break;
            case "paragraph":
                populateParagraph(field);
                break;
            case "top-part":
                populateTopPart(field);
                break;
            case "error-summary":
                populateErrorSummary(field);
                break;
            case "text-input":
                populateTextInput(field);
                break;
            case "text-area":
                populateTextArea(field);
                break;
            case "bank-details":
                populateBankDetails(field);
                break;
            case "header":
                populateHeader(field);
                break;
            case "end-hidden":
                populateEndHidden(field);
                break;
            case "begin-hidden":
                populateBeginHidden(field);
                break;
            case "if":
                populateIf(field);
                break;
            case "endif":
                populateEndif(field);
                break;
            case "elseif":
                populateElseif(field);
                break;
            case "else":
                populateElse(field);
                break;
        }
    })
}

const deleteFile = (id) => {
    let r = confirm("Are you sure you want to delete this file?");
    if (r == true) {
        id = id.substring(9);
        localStorage.removeItem(id.replace("_", "/"));
        listFiles();
    }
}

module.exports = {
    saveFile,
    listFiles,
    deleteFile,
    loadCasa,
    buildDisplay
}
},{"../output/build_data":35,"./populate":34}],34:[function(require,module,exports){
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
},{"../fields/build_element":4,"../fields/build_field":5,"../fields/checkbox_array":6,"../fields/radio_group":8}],35:[function(require,module,exports){
"use strict"

const buildtag = () => {
    let casa = buildCasaObject();
    return casa;
}

const buildCasaObject = () => {
    let casa = {};
    let fields = [];

    casa.folder = $(`#folder`).val();
    casa["page-name"] = $(`#page-name`).val();
    casa["page-header"] = $(`#page-header`).val();
    casa.prevalidate = $("#prevalidate").prop("checked");
    casa.postvalidate = $("#postvalidate").prop("checked");
    casa.postrender = $("#postrender").prop("checked");
    casa.pregather = $("#pregather").prop("checked");
    casa.preredirect = $("#preredirect").prop("checked");

    let nodes = $(".field-build").children();

    for (let i = 0; i < nodes.length; i++) {
        let id = (nodes[i].id);
        let _class = ($(`#${id}`).attr("class"));
        if (_class.includes("field")) {
            let field = {};
            field["field-name"] = id.substring(3);
            field.replacements = [];
            let reps = [];
            let inputs = $(`#${id}`).find("input");

            for (let i = 0; i < inputs.length; i++) {
                id = inputs[i].id;
                if (id.includes("tag-value")) {
                    field.tag = $(`#${id}`).val();
                } else if (id.includes("header-value")) {
                    field.header = $(`#${id}`).val();
                } else if (id.includes("text-hint-value")) {
                    field["text-hint"] = $(`#${id}`).val();
                } else if (id.includes("target-value")) {
                    field.target = $(`#${id}`).val();
                } else if (id.includes("blanked-by-value")) {
                    field["blanked-by"] = $(`#${id}`).val();
                } else if (id.includes(`length-value`)) {
                    field['text-length'] = $(`#${id}`).val();
                } else if (id.includes(`height-value`)) {
                    field['text-height'] = $(`#${id}`).val();
                } else if (id.includes("-left-")) {
                    let left = $(`#${id}`).val();
                    id = id.replace(`-left-`, `-right-`);
                    let right = $(`#${id}`).val();
                    let name = id.replace(`right`, `field`);
                    let fieldName = $(`input[name=${name}]:checked`).val();
                    reps.push([fieldName, left, right]);
                } else {
                    headerBreakdown(id, field);
                }
            }

            field.replacements = reps;

            switch (field[`field-name`]) {
                case `radio-group`:
                    radioGroupExtras(id.substring(0, 2), field, inputs);
                    break;
                case `checkbox-array`:
                    checkboxArrayExtras(field, inputs);
                    break;
                case `fragment`:
                    field.fragment = $(`#${id.substring(0, 11)}-textarea`).val();
                    break;
                case `paragraph`:
                    field.paragraph = $(`#${id.substring(0, 12)}-textarea`).val();
                    break;
                case `top-part`:
                    field.top = $(`#${id.substring(0, 11)}-textarea`).val();
                    break;
                case `error-summary`:
                    field["error-summary"] = $(`#${id.substring(0, 16)}-textarea`).val();
                    break;
                case `if`:
                    field.condition = $(`#${id}`).val();
                    break;
                case `elseif`:
                    field.condition = $(`#${id}`).val();
                    break;
            }
            fields.push(field)
        }
    }
    casa.fields = fields;
    return casa;
}

let radioGroupExtras = (prefix, field, inputs) => {
    field.inline = $(`#${prefix}-radio-group-inline-yes`).prop("checked");
    let buttons = [];
    let text;
    let value;
    let trigger;
    for (let i = 0; i < inputs.length; i++) {
        let id = inputs[i].id;
        if (id.includes("rb-text")) {
            text = $(`#${id}`).val();
        } else if (id.includes("rb-value")) {
            value = $(`#${id}`).val();
        } else if (id.includes("rb-trigger")) {
            trigger = ($(`#${id}`).val());
            buttons.push([text, value, trigger])
        }
    }
    if (buttons) {
        field.buttons = buttons;
    }
}

let checkboxArrayExtras = (field, inputs) => {
    let boxes = [];
    let text;
    let value;
    let trigger;
    for (let i = 0; i < inputs.length; i++) {
        let id = inputs[i].id;
        if (id.includes("cb-text")) {
            text = $(`#${id}`).val();
        } else if (id.includes("cb-value")) {
            value = $(`#${id}`).val();
        } else if (id.includes("cb-trigger")) {
            trigger = ($(`#${id}`).val());
            boxes.push([text, value, trigger])
        }
    }
    if (boxes) {
        field.boxes = boxes;
    }

}

const headerBreakdown = (id, field) => {
    if (id.includes("header-h1")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 1;
        }
    } else if (id.includes("header-h2")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 2;
        }
    } else if (id.includes("header-h3")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 3;
        }
    } else if (id.includes("header-h4")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 4;
        }
    } else if (id.includes("header-h5")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 5;
        }
    } else if (id.includes("header-h6")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 6;
        }
    }
}

module.exports = buildtag;
},{}],36:[function(require,module,exports){
'use strict'

const address_JSON = (field) => {
    let json = `
    "addressDetails": {
        "label": "Address",
        "validation": {
            "mandatory": "Enter your address. You must complete the first two lines.",
            "errorMsgAddress1and2": {
                "inline": "${field.header} - You must complete the first two lines.",
                "summary": "${field.header} - You must complete the first two lines."
            },
            "errorMsgPostcode": {
                "inline": "A post code must be in the format PR2 8AE",
                "summary": "Postcode - A post code must be in the format PR2 8AE"
            },
            "errorMsgPostcodeRegex": {
                "inline": "Remove any characters apart from letters or numbers",
                "summary": "Postcode - Remove any characters apart from letters or numbers"
            },
            "invalidRegexAddress": {
                "inline": "Enter a valid address using only letters and numbers",
                "summary": "Enter a valid address using only letters and numbers"
            },
            "mandatoryAndRegexErrors": {
              "inline": "${field.header} - You must complete the first two lines and you must only use letters and numbers",
              "summary": "${field.header} - You must complete the first two lines and you must only use letters and numbers"
            },
            "errorMsgAddressTooLong": {
                "inline": "Too many characters in address line",
                "summary": "Address - Too many characters in address line"
            },
            "errorMsgPostcodeTooLong": {
                "inline": "Too many characters in postcode",
                "summary": "Address - Too many characters in postcode"
            }
        }
    },\n`
    return json;
}

module.exports = address_JSON;
},{}],37:[function(require,module,exports){
'use strict'

const bankDetails_JSON = (field) => {

    let json = `
"bankAccount": {
        "haveBankAccount": {
            "label": "Do you have a bank account?",
            "validation": {
                "mandatory": {
                    "inline": "You must complete this section",
                    "summary": "Do you have a bank account? - You must complete this section"
                },
                "inArray": {
                    "inline": "Invalid value",
                    "summary": "Do you have a bank account? - Invalid value"
                }
            }
        },

        "noBankAccountWarning": {
            "warningText1": "You won't be paid Carer's Allowance without a bank account.",
            "warningText2": {
                "gb": "You can add bank details after you apply by contacting the Carer's Allowance Unit.",
                "ni": "You can add bank details after you apply by contacting the Disability and Carers Service."
            }
        },

        "accountHolderName": {
            "label": "Account holder name",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Account holder name - You must complete this section",
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Account holder name - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Account Holder name - Too many characters"
                }
            }
        },

        "bankName": {
            "label": "Name of bank or building society",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Name of bank or building society - You must complete this section",
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Name of bank or building society - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Name of bank or building society - Too many characters"
                }
            }
        },

        "sortCode": {
            "label": "Sort code",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Sort code - You must complete this section",
                "invalidLengthInline": "The sort code must be 6 digits long",
                "invalidLengthSummary": "Sort code - The sort code must be 6 digits long",
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Sort code - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops"
            }
        },

        "accountNumber": {
            "label": "Account number",
            "validation": {
                "mandatoryInline": "You must complete this section",
                "mandatorySummary": "Account number - You must complete this section",
                "invalidCharsInline": "You must only enter numbers",
                "invalidCharsSummary": "Account number - You must only enter numbers",
                "fieldLengthInline": "Minimum length is 6",
                "fieldLengthSummary": "Account number - Minimum length is 6",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Account number - Too many characters"
                }
            }
        },

        "postOfficeCard": {
            "link": "Post Office card account numbers",
            "messageText1": "If you're using a Post Office card account, your account number isn't the number on your card.",
            "messageText2": "Find the correct number on any letter you've had from the Post Office about your account."
        },

        "rollNumber": {
            "label": "Building society roll or reference number (optional)",
            "validation": {
                "invalidCharsInline": "Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "invalidCharsSummary": "Building society roll or reference number - Remove any characters apart from numbers, letters or basic punctuation, eg commas and full stops",
                "tooLong":{
                    "inline":"Too many characters",
                    "summary":"Building society roll or reference number - Too many characters"
                }
            }
        }
    },`

    return json;
}

module.exports = bankDetails_JSON;
},{}],38:[function(require,module,exports){
'use strict'

const checkboxArray_JSON = (field) => {
    let tag = field.tag;
    let header = field.header;
    let boxes = field.boxes;

    let answer = `answer": {\n`;
    let list = `<ul class='list-bullet'>`;

    for (let i = 0; i < boxes.length; i++) {
        if (i === boxes.length - 1) {
            answer += `"${tag}.answer.${i +1}": "${boxes[i][0]}"\n`;
        } else {
            answer += `"${tag}.answer.${i +1}": "${boxes[i][0]}",\n`;
        }
        list += `<li>${boxes[i][0]}</li>`
    }

    answer += `},`
    list += `</ul>`

    let json = `
    "${tag}": {
    "label": "${header}",
    "${answer}
    "validation": {
      "mandatory": {
        "inline": "You must select: ${list}",
        "summary": "${header} - You must select: ${list}"
      },
      "inArray": {
        "inline": "Invalid value",
        "summary": "${header} - Invalid value"
      }
    }
  },`
    return json;
}

module.exports = checkboxArray_JSON;
},{}],39:[function(require,module,exports){
'use strict'

const date_JSON = (field) => {
  let header = field.header;
  let tag = field.tag;
  let hint = field["text-hint"];

  let json = `"${tag}": {\n`;

  if (header !== "") {
    json += `"label": "${header}",\n`
  }

  if (hint !== "") {
    json += `"hint": "${hint}",\n`
  }

  json += `"validation": {\n`
  json += `"mandatoryInline": "You must complete this section",\n`
  json += `"mandatorySummary": "${header} - You must complete this section",\n`
  json += `"invalidDateInline":"Invalid value",\n`
  json += `"invalidDateSummary":"${header} - Invalid value"\n`
  json += `}\n`
  json += `},\n`
  return json;
}

module.exports = date_JSON;
},{}],40:[function(require,module,exports){
'use strict'

const email_JSON = (field) => {
    let header = field.header;
    let tag = field.tag;

    let json = `
    "${tag}": {
        "emailAddress": {
            "label": "${tag}",
            "validation": {
                "notifyEmailValidation": {
                    "inline": "Enter a valid email address",
                    "summary": "${header} - Enter a valid email address"
                },
                "inline": "Enter a valid email address",
                "summary": "${header} - Enter a valid email address"
            }
        },
        "confirmEmailAddress": {
            "label": "Confirm ${tag}",
            "validation": {
                "inline": "Enter a valid email address",
                "summary": "${header} - Enter a valid email address",
                "match": {
                    "inline": "Emails do not match",
                    "summary": "${header} - Emails do not match"
                }
            }
          }
      },`
    return json.trim();
}

module.exports = email_JSON;
},{}],41:[function(require,module,exports){
'use strict'

const errorSummary_JSON = (field) => {
  let tag = field.tag;
  let errorSummary = field["error-summary"];
  let errorSummarySplit = errorSummary.split("\n");
  let json = "";

  let lineCnt = 1;

  errorSummarySplit.forEach(line => {
    line = line.trim();
    if (line.length > 0 ) {
      json += `"${tag}.line${lineCnt}":"${line}",\n`
      lineCnt++;
    }
  });

  json += `\n\n`;

  return json;
}

module.exports = errorSummary_JSON;
},{}],42:[function(require,module,exports){
'use strict'

const fragment_JSON = (field) => {
    let tag = field.tag
    let messArray = [];
    let json = "\n";

    let subFragments = field.fragment.split("<=");

    subFragments.forEach(subFragment => {
        let end = subFragment.indexOf("=>");
        if (end > -1) {
            let pair = subFragment.substring(0, end).split("=");
            messArray.push(pair)
        }
    })

    messArray.forEach(pair => {
        json += `"${tag}.${pair[0].trim()}": "${pair[1].trim()}",\n`
    })

    if (json.length > 0) {
        json + ",\n"
    }
    return json;
}

module.exports = fragment_JSON;
},{}],43:[function(require,module,exports){
'use strict'

const header_JSON = (field) => {
    let tag = field.tag;
    let text = field.header
    let json = `"${tag}.text": "${text}"\n`
    return json.trim();
}

module.exports = header_JSON;
},{}],44:[function(require,module,exports){
'use strict'

const name_JSON = field => {
    let tag = field.tag;
    let json = `
    "${tag}.Title": {
        "label": "Title",
        "validation": {
            "mandatoryInline": "You must complete this section",
            "mandatorySummary": "Title - You must complete this section",
            "invalidCharsInline": "Enter details again without using {titleInvalidChars}",
            "invalidCharsSummary": "Title - Enter details again without using {titleInvalidChars}",
            "tooLong": {
                "inline": "Too many characters entered",
                "summary": "Title - Too many characters entered"
            }
        }
    },
    "${tag}.FirstName": {
        "label": "First name",
        "validation": {
            "mandatoryInline": "You must complete this section",
            "mandatorySummary": "First name - You must complete this section",
            "invalidCharsInline": "Enter details again without using {firstNameInvalidChars}",
            "invalidCharsSummary": "First name - Enter details again without using {firstNameInvalidChars}",
            "invalidNonAlphaCharsInline": "Enter details again without using consecutive non-alphabetical characters",
            "invalidNonAlphaCharsSummary": "First name - Enter details again without using consecutive non-alphabetical characters",
            "invalidUseOfHyphensInline": "Enter details again without using a dash at the beginning or end",
            "invalidUseOfHyphensSummary": "First name - Enter details again without using a dash at the beginning or end",
             "tooLong": {
                "inline": "Too many characters entered",
                "summary": "First name - Too many characters entered"
            }
        }
    },
    "${tag}.MiddleName": {
        "label": "Middle name(s)",
        "validation": {
            "invalidCharsInline": "Enter details again without using {middleNameInvalidChars}",
            "invalidCharsSummary": "Middle name(s) - Enter details again without using {middleNameInvalidChars}",
            "invalidNonAlphaCharsInline": "Enter details again without using consecutive non-alphabetical characters",
            "invalidNonAlphaCharsSummary": "Middle name(s) - Enter details again without using consecutive non-alphabetical characters",
            "invalidUseOfHyphensInline": "Enter details again without using a dash at the beginning or end",
            "invalidUseOfHyphensSummary": "Middle name(s) - Enter details again without using a dash at the beginning or end",
            "tooLong": {
                "inline": "Too many characters entered",
                "summary": "Middle name(s) - Too many characters entered"
            }
        }
    },
    "${tag}.LastName": {
        "label": "Last name",
        "validation": {
            "mandatoryInline": "You must complete this section",
            "mandatorySummary": "Last name - You must complete this section",
            "invalidCharsInline": "Enter details again without using {lastNameInvalidChars}",
            "invalidCharsSummary": "Last name - Enter details again without using {lastNameInvalidChars}",
            "invalidNonAlphaCharsInline": "Enter details again without using consecutive non-alphabetical characters",
            "invalidNonAlphaCharsSummary": "Last name - Enter details again without using consecutive non-alphabetical characters",
            "invalidUseOfHyphensInline": "Enter details again without using a dash at the beginning or end",
            "invalidUseOfHyphensSummary": "Last name - Enter details again without using a dash at the beginning or end",
             "tooLong": {
                "inline": "Too many characters entered",
                "summary": "Last name - Too many characters entered"
            }
        }
    },`
    return json;
}

module.exports = name_JSON;
},{}],45:[function(require,module,exports){
'use strict'

const nino_JSON = (field) => {
let tag = field.tag;
let hint = field["text-hint"];
    let json = `
    "${tag}NationalInsuranceNumber": {
        "label": "National Insurance number",
        "hint": "${hint}",
        "validation": {
            "invalidNinoInline": "You must enter a valid National Insurance number, eg QQ123456C",
            "invalidNinoSummary": "National Insurance number - You must enter a valid National Insurance number, eg QQ123456C",
            "tooLong": {
                "inline": "Too many characters entered",
                "summary": "National Insurance number - Too many characters entered"
            }
        }
    },`
    return json+`\n`;
}

module.exports = nino_JSON;
},{}],46:[function(require,module,exports){
'use strict'

const paragraph_JSON = (field) => {
    let tag = field.tag;
    let paragraph = field.paragraph;
    let paraSplit = paragraph.split("\n");
    let json = "";

    let lineCnt = 1;

    paraSplit.forEach(line => {
        line = line.trim();
        if (line.substring(0, 2) !== '<h' &&
            line.substring(0, 3) !== '<ul' &&
            line.substring(0, 3) !== '<li' &&
            line.substring(0, 4) !== '</ul') {
            json += `"${tag}.line${lineCnt}":"${line}",\n`
            lineCnt++;
        }
    });

    json += `\n\n`;

    return json;
}

module.exports = paragraph_JSON;
},{}],47:[function(require,module,exports){
'use strict'

const phone_JSON = field => {
let header = field.header;
let tag = field.tag;
let hint = field["text-hint"];
  
    let json = `"${tag}": {\n`;
    json += `"label": "${tag} number",\n`;
    json += ` "validation": {\n`
    json += `"errorMsg": {\n`
    json += ` "inline": "Invalid value",\n`
    json += ` "summary": "${header} - Invalid value"\n`
    json += ` },\n`
    json += `"tooLong": {\n`
    json += `"inline": "Enter a telephone number in 20 characters or less",\n`
    json += `"summary": "${header} - Enter a telephone number in 20 characters or less"\n`
    json += `}\n`
    json += ` }\n`
    json += `},`
    return json;
}

module.exports = phone_JSON;
},{}],48:[function(require,module,exports){
'use strict'

const radioGroup_JSON = (field) => {
  let tag = field.tag;
  let answers = buildAnswers(field.buttons);
  let validation = buildValidation(field.header);
  let header = field.header;
  let hint = field["text-hint"];

  let json = `"${tag}": {\n`;
  json += `"header": "${header}",\n`;

  if (hint !== "") {
    json += `"hint": "${hint}",\n`;
  };

  json += `"answers": {\n`;
  json += `${answers}},\n`;
  json += `"validation": {\n`;
  json += `${validation}\n`;
  json += `}\n`
  json += `},\n`
  return json;
}

const buildAnswers = buttons => {
  let answers = "";
  for (let i = 0; i < buttons.length; i++) {
    if (i === buttons.length - 1) {
      answers += `"${buttons[i][1]}":"${buttons[i][0]}"\n`;
    } else {
      answers += `"${buttons[i][1]}":"${buttons[i][0]}",\n`;
    }
  }
  return answers;
}

const buildValidation = header => {
  let validation = `"mandatory": {\n`;
  validation += `"inline": "You must complete this section",\n`
  validation += `"summary": "${header} - You must complete this section"\n`;
  validation += `},\n`;
  validation += `"inArray": {\n`;
  validation += `"inline": "Invalid value",\n`;
  validation += `"summary": "${header} - Invalid value"\n`;
  validation += `}`;
  return validation;
}

module.exports = radioGroup_JSON;
},{}],49:[function(require,module,exports){
'use strict'

const textInput_JSON = (field) => {
    let header = field.header;
    let hint = field["text-hint"];

    let json = `"${header}": {\n`;;
    json += `"label": "${header}",\n`;
    json += `"hint": "${hint}",\n`;
    json += `"validation": {\n`;
    json += `"mandatoryInline": "You must complete this section",\n`;
    json += `"mandatorySummary": "${header} - You must complete this section",\n`;
    json += `"invalidRegexInline":"Invalid value",\n`;
    json += `"invalidRegexSummary":"${header} - Invalid value",\n`;
    json += `"tooLongInline": "${header}",\n`;
    json += `"tooLongSummary": "${header} - Too many characters entered"\n`;
    json += `}\n`;
    json += `},\n`;


    return json.trim();
}

module.exports = textInput_JSON;
},{}],50:[function(require,module,exports){
'use strict'
const { buildOptions, buildHeader } = require("./page_utilities");

const buildAddressObject = (pageName, field) => {
    let tag = field.tag;
    let addressObject = `{{ address.CADSAddress(\n`;
    addressObject += `formData.${tag},\n`;
    addressObject += `"${tag}",\n`;
    addressObject += buildHeader(pageName, tag, field);
    addressObject += buildOptions(pageName, tag, field, 36);
    addressObject += `errors=formErrors)\n`;
    addressObject += `}}\n\n`;
    return addressObject;
}

module.exports = buildAddressObject;
},{"./page_utilities":63}],51:[function(require,module,exports){
'use strict'
const { buildOptions, buildHeader } = require("./page_utilities");

const buildBankDetailsObject = (pageName, field) => {
    let tag = field.tag;

    let bankDetailsObject = `{{ form.text(
            formData.accountHolderName,
            'accountHolderName',
            t('${tag}:bankAccount.accountHolderName.label'),
            options = {
                trim: true,
                maxlength: 60
            },
            errors=formErrors)
        }}

        {{ form.text(
            formData.bankName,
            'bankName',
            t('${tag}:bankAccount.bankName.label'),
            options = {
                trim: true,
                maxlength: 60
            },
            errors=formErrors)
        }}

        {{ sortCode.cadsSortCode(
            formData.sortCode,
            'sortCode',
            t('${tag}:bankAccount.sortCode.label'),
            errors=formErrors)
        }}

        {{ form.text(
            formData.accountNumber,
            'accountNumber',
            t('${tag}:bankAccount.accountNumber.label'),
            options = {
                trim: true,
                maxlength: 10
            },
            errors=formErrors)
        }}

        <div class="accordion">
            <p class="accordion-title title-mini" accordion-track="{{ accordionTrack }}">{{ t('${tag}:bankAccount.postOfficeCard.link') }}</p>
            <div class="accordion-content panel panel-border-narrow">
                <p>{{ t('${tag}:bankAccount.postOfficeCard.messageText1') }} <br />
                    {{ t('${tag}:bankAccount.postOfficeCard.messageText2') }}</p>
            </div>
        </div>

        {{ form.text(
            formData.rollNumber,
            'rollNumber',
            t('${tag}:bankAccount.rollNumber.label'),
            options = {
                trim: true,
                maxlength: 18
            },
            errors=formErrors)
        }}\n\n`

    return bankDetailsObject;
}

module.exports = buildBankDetailsObject;
},{"./page_utilities":63}],52:[function(require,module,exports){
'use strict'

const buildBeginHiddenObject = (pageName, field) => {
    let tag = field.tag;
    let blanked = field["blanked-by"]
    let beginHiddenObject = `<div class="panel panel-border-narrow js-hidden" id="${tag}" blanked-by="${blanked}">\n\n`;
    return beginHiddenObject;
}

module.exports = buildBeginHiddenObject;
},{}],53:[function(require,module,exports){
'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildCheckboxArrayObject = (pageName, field) => {
    let tag = field.tag;
    let boxes = field.boxes;

    let checkboxArrayObject = `{% call form.checkboxArrayGroup(\n`
    checkboxArrayObject += `formData.${tag},\n`
    checkboxArrayObject += `"${tag}",\n`;
    checkboxArrayObject += buildHeader(pageName, tag, field);
    checkboxArrayObject += buildOptions(pageName, tag, field);
    checkboxArrayObject += `errors=formErrors)\n`;
    checkboxArrayObject += `%},\n\n`

    for (let i = 0; i < boxes.length; i++) {
        let options = "";
        if (boxes[i][2]) {
            options = `options = {\n`;
            options += `targetPanel: "${boxes[i][2]}"\n`;
            options += `},\n`;
        }
        checkboxArrayObject += `{{ form.checkboxArray(\n`
        checkboxArrayObject += `formData.${tag},\n`
        checkboxArrayObject += `"${tag}",\n`
        checkboxArrayObject += `t("${pageName}:${tag}.answers.${boxes[i][1]}"),\n`
        checkboxArrayObject += `"${boxes[i][1]}",\n`;
        checkboxArrayObject += `${options}`
        checkboxArrayObject += `errors=formErrors)\n`
        checkboxArrayObject += `}}\n\n`;
    }

    checkboxArrayObject += `{% endcall %},\n\n`

    return checkboxArrayObject;
}

module.exports = buildCheckboxArrayObject;
},{"./page_utilities":63}],54:[function(require,module,exports){
'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildDateObject = (pageName, field) => {
    let tag = field.tag;
    let dateObject = `{{ form.dateObject(\n`;
    dateObject += `formData.${tag},\n`;
    dateObject += `"${tag}",\n`;
    dateObject += buildHeader(pageName, tag, field);
    dateObject += buildOptions(pageName, tag, field);
    dateObject += `errors=formErrors,\n`
    dateObject += `validationVariables = validationVariables\n`
    dateObject += `)\n`
    dateObject += `}},\n\n`
    return dateObject;
}



module.exports = buildDateObject;
},{"./page_utilities":63}],55:[function(require,module,exports){
'use strict'

const buildElseifObject = (pageName, field) => {
  let condition = field.condition;
  let elseifObject = `{% elseif ${condition} %}\n\n`
  return elseifObject;
}

module.exports = buildElseifObject;
},{}],56:[function(require,module,exports){
'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildEmailObject = (pageName, field) => {
    let tag = field.tag;
    let emailObject = `{{ form.text(\n`;
    emailObject += `formData.${tag},\n`;
    emailObject += `'tagAddress',\n`;
    emailObject += buildHeader(pageName, tag, field);
    emailObject += buildOptions(pageName, tag, field);
    emailObject += `errors=formErrors)\n`;
    emailObject += `}}\n\n`
    emailObject += `{{ form.text(\n`;
    emailObject += `formData.${tag},\n`;
    emailObject += `"${tag}",\n`
    emailObject += `t("${pageName}:${tag}.confirmEmailAddress.label"),\n`;
    emailObject += buildOptions(pageName, tag, field);
    emailObject += `errors=formErrors)\n`;
    emailObject += `}}\n\n`

    return emailObject;
}

module.exports = buildEmailObject;
},{"./page_utilities":63}],57:[function(require,module,exports){
'use strict'

const buildErrorSummaryObject = (pageName, field) => {
    let tag = field.tag;
    let summary = field["error-summary"];
    let summarySplit = summary.split("\n");
    let errorSummaryObject = `<div class="js-hidden error-summary" id="${tag}">\n`;
    let lineCnt = 1;

    summarySplit.forEach(line => {
        line = line.trim();
        if (line.length > 0) {
            errorSummaryObject += `{{ t('${pageName}:${tag}.line${lineCnt}') }}\n`
            lineCnt++;
        }
    })

    errorSummaryObject += `</div>,\n\n`
    return errorSummaryObject;
}

module.exports = buildErrorSummaryObject
},{}],58:[function(require,module,exports){
'use strict'

const parseFragment = (pageName, field) => {
    let tag = field.tag;
    let frag = field.fragment;
    let start;
    let end;
    let cnt = 0;

    do {
        cnt++
        start = frag.indexOf(`<=`);
        end = frag.indexOf(`=>`);
        if (start > -1 && end > -1) {
            let subFrag = frag.substring(start + 2, end).trim();
            let varName = subFrag.substring(0, subFrag.indexOf(`=`)).trim();
            let newText = `{{ t("${pageName}:${tag}.${varName}) }}`
            let oldText = frag.substring(start, end + 2);
            frag = frag.replace(oldText, newText)
        }
    } while (start > -1 && end > -1 && cnt < 500);
    return `${frag},\n\n`;
}

module.exports = parseFragment;
},{}],59:[function(require,module,exports){
'use strict'

const buildHeaderObject = (pageName, field) => {
    let sizes = [``, `heading-large`, `heading-medium`, `heading-medium`, `heading-small`, `heading-small`, `heading-small`];
    let tag = field.tag;
    let size = "h" + field["header-size"] + " " + sizes[field["header-size"]];
    let headerObject = `<${size}>{{ t('${pageName}:${tag}.text') }}</${size}>,\n\n`
    return headerObject;
}

module.exports = buildHeaderObject;
},{}],60:[function(require,module,exports){
'use strict'

const buildIfObject = (pageName, field) => {
  let condition = field.condition;
  let ifObject = `{% if ${condition} %}\n\n`
  return ifObject;
}

module.exports = buildIfObject;
},{}],61:[function(require,module,exports){
'use strict'

const { buildOptions } = require("./page_utilities");

const buildNameObject = (pageName, field) => {
    let tag = field.tag;

    let nameObject = `{{ form.text(\n`;
    nameObject += `formData.${tag}Title,\n`;
    nameObject += `"${tag}Title",\n`;
    nameObject += `t("${pageName}:${tag}Title.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 20, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}}\n\n`;
    nameObject += `{{ form.text(\n`;
    nameObject += `formData.${tag}FirstName,\n`;
    nameObject += `"${tag}FirstName",\n`;
    nameObject += `t("$${pageName}:${tag}FirstName.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 35, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}}\n\n`;
    nameObject += `{{ form.text(`
    nameObject += `formData.${tag}MiddleName,`
    nameObject += `"${tag}MiddleName",\n`;
    nameObject += `t("$${pageName}:${tag}MiddleName.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 35, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}}\n\n`;
    nameObject += `{{ form.text(`
    nameObject += `formData.${tag}LastName,`
    nameObject += `"${tag}LastName",\n`;
    nameObject += `t("$${pageName}:${tag}LastName.label"),\n`;
    nameObject += buildOptions(pageName, tag, field, 35, false, true);
    nameObject += `errors = formErrors,\n`;
    nameObject += `validationVariables = validationVariables)\n`;
    nameObject += `}},\n\n`;

    return nameObject;
}

module.exports = buildNameObject;
},{"./page_utilities":63}],62:[function(require,module,exports){
'use strict'
const { buildHeader } = require("./page_utilities");

const buildNinoObject = (pageName, field) => {
    let tag = field.tag;
    let options = buildOptions(pageName, tag)
    let ninoObject = `{{ form.text(\n`;
    ninoObject += `formData.${tag},\n`;
    ninoObject += `"${tag}",\n`;
    ninoObject += buildHeader(pageName, tag, field);
    ninoObject += options;
    ninoObject += `errors=formErrors, validationVariables = validationVariables)\n`
    ninoObject += `}},\n\n`
    return ninoObject;
}

const buildOptions = (pageName, tag) => {
    let options = `options = {\n`;
    options += `hint: "For example QQ123456C",\n`;
    options += `trim: true,\n`;
    options += `maxlength: 19,\n`;
    options += `extraCss: [ "uppercase" ],\n`;
    options += `inputPostfixHtml: "<p><span class="form-hint">" + "t("${pageName}:${tag}.hint")" + "</span></p>"\n`;
    options += `},\n`
    return options;
}

module.exports = buildNinoObject;
},{"./page_utilities":63}],63:[function(require,module,exports){
'use  strict'

const buildHeader = (pageName, tag, field) => {
    let header = `t("${pageName}:${tag}.label")`;

    field.replacements.forEach(replacement => {
        if (replacement[0] === `header`) {
            header += `\n| replace("${replacement[1]}", ${replacement[2]})`;
        };
    });

    header += `,\n`;
    return header;
};

const buildOptions = (pageName, tag, field, maxlength = 0, inline = false, trim = false) => {
    let options = "";

    if (field["text-hint"] || maxlength || field.target || trim) {
        options = `options = {\n`;

        if (field["text-hint"]) {
            options += `hint: t("${pageName}:${tag}.hint")`;

            field.replacements.forEach(replacement => {
                if (replacement[0] === `hint`) {
                    options += `\n| replace("${replacement[1]}", ${replacement[2]})`;
                };
            });

            options += `,\n`;
        };

        if (maxlength > 0) {
            options += `maxlength: ${maxlength},\n`;
        };

        if (trim) {
            options += `trim: true,\n`;
        };

        if (inline) {
            options += `inline: true,\n`;
        };

        if (field.target) {
            options += `targetPanel: "${field.target}",\n`;
        };

        options += `},\n`;
    }
    return options;
};

module.exports = { buildOptions, buildHeader };
},{}],64:[function(require,module,exports){
'use strict'

const buildParagraphObject = (pageName, field) => {
    let tag = field.tag;
    let paragraph = field.paragraph;
    let paraSplit = paragraph.split("\n");
    let paragraphObject = `<p>\n`;

    let lineCnt = 1;

    paraSplit.forEach(line => {
        line = line.trim();
        if (line.substring(0, 2) === '<h' ||
            line.substring(0, 3) === '<ul' ||
            line.substring(0, 3) === '<li' ||
            line.substring(0, 4) === '</ul') {
            paragraphObject += `${line}\n`;
        } else {
            paragraphObject += `{{ t('${pageName}:${tag}.line${lineCnt}') }}\n`
            lineCnt++;
        }
    })

    paragraphObject += `</p>,\n\n`

    return paragraphObject;
}

module.exports = buildParagraphObject;
},{}],65:[function(require,module,exports){
'use strict'
const { buildOptions, buildHeader } = require("./page_utilities");

const buildPhoneObject = (pageName, field) => {
    let tag = field.tag;
    let phoneObject = `{{ form.text(formData.${tag},\n`;
    phoneObject += `"${tag}",\n`;
    phoneObject += buildHeader(pageName, tag, field);
    phoneObject += buildOptions(pageName, tag, field, 20, false, true);
    phoneObject += `errors=formErrors)\n`;
    phoneObject += `}},\n\n`
    return phoneObject;
}

module.exports = buildPhoneObject;
},{"./page_utilities":63}],66:[function(require,module,exports){
'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildRadioGroupObject = (pageName, field) => {
    let tag = field.tag;
    let buttons = field.buttons;
    let inline = field.inline;
    let radioGroupObject;

    radioGroupObject = `{% call form.radioGroup(\n`;
    radioGroupObject += `formData.${tag},\n`;
    radioGroupObject += `"${tag}",\n`;
    radioGroupObject += buildHeader(pageName, tag, field);
    radioGroupObject += buildOptions(pageName, tag, field, 0, inline, false);
    radioGroupObject += `errors=formErrors\n`;
    radioGroupObject += `%}\n\n`

    for (let i = 0; i < buttons.length; i++) {
        let options = "";
        if (buttons[i][2]) {
            options = `options = {\n`;
            options += `targetPanel: "${buttons[i][2]}"\n`;
            options += `},\n`;
        }
        radioGroupObject += `{{ form.radio(\n`
        radioGroupObject += `formData.${tag},\n`
        radioGroupObject += `"${tag}",\n`
        radioGroupObject += `t("${pageName}:${tag}.answers.${buttons[i][1]}"),\n`
        radioGroupObject += `"${buttons[i][1]}")\n`;
        radioGroupObject += `${options}`
        radioGroupObject += `}}\n\n`;
    }

    radioGroupObject += `{% endcall %},\n\n`

    return radioGroupObject;
}

module.exports = buildRadioGroupObject;
},{"./page_utilities":63}],67:[function(require,module,exports){
'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildTextAreaObject = (pageName, field) => {
    let tag = field.tag;
    let height = field["text-height"];
    let textAreaObject = `{{ form.textarea(formData.${tag},\n`;
    textAreaObject += `'${tag}',\n`
    textAreaObject += `t('${pageName}:${tag}.label'),\n`
    textAreaObject += `options={\n`
    textAreaObject += `trim: true,\n`
    textAreaObject += `maxlength: 3000,\n`
    textAreaObject += `size: 'form-control-full',\n`
    textAreaObject += `inputAttributes: { rows: ${height} }\n`
    textAreaObject += `},\n`
    textAreaObject += `errors=formErrors, validationVariables=validationVariables)\n`
    textAreaObject += `}},\n\n`

    return textAreaObject;
}

module.exports = buildTextAreaObject;
},{"./page_utilities":63}],68:[function(require,module,exports){
'use strict'

const { buildOptions, buildHeader } = require("./page_utilities");

const buildTextInputObject = (pageName, field) => {
    let tag = field.tag;
    let textInputObject = `{{ form.text(\n`;
    textInputObject += `formData.${tag},\n`;
    textInputObject += `"${tag}",\n`;
    textInputObject += buildHeader(pageName, tag, field);
    textInputObject += buildOptions(pageName, tag, field, 60, false, true);
    textInputObject += `errors=formErrors, validationVariables = validationVariables)\n`
    textInputObject += `}},\n\n`
    return textInputObject;
}

module.exports = buildTextInputObject;
},{"./page_utilities":63}],69:[function(require,module,exports){
'use strict'

const address_JSON = require("./json_builders/address_JSON");
const date_JSON = require("./json_builders/date_JSON");
const email_JSON = require("./json_builders/email_JSON");
const fragment_JSON = require("./json_builders/fragment_JSON");
const header_JSON = require("./json_builders/header_JSON");
const name_JSON = require("./json_builders/name_JSON");
const nino_JSON = require("./json_builders/nino_JSON");
const paragraph_JSON = require("./json_builders/paragraph_JSON");
const errorSummary_JSON = require("./json_builders/errorSummary_JSON");
const textInput_JSON = require("./json_builders/textInput_JSON");
const bankDetails_JSON = require("./json_builders/bankDetails_JSON");
const phone_JSON = require("./json_builders/phone_JSON");
const radioGroup_JSON = require("./json_builders/radioGroup_JSON");
const checkboxArray_JSON = require("./json_builders/checkboxArray_JSON");

const showJSON = (casa, divide) => {
    $(".field-build").hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    $(`#summary`).hide();
    let json = buildJSON(casa, divide);
    $(`.page-build`).empty();
    $('.page-build').append(`<textarea id="page-output" cols="130" rows="38">${json}</textarea>`);
    window.scrollTo(0, 0);
}

const buildJSON = (casa, divide) => {
    let header = casa['page-header'];
    let json = `{\n`;
    json += `"pageHeader": "${header}",\n`
    json += buildMessages(casa.fields, divide);
    json = indentJSON(json.split('\n')).trim();

    if (json.substring(json.length - 1) === ",") {
        json = json.substring(0, json.length - 1)
    }

    if (json.substring(json.length - 1) === ",") {
        json = json.substring(0, json.length - 1)
    }

    json += `\n}`
    return json
}

const buildMessages = (fields, divide) => {
    let json = [];
    fields.forEach(field => {
        if (divide) {
            json += `\n============ ${[field["field-name"]]} ============`;
        }
        switch (field['field-name']) {
            case 'address':
                json += address_JSON(field);
                break;
            case 'phone':
                json += phone_JSON(field);
                break;
            case 'email':
                json += email_JSON(field);
                break;
            case 'name':
                json += name_JSON(field);
                break;
            case 'nino':
                json += nino_JSON(field);
                break;
            case 'date':
                json += date_JSON(field);
                break;
            case 'paragraph':
                json += paragraph_JSON(field);
                break;
            case 'error-summary':
                json += errorSummary_JSON(field);
                break;
            case 'text-input':
                json += textInput_JSON(field);
                break;
            case 'bank-details':
                json += bankDetails_JSON(field);
                break;
            case 'header':
                json += header_JSON(field);
                break;
            case 'fragment':
                json += fragment_JSON(field);
                break;
            case 'radio-group':
                json += radioGroup_JSON(field);
                break;
            case 'checkbox-array':
                json += checkboxArray_JSON(field);
                break;
        }
    })
    return json;
}

const indentJSON = data => {
    let b = '    ';
    let block = [];
    let padding = "";
    let ind = 0;
    let output = "";
    let newLine = "";

    for (let i = 0; i < 100; i++) {
        block.push(padding);
        padding += b;
    }

    data.forEach(line => {
        newLine = `${line.trim()}\n`;

        if (newLine.includes("}")) {
            ind--;
        }

        output += `${block[ind]}${newLine}`

        if (newLine.includes("{")) {
            ind++;
        }

    })

    return output;
}

module.exports = { showJSON, buildJSON };
},{"./json_builders/address_JSON":36,"./json_builders/bankDetails_JSON":37,"./json_builders/checkboxArray_JSON":38,"./json_builders/date_JSON":39,"./json_builders/email_JSON":40,"./json_builders/errorSummary_JSON":41,"./json_builders/fragment_JSON":42,"./json_builders/header_JSON":43,"./json_builders/name_JSON":44,"./json_builders/nino_JSON":45,"./json_builders/paragraph_JSON":46,"./json_builders/phone_JSON":47,"./json_builders/radioGroup_JSON":48,"./json_builders/textInput_JSON":49}],70:[function(require,module,exports){
'use strict'

const showJavaScript = (casa) => {
    $(".field-build").hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    $(`#summary`).hide();
    let javaScript = buildJavaScript(casa);
    $(`.page-build`).empty();
    $(".page-build").append(`<textarea id="page-output" cols="130" rows="38">${javaScript}</textarea>`);
    window.scrollTo(0, 0);
}

const buildJavaScript = (casa) => {
    let folder = casa.folder;
    let pageName = casa["page-name"];
    let javascript = `const journeyTracker = require('./helpers/journeyTrack.js');
    module.exports = function () {
    return {
        view: 'pages/${folder}/${pageName}',
        fieldValidators: require('../field-validators/${folder}/${pageName}'),
        hooks: {
          prerender: (req, res, next) => {
            journeyTracker(req, '${folder}', '${pageName}');
            next();
          },\n`

    if (casa.postrender) {
        javascript += `          postrender: (req, res, next) => {
            next();
          },\n`
    }

    if (casa.pregather) {
        javascript += `          pregather: (req, res, next) => {
            next();
          },\n`
    }

    if (casa.prevalidate) {
        javascript += `          prevalidate: (req, res, next) => {
            next();
          },\n`
    }

    if (casa.postvalidate) {
        javascript += `          postvalidate: (req, res, next) => {
            next();
          },\n`
    }

    if (casa.preredirect) {
        javascript += `          preredirect: (req, res, next) => {
            next();
          },\n`
    }

    javascript += `    },
    replicaSection: '${pageName}'
  };
};`

    return javascript;
}

module.exports = { showJavaScript, buildJavaScript };
},{}],71:[function(require,module,exports){
'use strict'

const buildIfObject = require("./page_builders/if_page.js");
const buildElseifObject = require("./page_builders/elseif_page.js");
const buildAddressObject = require("./page_builders/address_page.js");
const buildPhoneObject = require("./page_builders/phone_page.js");
const buildEmailObject = require("./page_builders/email_page.js");
const buildNameObject = require("./page_builders/name_page.js");
const buildNinoObject = require("./page_builders/nino_page.js");
const buildDateObject = require("./page_builders/date_page.js");
const buildCheckboxArrayObject = require("./page_builders/checkbox_array_page.js");
const buildParagraphObject = require("./page_builders/paragraph_page.js");
const buildErrorSummaryObject = require("./page_builders/error_summary_page.js");
const buildTextInputObject = require("./page_builders/text_input_page.js");
const buildTextAreaObject = require("./page_builders/text_area_page.js");
const buildBankDetailsObject = require("./page_builders/bank_details_page.js");
const buildHeaderObject = require("./page_builders/header_page.js");
const buildRadioGroupObject = require("./page_builders/radio_group_page.js");
const buildBeginHiddenObject = require("./page_builders/begin_hidden_page.js");
const parseFragment = require("./page_builders/fragment_page.js");

const showPage = (casa, topPart, divide) => {
    $(`.field-build`).hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(`.page-build`).show();
    $(`.page-details`).hide();
    $(`.page-neutral`).show();
    $(`#page-output`).remove();
    $(`#summary`).hide();
    let page = buildPage(casa, topPart, divide);
    $(`.page-build`).empty();
    $(`.page-build`).append(`<textarea id="page-output" cols="130" rows="38">${page}</textarea>`);
    window.scrollTo(0, 0);
};

const buildPage = (casa, topPart, divide) => {
        let pageName = `${casa.folder}-${casa[`page-name`]}`;
  let page = ``;
  let firstField = casa.fields[0];

  if (firstField) {
    if (firstField["field-name"] === `top-part`) {
      page += `${firstField.top}\n`;
    } else {
      topPart.forEach(item => {
        page += `${item}\n`;
      })
    }

    page += otherTopParts(casa.fields);
    page += `{% set pageName = "${pageName}" %}\n\n`
    page += `{% block journey_form %}\n`
    page += `{{ super() }}\n\n`

    if (casa.fields) {
      page += buildFields(casa.fields, pageName, divide)
    }

    page = indentPage(page.split('\n')).trim();
  }
  return page;
}

const otherTopParts = (fields) => {
  let other = "";
  let address = false;
  let bankDetails = false;
  fields.forEach(field => {
    if (field[`field-name`] === 'address') {
      address = true;
    };
    if (field[`field-name`] === 'bank-details') {
      bankDetails = true;
    };
  })
  if (address) {
    other += `{% import "cads/macros/cads-address.html" as address %}\n`
  };
  if (bankDetails) {
    other += `{% import "cads/macros/cads-sortCode.html" as sortCode %}\n`
  }
  return other;
};

const buildFields = (fields, pageName, divide) => {
  let fieldData = ``;
  fields.forEach(field => {
    if (divide) {
      fieldData += `============ ${[field["field-name"]]} ============\n`;
    }
    switch (field[`field-name`]) {
      case `address`:
        fieldData += buildAddressObject(pageName, field);
        break;
      case `phone`:
        fieldData += buildPhoneObject(pageName, field);
        break;
      case `email`:
        fieldData += buildEmailObject(pageName, field);
        break;
      case `name`:
        fieldData += buildNameObject(pageName, field);
        break;
      case `nino`:
        fieldData += buildNinoObject(pageName, field);
        break;
      case `date`:
        fieldData += buildDateObject(pageName, field);
        break;
      case `paragraph`:
        fieldData += buildParagraphObject(pageName, field);
        break;
      case `error-summary`:
        fieldData += buildErrorSummaryObject(pageName, field);
        break;
      case `text-input`:
        fieldData += buildTextInputObject(pageName, field);
        break;
      case `text-area`:
        fieldData += buildTextAreaObject(pageName, field);
        break;
      case `bank-details`:
        fieldData += buildBankDetailsObject(pageName, field);
        break;
      case `header`:
        fieldData += buildHeaderObject(pageName, field);
        break;
      case `if`:
        fieldData += buildIfObject(pageName, field);
        break;
      case `elseif`:
        fieldData += buildElseifObject(pageName, field);
        break;
      case `end-hidden`:
        fieldData += `</div>\n\n`
        break;
      case `endif`:
        fieldData += ` {% endif %}\n\n`
        break;
      case `else`:
        fieldData += ` {% else %}\n\n`
        break;
      case `begin-hidden`:
        fieldData += buildBeginHiddenObject(pageName, field);
        break;
      case `radio-group`:
        fieldData += buildRadioGroupObject(pageName, field);
        break;
      case `checkbox-array`:
        fieldData += buildCheckboxArrayObject(pageName, field);
        break;
      case `fragment`:
        fieldData += parseFragment(pageName, field);
        break;
    }
  });

  fieldData += `{% endblock %}`
  return fieldData;
}

const indentPage = data => {
  let b = `        `;
  let block = [];
  let padding = ``;
  let ind = 0;
  let output = ``;

  for (let i = 0; i < 100; i++) {
    block.push(padding);
    padding += b;
  }

  data.forEach(line => {
    line = line.trim();

    if (line.includes(`{% endif`)) {
      ind--;
    } else if (line.includes(`{% else`)) {
      ind--;
    } else if (line.includes(`{% endblock`)) {
      ind--;
    } else if (line.substring(0, 2) === `}}`) {
      ind--;
    } else if (line.substring(0, 5) === `</ul>`) {
      ind--;
    } else if (line.substring(0, 2) === `},`) {
      ind--;
    } else if (line.substring(0, 2) === `%}`) {
      ind--;
    } else if (line.substring(0, 3) === `</p`) {
      ind--;
    } else if (line.substring(0, 6) === `</div>`) {
      ind--;
    } else if (line.includes("| replace")) {
      ind++;
    }

    if (ind < 0) ind = 0;

    if (line === `errors=formErrors`) {
      line += ')'
    }

    output += `${block[ind]}${line}\n`

    if (line.includes(`{% if`)) {
      ind++;
    } else if (line.includes(`{% else`)) {
      ind++;
    } else if (line.includes(`{% block`)) {
      ind++;
    } else if (line.includes(`{% call`)) {
      ind++;
    } else if (line.includes(`options = {`)) {
      ind++;
    } else if (line.includes(`{{ form`)) {
      ind++;
    } else if (line.includes(`{{ address`)) {
      ind++;
    } else if (line.substring(0, 2) === `<p`) {
      ind++;
    } else if (line.substring(0, 3) === `<ul`) {
      ind++;
    } else if (line.substring(0, 4) === `<div`) {
      ind++;
    } else if (line.includes("| replace")) {
      ind--;
    }
  })

  return output;
}

module.exports = { showPage, buildPage };
},{"./page_builders/address_page.js":50,"./page_builders/bank_details_page.js":51,"./page_builders/begin_hidden_page.js":52,"./page_builders/checkbox_array_page.js":53,"./page_builders/date_page.js":54,"./page_builders/elseif_page.js":55,"./page_builders/email_page.js":56,"./page_builders/error_summary_page.js":57,"./page_builders/fragment_page.js":58,"./page_builders/header_page.js":59,"./page_builders/if_page.js":60,"./page_builders/name_page.js":61,"./page_builders/nino_page.js":62,"./page_builders/paragraph_page.js":64,"./page_builders/phone_page.js":65,"./page_builders/radio_group_page.js":66,"./page_builders/text_area_page.js":67,"./page_builders/text_input_page.js":68}],72:[function(require,module,exports){
'use strict'

const address_validators = require("./validation_builders/address_validators");
const date_validators = require("./validation_builders/date_validators");
const email_validators = require("./validation_builders/email_validators");
const name_validators = require("./validation_builders/name_validators");
const nino_validators = require("./validation_builders/nino_validators");
const phone_validators = require("./validation_builders/phone_validators");
const textInput_validators = require("./validation_builders/textInput_validators");
const bankDetails_validators = require("./validation_builders/bankDetails_validators");
const radioGroup_validators = require("./validation_builders/radioGroup_validators");
const checkboxArray_validators = require("./validation_builders/checkboxArray_validators");

const showValidators = (casa, divide) => {
    $(".field-build").hide();
    $(`#field-input-area`).hide();
    $(`#show-all`).hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    $(`#summary`).hide();
    let validators = buildValidators(casa, divide);
    $(`.page-build`).empty();
    $(".page-build").append(`<textarea id="page-output" cols="130" rows="38">${validators}</textarea>`);
    window.scrollTo(0, 0);
}

const buildValidators = (casa, divide) => {
    let tag;
    let pageName = casa["page-name"];
    let top = buildTopSection(casa.fields);
    let validators = top + `const fieldValidators = {`

    casa.fields.forEach(field => {
        let tag = field.tag;
        if (divide) {
            validators += `\n\n============ ${[field["field-name"]]} ============`;
        }
        switch (field["field-name"]) {
            case 'address':
                validators += address_validators(pageName, tag);
                break;
            case 'phone':
                validators += phone_validators(pageName, tag);
                break;
            case 'email':
                validators += email_validators(pageName, tag);
                break;
            case 'name':
                validators += name_validators(pageName, tag);
                break;
            case 'nino':
                validators += nino_validators(pageName, tag);
                break;
            case 'date':
                validators += date_validators(pageName, tag);
                break;
            case 'radio-group':
                validators += radioGroup_validators(pageName, field);
                break;
            case 'text-input':
                validators += textInput_validators(pageName, field);
                break;
            case 'bank-details':
                validators += bankDetails_validators(pageName, tag);
                break;
            case 'checkbox-array':
                validators += checkboxArray_validators(pageName, field);
                break;
        }
    })

    validators = validators.substring(0, validators.length - 1);

    validators += `\n};\n\nmodule.exports = fieldValidators;`

    return validators;
}

const buildTopSection = (fields) => {
    let top = `
const Validation = require('govuk-casa/lib/Validation');
const r = Validation.rules;
const sf = Validation.SimpleField;\n`
    fields.forEach(field => {
        switch (field["field-name"]) {
            case 'address':
                top += `const addressValidation = require('ui-citizen-casa-extensions/app/custom-validators/cadsAddress');\n`
                break;
            case 'bank-details':
                top += `const bankDetailsValidation = require('ui-citizen-casa-extensions/app/custom-validators/cadsSortCode');\n`
            case 'phone':
            case 'text-area':
            case 'text-input':
                top += `const regexDefinitions = require('ui-citizen-casa-extensions/app/helpers/regexDefinitions');\n`
                break;
            case 'email':
                top += `const emailFormatValidator = require('ui-citizen-casa-extensions/app/custom-validators/emailFormatValidator');\n`
                top += `const emailValidator = require('../../../custom-validators/emailMatchValidator');\n`
                break;
            case 'nino':
                top += `const ninoValidation = require('../../../custom-validators/cadsNino');\n`
                top += `const cadsNinoValidation = require('ui-citizen-casa-extensions/app/custom-validators/cadsNinoValidator');\n`
                break
        }
    })
    return top + '\n';
}

module.exports = { showValidators, buildValidators };
},{"./validation_builders/address_validators":73,"./validation_builders/bankDetails_validators":74,"./validation_builders/checkboxArray_validators":75,"./validation_builders/date_validators":76,"./validation_builders/email_validators":77,"./validation_builders/name_validators":78,"./validation_builders/nino_validators":79,"./validation_builders/phone_validators":80,"./validation_builders/radioGroup_validators":81,"./validation_builders/textInput_validators":82}],73:[function(require,module,exports){
'use strict'

const address_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    addressValidation.bind({
      maxAddressLength: 36,
      maxPostcodeLength: 20,
      errorMsgAddress1and2: {
        'inline': '${pageName}:${tag}.validation.errorMsgAddress1and2.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgAddress1and2.summary'
      },
      errorMsgPostcode: {
        'inline': '${pageName}:${tag}.validation.errorMsgPostcode.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgPostcode.summary'
      },
      errorMsgPostcodeRegex: {
        'inline': '${pageName}:${tag}.validation.errorMsgPostcodeRegex.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgPostcodeRegex.summary'
      },
      invalidRegexAddress: {
        'inline': '${pageName}:${tag}.validation.invalidRegexAddress.inline',
        'summary': '${pageName}:${tag}.validation.invalidRegexAddress.summary'
      },
      mandatoryAndRegexErrors: {
        'inline': '${pageName}:${tag}.validation.mandatoryAndRegexErrors.inline',
        'summary': '${pageName}:${tag}.validation.mandatoryAndRegexErrors.summary'
      },
      errorMsgAddressTooLong: {
        'inline': '${pageName}:${tag}.validation.errorMsgAddressTooLong.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgAddressTooLong.summary'
      },
      errorMsgPostcodeTooLong: {
        'inline': '${pageName}:${tag}.validation.errorMsgPostcodeTooLong.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgPostcodeTooLong.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = address_validators;
},{}],74:[function(require,module,exports){
'use strict'

const bankDetails_validators = (pageName, tag) => {


    let validators = `
 accountHolderName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.accountHolderName.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.accountHolderName.validation.mandatorySummary'
      }
    }),
    r.strlen.bind({
      max: 60,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.accountHolderName.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.accountHolderName.validation.tooLong.summary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:bankAccount.accountHolderName.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.accountHolderName.validation.invalidCharsSummary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  bankName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.bankName.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.bankName.validation.mandatorySummary'
      }
    }),
    r.strlen.bind({
      max: 60,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.bankName.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.bankName.validation.tooLong.summary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:bankAccount.bankName.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.bankName.validation.invalidCharsSummary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  sortCode: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.sortCode.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.sortCode.validation.mandatorySummary'
      }
    }),
    sortCodeValidation.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.sortCode.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.sortCode.validation.invalidCharsSummary'
      },
      invalidLengthErrorMsg: {
        inline: '${pageName}:bankAccount.sortCode.validation.invalidLengthInline',
        summary: '${pageName}:bankAccount.sortCode.validation.invalidLengthSummary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  accountNumber: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.accountNumber.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.accountNumber.validation.mandatorySummary'
      }
    }),
    r.strlen.bind({
      max: 10,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.accountNumber.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.accountNumber.validation.tooLong.summary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.NUMBER_REGEX,
      errorMsg: {
        inline: '${pageName}:bankAccount.accountNumber.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.accountNumber.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      min: 6,
      errorMsgMin: {
        inline: '${pageName}:bankAccount.accountNumber.validation.fieldLengthInline',
        summary: '${pageName}:bankAccount.accountNumber.validation.fieldLengthSummary'
      }
    })

  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  rollNumber: sf([
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:bankAccount.rollNumber.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.rollNumber.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 18,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.rollNumber.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.rollNumber.validation.tooLong.summary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),`

    return validators;
}

module.exports = bankDetails_validators;
},{}],75:[function(require,module,exports){
'use strict'

const checkboxArray_validators = (pageName, field) => {
 let tag = field.tag;
  let boxes = field.boxes;
  let source = `source: [`;

  for (let i = 0; i < boxes.length; i++) {
    if (i === boxes.length - 1) {
      source += `"${boxes[i][1]}"`;
    } else {
      source += `"${boxes[i][1]}", `;
    }
  }
  source += `],`

  let validators = `
    breaksSinceCareStarted: sf([
    yourBreaksValidator,
    r.inArray.bind({
      ${source}
      errorMsg: {
        inline: '${pageName}:${tag}.validation.inArray.inline',
        summary: '${pageName}:${tag}.validation.inArray.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = checkboxArray_validators;
},{}],76:[function(require,module,exports){
'use strict'

const date_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:${tag}.validation.mandatory.inline',
        summary: '${pageName}:${tag}.validation.mandatory.summary'
      }
    }),
    r.dateObject.bind({
      errorMsg: {
        inline: ${tag}.validation.inline.mapping,
        summary: ${tag}.validation.summary.mapping
      },
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      afterOffsetFromNow: moment.duration(-(moment().diff([1899, 11, 31], 'days')), 'days'),
      errorMsgAfterOffset: {
        inline: ${tag}.validation.inline.mapping,
        summary: ${tag}.validation.summary.mapping
      },
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsgBeforeOffset: {
        inline: ${tag}.validation.inline.mapping,
        summary: ${tag}.validation.summary.mapping
      }
    })
  ]),`
    return validators;
}

module.exports = date_validators;
},{}],77:[function(require,module,exports){
'use strict'

const email_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        'inline': '${pageName}:${tag}.validation.inline',
        'summary': '${pageName}:${tag}.validation.summary'
      }
    }),
    r.inArray.bind({
      source: ['Yes', 'No'],
      errorMsg: {
        'inline': '${pageName}:${tag}.inArray.inline',
        'summary': '${pageName}:${tag}.inArray.summary'
      }
    })
  ]),
  emailAddress: sf([
    r.email.bind({
      errorMsg: {
        inline: '${pageName}:emailDetails.emailAddress.validation.inline',
        summary: '${pageName}:emailDetails.emailAddress.validation.summary'
      }
    }),
    emailFormatValidator.bind({
      errorMsg: {
        inline: '${pageName}:emailDetails.emailAddress.validation.notifyEmailValidation.inline',
        summary: '${pageName}:emailDetails.emailAddress.validation.notifyEmailValidation.summary'
      }
    })
  ], (formtag) => {
    return formtag.${tag} === 'Yes';
  }),
  confirmEmailAddress: sf([
    emailValidator.bind({
      errorMsg: {
        inline: '${pageName}:emailDetails.confirmEmailAddress.validation.match.inline',
        summary: '${pageName}:emailDetails.confirmEmailAddress.validation.match.summary'
      }
    })
  ], (formtag) => {
    return formtag.emailConfirmationWanted === 'Yes';
  }),`

    return validators;
}

module.exports = email_validators;
},{}],78:[function(require,module,exports){
'use strict'

const name_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.validation.mandatoryInline',
        summary: '${pageName}.${tag}.validation.mandatorySummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}.${tag}.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.validation.tooLong.summary'
      }
    })
  ]),
  .${tag}.FirstName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.validation.mandatoryInline',
        summary: '${pageName}.${tag}.FirstName.validation.mandatorySummary'
      }
    }),
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.FirstName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}.${tag}.FirstName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.FirstName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}.${tag}.FirstName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}.${tag}.FirstName.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.FirstName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.FirstName.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.FirstName.validation.tooLong.summary'
      }
    })
  ]),
  .${tag}.MiddleName: sf([
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.MiddleName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}.${tag}.MiddleName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.MiddleName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}.${tag}.MiddleName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}.${tag}.MiddleName.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.MiddleName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.MiddleName.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.MiddleName.validation.tooLong.summary'
      }
    })
  ]),
  .${tag}.LastName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.mandatoryInline',
        summary: '${pageName}.${tag}.LastName.validation.mandatorySummary'
      }
    }),
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}.${tag}.LastName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}.${tag}.LastName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.LastName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.LastName.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.LastName.validation.tooLong.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = name_validators;
},{}],79:[function(require,module,exports){
'use strict'

const nino_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:${tag}.validation.mandatoryInline',
        summary: '${pageName}:${tag}.validation.mandatorySummary'
      }
    }),
    cadsNinoValidation.bind({
      errorMsg: {
        inline: '${pageName}:${tag}.validation.invalidNinoInline',
        summary: '${pageName}:${tag}.validation.invalidNinoSummary'
      }
    }),
    ninoValidation.bind({
      duplicateNinoPartner: {
        inline: '${pageName}:${tag}.validation.duplicateNinoPartner.inline',
        summary: '${pageName}:${tag}.validation.duplicateNinoPartner.summary'
      },
      duplicateNinoCaree: {
        inline: '${pageName}:${tag}.validation.duplicateNinoCaree.inline',
        summary: '${pageName}:${tag}.validation.duplicateNinoCaree.summary'
      }
    }),
    r.strlen.bind({
      max: 19,
      errorMsgMax: {
        'inline': '${pageName}:${tag}.validation.tooLong.inline',
        'summary': '${pageName}:${tag}.validation.tooLong.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = nino_validators;
},{}],80:[function(require,module,exports){
'use strict'

const phone_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.optional,
    r.regex.bind({
      pattern: regexDefinitions.TELEPHONE_REGEX,
      errorMsg: {
        'inline': '${pageName}:${tag}.validation.errorMsg.inline',
        'summary': '${pageName}:${tag}.validation.errorMsg.summary'
      }
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: {
        'inline': '${pageName}:${tag}.validation.tooLong.inline',
        'summary': '${pageName}:${tag}.validation.tooLong.summary'
      }
    })
  ]),`

    return validators;
}

module.exports = phone_validators;
},{}],81:[function(require,module,exports){
'use strict'

const radioGroup_validators = (pageName, field) => {

    let tag = field.tag;
    let buttons = field.buttons;
    let source = `source: [`;

    for (let i = 0; i < buttons.length; i++) {
        if (i === buttons.length - 1) {
            source += `"${buttons[i][1]}"`;
        } else {
            source += `"${buttons[i][1]}", `;
        }
    }

    source += `],`

    let validators = `
    ${tag}: sf([
      r.required.bind({
        errorMsg: {
          inline: '${pageName}:${tag}.validation.mandatory.inline',
          summary: '${pageName}:${tag}.validation.mandatory.summary'
        }
      }),
      r.inArray.bind({
        ${source}
        errorMsg: {
          summary: '${pageName}:${tag}.validation.inArray.summary',
          inline: '${pageName}:${tag}.validation.inArray.inline'
        }
      })
    ]),`


    return validators;
}

module.exports = radioGroup_validators;
},{}],82:[function(require,module,exports){
'use strict'

const textInput_validators = (pageName, field) => {
    let tag = field.tag;

    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${tag}:${tag}.validation.conditionalMandatoryInline',
        summary: '${pageName}:${tag}.validation.conditionalMandatorySummary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:${tag}.validation.invalidRegexInline',
        summary: '${pageName}:${tag}.validation.invalidRegexSummary'
      }
    }),
    r.strlen.bind({
      max: 60,
      errorMsgMax: {
        inline: '${pageName}:${tag}.validation.tooLongInline',
        summary: '${pageName}:${tag}.validation.tooLongSummary'
      }
    })
  ], (formData) => {
    return formData.areYouTheCarer === 'No';
  }),`
    return validators;
}

module.exports = textInput_validators;
},{}],83:[function(require,module,exports){
(function (global){
(function(a,b){if("function"==typeof define&&define.amd)define([],b);else if("undefined"!=typeof exports)b();else{b(),a.FileSaver={exports:{}}.exports}})(this,function(){"use strict";function b(a,b){return"undefined"==typeof b?b={autoBom:!1}:"object"!=typeof b&&(console.warn("Deprecated: Expected third argument to be a object"),b={autoBom:!b}),b.autoBom&&/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(a.type)?new Blob(["\uFEFF",a],{type:a.type}):a}function c(b,c,d){var e=new XMLHttpRequest;e.open("GET",b),e.responseType="blob",e.onload=function(){a(e.response,c,d)},e.onerror=function(){console.error("could not download file")},e.send()}function d(a){var b=new XMLHttpRequest;b.open("HEAD",a,!1);try{b.send()}catch(a){}return 200<=b.status&&299>=b.status}function e(a){try{a.dispatchEvent(new MouseEvent("click"))}catch(c){var b=document.createEvent("MouseEvents");b.initMouseEvent("click",!0,!0,window,0,0,0,80,20,!1,!1,!1,!1,0,null),a.dispatchEvent(b)}}var f="object"==typeof window&&window.window===window?window:"object"==typeof self&&self.self===self?self:"object"==typeof global&&global.global===global?global:void 0,a=f.saveAs||("object"!=typeof window||window!==f?function(){}:"download"in HTMLAnchorElement.prototype?function(b,g,h){var i=f.URL||f.webkitURL,j=document.createElement("a");g=g||b.name||"download",j.download=g,j.rel="noopener","string"==typeof b?(j.href=b,j.origin===location.origin?e(j):d(j.href)?c(b,g,h):e(j,j.target="_blank")):(j.href=i.createObjectURL(b),setTimeout(function(){i.revokeObjectURL(j.href)},4E4),setTimeout(function(){e(j)},0))}:"msSaveOrOpenBlob"in navigator?function(f,g,h){if(g=g||f.name||"download","string"!=typeof f)navigator.msSaveOrOpenBlob(b(f,h),g);else if(d(f))c(f,g,h);else{var i=document.createElement("a");i.href=f,i.target="_blank",setTimeout(function(){e(i)})}}:function(a,b,d,e){if(e=e||open("","_blank"),e&&(e.document.title=e.document.body.innerText="downloading..."),"string"==typeof a)return c(a,b,d);var g="application/octet-stream"===a.type,h=/constructor/i.test(f.HTMLElement)||f.safari,i=/CriOS\/[\d]+/.test(navigator.userAgent);if((i||g&&h)&&"object"==typeof FileReader){var j=new FileReader;j.onloadend=function(){var a=j.result;a=i?a:a.replace(/^data:[^;]*;/,"data:attachment/file;"),e?e.location.href=a:location=a,e=null},j.readAsDataURL(a)}else{var k=f.URL||f.webkitURL,l=k.createObjectURL(a);e?e.location=l:location.href=l,e=null,setTimeout(function(){k.revokeObjectURL(l)},4E4)}});f.saveAs=a.saveAs=a,"undefined"!=typeof module&&(module.exports=a)});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
