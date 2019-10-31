'use strict'

const buildParagraphObject = (pageName, field) => {
    let tag = field.tag;
    let parsed = parseVariables(pageName, field.paragraph, tag)
    let paraSplit = parsed.split("\n");
    let paragraphObject = `<p>\n`;
    let lineCnt = 1;

    paraSplit.forEach(line => {
        line = line.trim();
        if (line.substring(0, 2) === '<h' ||
            line.substring(0, 3) === '<ul' ||
            line.substring(0, 3) === '<li' ||
            line.substring(0, 4) === '</ul') {
            paragraphObject += `${line}\n`;
        } else {
            paragraphObject += `{{ t('${pageName}:${tag}.line${lineCnt}') }}\n`
            lineCnt++;
        }
    })
    paragraphObject += `</p>,\n\n`

    return paragraphObject;
}

const parseVariables = (pageName, paragraph, tag) => {
    let start;
    let end;
    let cnt = 0;

    do {
        cnt++
        start = paragraph.indexOf(`<=`);
        end = paragraph.indexOf(`=>`);

        if (start > -1 && end > -1) {
            let subFrag = paragraph.substring(start + 2, end).trim();
            let varName = subFrag.substring(0, subFrag.indexOf(`=`)).trim();
            let newText = `{{ t("${pageName}:${tag}.${varName}) }}`
            let oldText = paragraph.substring(start, end + 2);
            paragraph = paragraph.replace(oldText, newText)
        }
    } while (start > -1 && end > -1 && cnt < 500);

    return paragraph;
}

module.exports = buildParagraphObject;