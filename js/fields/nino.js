'use strict'

const buildNino = () => {
    let nino_fieldID = codes[0];
    codes.shift();
    let prefix = `${nino_fieldID}-nino`;
    let nino = buildTopOfField(prefix, 'NINO', 'nino')
    nino += `</div></div></div>`
    $(`.field-build`).append(nino);
    $(`#${prefix}-show`).hide();
    return nino;
}