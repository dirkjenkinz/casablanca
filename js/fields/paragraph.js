'use strict'

const buildParagraph = () => {
    let paragraph_fieldID = codes[0];
    codes.shift();
    let prefix = `${paragraph_fieldID}-paragraph`;
    let paragraph = buildParagraphTop(prefix, 'Paragraph', 'paragraph');
    paragraph += `</div></div></div>`
    $(`.field-build`).append(paragraph);
    $(`#${prefix}-show`).hide();
    return paragraph;
}

const buildParagraphTop = (prefix, fieldType, type) => {
    let top = `<div id="${prefix}" class="field ${type}">`;

    top += `<div class="row">`
    top += `<div class="col-md-1 field-type" data-toggle="collapse" data-target="#${prefix}-details">${fieldType}</div>`
    top += `<div class="col-md-1">Data:</div>`
    top += `<div class="col" id="${prefix}-text-form-data">`
    top += `<input type="text" id="${prefix}-text-form-data-value" size="40" />`
    top += `</div>`
    top += `<div class="col-md-1 arrows">`
    top += `<i class="fa fa-arrow-up" id="${prefix}-up"></i>&nbsp`
    top += `<i class="fa fa-arrow-down" id="${prefix}-down"></i>`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row

    top += `<div id="${prefix}-details" class="collapse show">`
    top += `<div class="row">`
    top += `<div class="col-md-2"></div>`
    top += `<div class="col">`
    top += `<textarea id="${prefix}-textarea" cols="80" rows="10"  class="para-text"></textarea>`
    top += `</div>`
    top += `<div class="col-md-1">`
    top += `<br/><br/>`
    top += `<button class="${BTN} delete-btn" id="${prefix}-delete-btn">Delete</button>`
    top += `</div>`
    top += `<div class="col-md-1"></div>`
    top += `</div>` // end of row
    return top;
}