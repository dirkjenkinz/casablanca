const exportFiles = (casa) => {
  console.log('export!')
  let folder =  casa.folder || "defaultfolder";
  let fileName = casa["page-name"] || "defaultfn";
  let page = buildPage(casa)
  let javaScript = buildJavaScript(casa);
  let json = buildJSON(casa);
  console.log(json)
  let validators = buildValidators(casa);
  download(`app/views/pages/${folder}/${fileName}.html`, page)
  download(`app/definitions/pages/${fileName}.js`, javaScript)
  download(`app/definitions/field-validators/${folder}/${fileName}.js`, validators)
  download(`app/locales/en/${fileName}.json`, json)
};

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}