"use strict"

const buildData = () => {
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
            let field = {}
            field["field-name"] = id.substring(3);
            let inputs = $(`#${id}`).find("input");
            for (let i = 0; i < inputs.length; i++) {
                id = inputs[i].id;
                if (id.includes("text-form-data")) {
                    field["text-form-data"] = $(`#${id}`).val();
                } else if (id.includes("text-header")) {
                    field["text-header"] = $(`#${id}`).val();
                } else if (id.includes("text-hint")) {
                    field["text-hint"] = $(`#${id}`).val();
                } else {
                    headerBreakdown(id, field);
                }
            }
            if (field["field-name"] === "address") {
                addressExtras(id.substring(0, 2), field);
            } else if (field["field-name"] === "radio_group") {
                radioGroupExtras(id.substring(0, 2), field, inputs);
            } else if (field["field-name"] === "fragment") {
                field.fragment = $(`#${id}-textarea`).val();
            } else if (field["field-name"] === "paragraph") {
                field.paragraph = $(`#${id.substring(0, 12)}-textarea`).val();
            }
            fields.push(field)
        }
    }
    casa.fields = fields;
    return casa;
}

let addressExtras = (prefix, field) => {
    field.error1 = $(`#${prefix}-address-error1-value`).val();
    field.error2 = $(`#${prefix}-address-error2-value`).val();
    field.error3 = $(`#${prefix}-address-error3-value`).val();
}

let radioGroupExtras = (prefix, field, inputs) => {
    field.inline = $(`#${prefix}-radio_group-radio_group-inline-yes`).prop("checked");
    let buttons = [];
    for (let i = 0; i < inputs.length; i++) {
        let id = inputs[i].id;
        let sub = inputs[i].id.substring(18);
        if (sub.substring(0, 4) === "text") {
            buttons.push($(`#${id}`).val());
        } else if (sub.substring(0, 5) === "value") {
            buttons.push($(`#${id}`).val());
        }
    }
    if (buttons) {
        field.buttons = buttons;
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