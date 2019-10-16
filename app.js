`use strict`

const { save_file, file_list, delete_file, load_casa, build_display } = require("./js/input_output/file_handler")
const { buildCodes, getCode } = require("./js/codes");
const buildTopPart = require("./js/fields/top_part");
const buildBeginHidden = require("./js/fields/begin_hidden");
const buildEndHidden = require("./js/fields/end_hidden");
const buildAddress = require("./js/fields/address");
const buildFragment = require("./js/fields/fragment");
const buildIf = require("./js/fields/if");
const buildElse = require("./js/fields/else");
const buildElseIf = require("./js/fields/elseif");
const buildEndIf = require("./js/fields/endif");
const buildHeader = require("./js/fields/header");
const buildName = require("./js/fields/name");
const buildNino = require("./js/fields/nino");
const buildParagraph = require("./js/fields/paragraph");
const buildErrorSummary = require("./js/fields/error_summary");
const buildTextInput = require("./js/fields/text_input");
const buildPhoneNumber = require("./js/fields/phone_number");
const buildDate = require("./js/fields/date");
const buildEmail = require("./js/fields/email");
const { buildCheckboxArray } = require("./js/fields/checkbox_array");
const { buildRadioGroup } = require("./js/fields/radio_group");
const buildData = require("./js/output/build_data");
const { showPage } = require("./js/output/show_page");
const { showJSON } = require("./js/output/show_JSON");
const { showValidators } = require("./js/output/show_validators");
const { showJavaScript } = require("./js/output/show_javascript");
const exportFiles = require(`./js/input_output/export`);

let topPart = [
    `{% extends "cads/layouts/journey-claim.html" %}`,
    `{% import "casa/macros/form.html" as form %}`
];

const buildTopPartDisplay = () => {
    let tp = `<div class="row"><div class="col"><h6>Default Top Part:</h6><div></div>`

    topPart.forEach(item => {
        tp += `<div class="row"><div class="col">${item}</div></div>`
    })

    tp += `<br><br><br>`
    tp += `<div class="row"><div class="col">Use the "Top Part" field to override these defaults.</div></div>`

    $(`#top-parts`).append(tp);
}

const initView = () => {
    $(`.page-build`).hide();
    $(`.page-neutral`).hide();
    $(`.json-build`).hide();
    $(`.validator-build`).hide();
    $(`.javascript-build`).hide();
    $(`#file-display`).hide();
}

const flipView = () => {
    $(`.field-build`).show();
    $(`.page-details`).show();
    $(`#main-display`).show();
    $(`#summary`).show();
    $(`.page-build`).hide();
    $(`.page-neutral`).hide();
    $(`.json-build`).hide();
    $(`.validator-build`).hide();
    $(`.javascript-build`).hide();
    $(`#file-display`).hide();
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
    build_display(casa);
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
        build_display(casa);
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
        build_display(casa);
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
            flipView();
        } else if (id.includes("element-btn")) {
            changeSelection(id);
        } else if ($(`#${id}`).hasClass(`delete-btn`)) {
            deleteButton(id);
        } else if ($(`#${id}`).hasClass(`load-btn`)) {
            load_casa(id);
        } else if ($(`#${id}`).hasClass(`del-file-btn`)) {
            delete_file(id);
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

$(
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
        switch (e.target.id) {
            case `top-part`:
                buildTopPart();
                break;
            case `else`:
                buildElse();
                break;
            case `if`:
                buildIf();
                break;
            case `elseif`:
                buildElseIf();
                break;
            case `endif`:
                buildEndIf();
                break;
            case `begin-hidden`:
                buildBeginHidden();
                break;
            case `end-hidden`:
                buildEndHidden();
                break;
            case `radio-group`:
                buildRadioGroup();
                break;
            case `date`:
                buildDate();
                break;
            case `email`:
                buildEmail();
                break;
            case `checkbox-array`:
                buildCheckboxArray();
                break;
            case `phone`:
                buildPhoneNumber();
                break;
            case `name`:
                buildName();
                break;
            case `address`:
                buildAddress();
                break;
            case `nino`:
                buildNino();
                break;
            case `fragment`:
                buildFragment();
                break;
            case `paragraph`:
                buildParagraph();
                break;
            case `errorSummary`:
                buildErrorSummary();
                break;
            case `textInput`:
                buildTextInput();
                break;
            case `header`:
                buildHeader();
                break;
        }
    }),
    $("#show-all").click(() => {
        showAll();
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
        save_file();
    }),
    $(`#file-list`).click(() => {
        file_list()
    }),
    $(`#export`).click(() => {
        let casa = buildData();
        exportFiles(casa, topPart);
    }),
    $("body").keyup((e) => {
        keyUp(e)
    }),
    $("body").click((e) => {
        bodyClick(e);
    }),
    buildTopPartDisplay()
);