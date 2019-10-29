'use strict'

const bankDetailsField = () => {
    let text = `<div class="row">`;

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="bank details" src="../images/bank_details.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="bank details output" src="../images/bank_details_output.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Bank Details Field.`);
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

module.exports = bankDetailsField;