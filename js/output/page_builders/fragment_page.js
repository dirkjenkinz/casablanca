'use strict'

const parseFragment = (pageName, field) => {
    let tag = field.tag;
    let frag = field.fragment;
    let start;
    let end;
    let cnt = 0;

    do {
        cnt++
        start = frag.indexOf(`<=`);
        end = frag.indexOf(`=>`);
        if (start > -1 && end > -1) {
            let subFrag = frag.substring(start + 2, end).trim();
            let varName = subFrag.substring(0, subFrag.indexOf(`=`)).trim();
            let newText = `{{ t("${pageName}:${tag}.${varName}) }}`
            let oldText = frag.substring(start, end + 2);
            frag = frag.replace(oldText, newText)
        }
    } while (start > -1 && end > -1 && cnt < 500);
    return `${frag},\n\n`;
}

module.exports = parseFragment;