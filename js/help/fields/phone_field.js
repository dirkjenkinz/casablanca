'use strict'

const phoneField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="phone" src="../images/phone.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="phone output" src="../images/phone_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Phone Field.`);
    text += `<br>`;
    text += `</div>`;
    text += `</div>`; // right side end

    text += `</div>`;
    return text;
}

const buildLine = input => {
    let text = `<div class="row">`;
    text += `<div class="col-md-1"></div>`;
    text += `<div class="col">${input}</div>`;
    text += `<div class="col-md-1"></div>`;
    text += `</div>`
    return text;
}

module.exports = phoneField;