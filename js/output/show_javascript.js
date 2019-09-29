'use strict'

const showJavaScript = (casa) => {
    $(".field-build").hide();
    $(".page-build").show();
    $(".page-details").hide();
    $(".page-neutral").show();
    $("#page-output").remove();
    let javaScript = buildJavaScript(casa)
    $(".page-build").append(`<textarea id="page-output" cols="100" rows="30">${javaScript}</textarea>`);
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
          },`


    if (casa.prevalidate) {
        javascript += `prevalidate: (req, res, next) => {
            next();
          },`
    }

    if (casa.postvalidate) {
        javascript += `postvalidate: (req, res, next) => {
            next();
          },`
    }

    javascript += `},
    replicaSection: '${pageName}'
  };
};`

    return javascript;
}