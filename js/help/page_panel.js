'use strict'

const pagePanel = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot 5" src="../images/screenshot05.png" width="300px">`
    text += `</div>` //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`
    text += buildLine(`The Page Panel is where you enter the Folder and Page Name of the screen you are working on.`);
    text += `<br>`
    text += buildLine(`These two fields are combined to create the Screen Name. So, for instance, if the Folder is called "your-details" and 
    the Page Name = "annual-income", the Screen = "your-details-annual-income".`);
    text += `</div>`
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

module.exports = pagePanel;