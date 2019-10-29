'use strict'

const fieldInputArea = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot6" src="../images/screenshot06.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`The Field Input Area...`);
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

module.exports = fieldInputArea;