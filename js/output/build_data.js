"use strict"

const buildtag = () => {
    let casa = buildCasaObject();
    return casa;
}

const buildCasaObject = () => {
    let casa = {};
    let fields = [];

    casa.folder = $(`#folder`).val();
    casa["page-name"] = $(`#page-name`).val();
    casa["page-header"] = $(`#page-header`).val();
    casa.prevalidate = $("#prevalidate").prop("checked");
    casa.postvalidate = $("#postvalidate").prop("checked");

    let nodes = $(".field-build").children();

    for (let i = 0; i < nodes.length; i++) {
        let id = (nodes[i].id);
        let _class = ($(`#${id}`).attr("class"));
        if (_class.includes("field")) {
            let field = {};
            field["field-name"] = id.substring(3);
            field.replacements = [];
            let reps = [];
            let inputs = $(`#${id}`).find("input");

            for (let i = 0; i < inputs.length; i++) {
                id = inputs[i].id;
                if (id.includes("tag-value")) {
                    field.tag = $(`#${id}`).val();
                } else if (id.includes("header-value")) {
                    field.header = $(`#${id}`).val();
                } else if (id.includes("text-hint-value")) {
                    field["text-hint"] = $(`#${id}`).val();
                } else if (id.includes("target-value")) {
                    field.target = $(`#${id}`).val();
                } else if (id.includes("blanked-by-value")) {
                    field["blanked-by"] = $(`#${id}`).val();
                } else if (id.includes(`textInput-length-value`)) {
                    field['text-length'] = $(`#${id}`).val();
                } else if (id.includes("-left-")) {
                    let left = $(`#${id}`).val();
                    id = id.replace(`-left-`, `-right-`);
                    let right = $(`#${id}`).val();
                    let name = id.replace(`right`, `field`);
                    let fieldName = $(`input[name=${name}]:checked`).val();
                    if (fieldName) {
                        reps.push([fieldName, left, right]);
                    }
                } else {
                    headerBreakdown(id, field);
                }
            }

            field.replacements = reps;

            switch (field[`field-name`]) {
                case `radio-group`:
                    radioGroupExtras(id.substring(0, 2), field, inputs);
                    break;
                case `checkbox-array`:
                    checkboxArrayExtras(field, inputs);
                    break;
                case `fragment`:
                    field.fragment = $(`#${id.substring(0, 11)}-textarea`).val();
                    break;
                case `paragraph`:
                    field.paragraph = $(`#${id.substring(0, 12)}-textarea`).val();
                    break;
                case `top-part`:
                    field.top = $(`#${id.substring(0, 11)}-textarea`).val();
                    break;
                case `error-summary`:
                    field["error-summary"] = $(`#${id.substring(0, 16)}-textarea`).val();
                    break;
                case `if`:
                    field.condition = $(`#${id}`).val();
                    break;
                case `elseif`:
                    field.condition = $(`#${id}`).val();
                    break;
            }
            fields.push(field)
        }
    }
    casa.fields = fields;
    return casa;
}

let radioGroupExtras = (prefix, field, inputs) => {
    field.inline = $(`#${prefix}-radio-group-inline-yes`).prop("checked");
    let buttons = [];
    let text;
    let value;
    let trigger;
    for (let i = 0; i < inputs.length; i++) {
        let id = inputs[i].id;
        if (id.includes("rb-text")) {
            text = $(`#${id}`).val();
        } else if (id.includes("rb-value")) {
            value = $(`#${id}`).val();
        } else if (id.includes("rb-trigger")) {
            trigger = ($(`#${id}`).val());
            buttons.push([text, value, trigger])
        }
    }
    if (buttons) {
        field.buttons = buttons;
    }
}

let checkboxArrayExtras = (field, inputs) => {
    let boxes = [];
    let text;
    let value;
    for (let i = 0; i < inputs.length; i++) {
        let id = inputs[i].id;
        if (id.includes("cb-text")) {
            text = $(`#${id}`).val();
        } else if (id.includes("cb-value")) {
            value = $(`#${id}`).val();
            boxes.push([text, value])
        }
    }
    if (boxes) {
        field.boxes = boxes;
    }

}

const headerBreakdown = (id, field) => {
    if (id.includes("header-h1")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 1;
        }
    } else if (id.includes("header-h2")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 2;
        }
    } else if (id.includes("header-h3")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 3;
        }
    } else if (id.includes("header-h4")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 4;
        }
    } else if (id.includes("header-h5")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 5;
        }
    } else if (id.includes("header-h6")) {
        if (field["header-header-value"] = $(`#${id}`).prop("checked")) {
            field["header-size"] = 6;
        }
    }
}

module.exports = buildtag;