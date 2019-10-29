'use strict'

const outputPanel = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot 8" src="../images/screenshot08.png" width="300px">`
    text += `</div>` //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`
    text += buildLine(`The Output Panel is used for creating the 4 main files needed to build a screen using CASA.`);
    text += `<br>`
    text += `</div>` // right side end

    text += `</div>`

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

module.exports = outputPanel;