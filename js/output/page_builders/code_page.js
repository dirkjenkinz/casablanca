'use strict'

const parseCode = (pageName, field) => {
    let tag = field.tag;
    let code = field.code;
    let start;
    let end;
    let cnt = 0;

    do {
        cnt++
        start = code.indexOf(`<=`);
        end = code.indexOf(`=>`);
        if (start > -1 && end > -1) {
            let subCode = code.substring(start + 2, end).trim();
            let varName = subCode.substring(0, subCode.indexOf(`=`)).trim();
            let newText = `{{ t("${pageName}:${tag}.${varName}) }}`
            let oldText = code.substring(start, end + 2);
            code = code.replace(oldText, newText)
        }
    } while (start > -1 && end > -1 && cnt < 500);
    return `${code},\n\n`;
}

module.exports = parseCode;