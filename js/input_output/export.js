'use strict'

const fs = require('browserify-fs');

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