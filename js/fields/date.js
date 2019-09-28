'use strict'

const buildDate = () => {
    let fieldID = codes[0];
    codes.shift();
    let prefix = `${fieldID}-date`;
    let date = buildTopOfField(prefix, 'Date', 'date');
    date += `</div></div></div>`
    $(`.field-build`).append(date);
    $(`#${prefix}-show`).hide();
    return date;
}