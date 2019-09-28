'use strict'

const buildPhoneNumber = () => {
    let phone_fieldID = codes[0];
    codes.shift();
    let prefix = `${phone_fieldID}-phone`;
    let phone = buildTopOfField(prefix, 'Phone #', 'phone')
    phone += `</div></div></div>`
    $(`.field-build`).append(phone);
    $(`#${prefix}-show`).hide();
    return phone;
}