'use strict'

const buildHeader = () => {
    let hdr_fieldID = codes[0];
    codes.shift();
    let prefix = `${hdr_fieldID}-header`;
    let headerSize = buildHeaderSize(prefix);
    let hdr = buildhdrTop(prefix, 'Header', 'header', headerSize);
    hdr += `</div></div></div>`
    $(`.field-build`).append(hdr);
    $(`#${prefix}-show`).hide();
    return hdr;
}

const buildHeaderSize = (prefix) => {
    let headerSize = `<div class="row header-size" id="${prefix}-headersize">
    <div class="col-md-2 right-justify">Header Size&nbsp;&nbsp;</div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h1" name="size">&nbsp;&nbsp;H1</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h2" name="size">&nbsp;&nbsp;H2</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h3" name="size" checked>&nbsp;&nbsp;H3</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h4" name="size">&nbsp;&nbsp;H4</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h5" name="size">&nbsp;&nbsp;H5</label></div>
    <div class="col"><label class="radio-inline"><input type="radio" id="${prefix}-h6" name="size">&nbsp;&nbsp;H6</label></div>
    <div class="col"><button class="${BTN} delete-btn" id="${prefix}-delete-btn">Delete</button></div>
  </div>`
    return headerSize;
};

const buildhdrTop = (prefix, fieldType, type, headerSize) => {
    let top = `<div id="${prefix}" class="field ${type}">`;

    top += `<div class="row">`
    top += `<div class="col-md-1 field-type" data-toggle="collapse" data-target="#${prefix}-details">${fieldType}</div>`
    top += `<div class="col-md-1">Data:</div>`
    top += `<div class="col" id="${prefix}-text-form-data">`
    top += `<input type="text" id="${prefix}-text-form-data-value" size="40" />`
    top += `</div>`
    top += `<div class="col-md-4"></div>`
    top += `<div class="col-md-1 arrows">`
    top += `<i class="fa fa-arrow-up" id="${prefix}-up"></i>&nbsp`
    top += `<i class="fa fa-arrow-down" id="${prefix}-down"></i>`
    top += `</div>`
    top += `<div class="col"></div>`
    top += `</div>` // end of row

    top += `<div id="${prefix}-details" class="collapse show">`

    top += `<div class="row">`
    top += `<div class="col-md-1"></div>`
    top += `<div class="col-md-1">Header:</div>`
    top += `<div class="col" id="${prefix}-text-form-header">`
    top += `<input type="text" id="${prefix}-text-header-value" size="80" />`
    top += `</div>`
    top += `<div class="col"></div>`
    top += `</div>` // end of row
    top += headerSize;

    top += `</div>` // end of row
    return top;
}