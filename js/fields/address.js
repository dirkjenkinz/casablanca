'use strict'

const buildAddress = () => {
    let address_fieldID = codes[0];
    codes.shift();
    let prefix = `${address_fieldID}-address`;
    let address = buildTopOfField(prefix, 'Address', 'address');
    address += buildInputRow('Error Lines 1 & 2', `${prefix}-error1`);
    address += buildInputRow('Invalid Regex', `${prefix}-error2`);
    address += buildInputRow('Mandatory & Regex Errors', `${prefix}-error3`);
    address += `</div></div></div>`
    $(`.field-build`).append(address);
    $(`#${prefix}-show`).hide();
    return address;
}