`use strict`
const { getCode } = require(`../codes`);
const { buildField } = require(`./build_field`);
const { addElement, showSelectedElement } = require(`./elements.js`);

let elements = [
    [`top-part`, `Top Part`, `textarea-small`],
    [`else`, `else`, `flow`],
    [`if`, `if`, 'flow'],
    [`elseif`, `elseif`, 'flow'],
    [`endif`, `endif`, 'flow'],
    [`begin-hidden`, `Begin Hidden`, `tag`, `blanked`, `hidden`],
    [`end-hidden`, `End Hidden`, `hidden`],
    [`radio-group`, `Radio Group`, `tag`, `header`, `hint`, `replacements`, `radio`],
    [`date`, `Date`, `tag`, `header`, `hint`, `replacements`],
    [`email`, `Email`, `tag`, `header`, `hint`, `replacements`],
    [`checkbox-array`, `Checkbox Array`, `tag`, `header`, `hint`, `replacements`, `checkbox`],
    [`phone`, `Phone`, `tag`, `header`, `hint`, `replacements`],
    [`name`, `Name`, `tag`, `header`, `hint`, `replacements`],
    [`address`, `Address`, `tag`, `header`, `hint`, `replacements`],
    [`nino`, `NINO`, `tag`, `header`, `replacements`, `hint`],
    [`fragment`, `Code`, `tag`, `textarea-large`, 'shrink'],
    [`paragraph`, `Paragraph`, `tag`, `textarea-medium`, `shrink`],
    [`error-summary`, `Error Summary`, `tag`, `textarea-medium`],
    [`text-area`, `Text Area`, "tag", "header", "hint", "replacements", "length", "height"],
    [`text-input`, `Text Input`, "tag", "header", "hint", "replacements", "length"],
    [`header`, `Header`, `tag`, `header-size`],
    [`bank-details`, `Bank Details`, `tag`]
]

const buildElement = (id) => {
    let element_details = "";

    elements.forEach(element => {
        if (element[0] === id) {
            element_details = element;
        }
    })

    if (element_details[0] === `top-part`) {
        let children = $("#elements").children();
        if (children.length > 0 && children[0].id.includes(`-top-part-`)) {
            element_details = "";
        }
    }

    if (element_details !== "") {
        let fieldID = getCode();
        let prefix = `${fieldID}-${id}`;
        let element = buildField(prefix, element_details)
        if (element_details[0] === `top-part`) {
            $(`.field-build`).prepend(element);
            $(`#elements`).prepend(addElement(element_details[1], prefix));
        } else {
            $(`.field-build`).append(element);
            $(`#elements`).append(addElement(element_details[1], prefix));
        }
        showSelectedElement();

        return element;
    }
}

module.exports = { buildElement, elements };