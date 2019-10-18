`use strict`

const { save_file, file_list } = require("./js/input_output/file_handler")
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
const { initView, bodyClick, buildTopPartDisplay, keyUp, topPart, showAll } = require("./js/control");

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