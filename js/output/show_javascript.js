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