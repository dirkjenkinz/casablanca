`use strict`

const { buildElement } = require("./js/fields/build_element");
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
const buildFieldsContent = require(`./js/buildFieldsContent`);

$(
  buildFieldsContent(),
  $(window).keydown(function (event) {
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
      let hidden = 0;
      let msg = ``;
      let children = $("#elements").children();
      for (let i = 0; i < children.length; i++) {
        if (children[i].id.includes(`begin-hidden`)) {
          hidden++;
        } else if (children[i].id.includes(`end-hidden`)) {
          hidden--;
          if (hidden < 0) {
            msg = `WARNING: Hidden field(s) terminated but not begun`;
          }
        }
      }
      if (msg === `` && hidden > 0) {
        msg = `WARNING: Hidden field(s) begun but not terminated`;
      }
      $(`#message-box`).text(msg);
    }
    bodyClick(e);
  }),
  buildTopPartDisplay()
);