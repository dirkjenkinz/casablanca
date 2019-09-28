'use strict'

const buildName = () => {
    let name_fieldID = codes[0];
    codes.shift();
    let prefix = `${name_fieldID}-name`;
    name = buildTopOfField(prefix, 'Name', 'name');
    name += `</div></div></div>`
    $(`.field-build`).append(name);
    $(`#${prefix}-show`).hide();
    return name;
}