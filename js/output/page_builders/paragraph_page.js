'use strict'

const buildParagraphObject = (pageName, field) => {
  let tag = field.tag;
  let paragraph = field.paragraph;
  let paraSplit = paragraph.split("\n");
  let paragraphObject = `<p>\n`;

  let lineCnt = 1;

  paraSplit.forEach(line => {
    line = line.trim();
    if (line.substring(0, 2) === "<=" || line.substring(line.length - 2) === "=>") {
      paragraphObject += parseLine(line, pageName)
    } else if (line.length > 0) {
      paragraphObject += `{{ t('${pageName}:${tag}.line${lineCnt}') }}\n`
      lineCnt++;
    }
  })

  paragraphObject += `</p>,\n\n`

  return paragraphObject;
}

const parseLine = (line, pageName) => {

  if (line.substring(0, 4) !== `<=ul` && line !== `<ul=>`) {
    let start = line.indexOf(`>`) + 1;
    let end = line.indexOf('<', start);
    let midLine = line.substring(start, end).split("=");
    line = line.replace(midLine[1], "").trim();

    start = line.indexOf(`>`) + 1;
    end = line.indexOf('=', start) + 1;
    midLine = line.substring(start, end);
    let newLine = `{{ t("${pageName}:${midLine.substring(0, midLine.length - 1).trim()}") }}`
    line = line.replace(midLine, newLine).trim();
  }

  line = line.replace(`<=h3`, `<h3 class="heading-medium"`);
  line = line.replace('<=ul', `<ul class="list-bullet"`);
  line = line.replace(`<=li`, `<li`);
  line = line.replace(`ul=>`, `/ul>`);
  line = line.replace(`h3=>`, `/h3>`);
  line = line.replace(`li=>`, `/li>`);

  return line + "\n";
}

module.exports = buildParagraphObject;