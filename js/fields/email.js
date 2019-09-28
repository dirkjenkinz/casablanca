'use strict'

const buildEmail = () => {
    let fieldID = codes[0];
    codes.shift();
    let prefix = `${fieldID}-email`;
    let email = buildTopOfField(prefix, 'Email', 'email')
    email += `</div></div></div>`
    $(`.field-build`).append(email);
    $(`#${prefix}-show`).hide();
    return email;
}