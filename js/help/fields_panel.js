'use strict'

const fieldsPanel = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-3">`; // left side
    text += `<img alt="screenshot6" src="../images/screenshot06.png" width="300px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`The Screen Panel is where you build up your page by adding Fields to it.`);
    text += `<br>`;
    text += buildLine(`Each field represents a discrete component such as a name or a date.`);
    text += buildLine(`Most fields translate to one or more HTML/Nunjucks components.`);
    text += `<br>`;
    text += buildLine(`For instance, the Name Field consists of a header (mandatory), a hint (optional) and four text inputs - Title, First Name, Middle Name, Last Name.`);
    text += `<br>`
    text += buildLine('When a field is selected, a corresponding button is placed in Section 3 and a corresponding Field Input Segment is placed in Segment 4.');
    text += `<br>`
    text += buildLine('Field Input Segments are used to gather the data needed to build the corresponding HTML/Nunjucks, JSON, validators and Javascript for the field.')
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

module.exports = fieldsPanel;