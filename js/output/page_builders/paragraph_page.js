'use strict'

const buildParagraphObject = (pageName, field) => {
    let tag = field.tag;
    let paragraph = field.paragraph;
    let paraSplit = paragraph.split("\n");
    let paragraphObject = `<p>\n`;

    let lineCnt = 1;

    paraSplit.forEach(line => {
        line = line.trim();
        paragraphObject += `{{ t('${pageName}:${tag}.line${lineCnt}') }}\n`
        lineCnt++;
    })

    paragraphObject += `</p>,\n\n`

    return paragraphObject;
}

module.exports = buildParagraphObject;