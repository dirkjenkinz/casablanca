'use strict'

const emailField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="email" src="../images/email.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="email output" src="../images/email_output.png" width="400px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Email Field.`);
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

module.exports = emailField;