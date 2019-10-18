'use strict'

const paragraph_JSON = (field) => {
    let tag = field.tag;
    let paragraph = field.paragraph;
    let paraSplit = paragraph.split("\n");
    let json = "";

    let lineCnt = 1;

    paraSplit.forEach(line => {
        line = line.trim();
        json += `"${tag}.line${lineCnt}":"${line}",\n`
        lineCnt++;
    });

    json += `\n\n`;

    return json;
}

module.exports = paragraph_JSON;