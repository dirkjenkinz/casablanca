'use strict'

const fieldsList = () => {
    let text = `<div class="row">`;

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot 12" src="../images/screenshot12.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`The Fields List...`);
    text += `<br>`;
    text += `</div>`; // right side end

    text += `</div>`;

    console.log(text)

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

module.exports = fieldsList;