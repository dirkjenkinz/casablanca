'use strict'

const errorSummaryField = () => {
    let text = `<div class="row">`

    text += `<div class="col-md-1"></div>`;
    text += `<div class="col-md-6">`; // left side
    text += `<img alt="error summary" src="../images/errorsummary.png" width="600px">`;
    text += '<br><br>';
    text += `<img alt="error summary output" src="../images/error_summary_output.png" width="500px">`;
    text += `</div>`; //  left side end

    text += `<div class="col">`; // right side
    text += `<div class="col">`;
    text += buildLine(`Error Summary Field.`);
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

module.exports = errorSummaryField;