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