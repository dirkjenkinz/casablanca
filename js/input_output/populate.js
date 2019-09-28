const populateRadioGroup = field => {
    let prefix = buildRadioGroup().substring(9, 23);
    rebuild(prefix, field)
    if (field.inline) {
        $(`#${prefix}-radio_group-inline-yes`).prop('checked', true)
    }

    radio_group_buttonCount = 0;
    for (let i = 0; i < field.buttons.length; i = i + 2) {
        let newButton = radio_group_addRadioButton(`${prefix}-rb-add-1`);
        prefix = newButton.substring(38, 52);
        let cnt = (i / 2) + 1;
        $(`#${prefix}-rb-text-${cnt}-value`).val(field.buttons[i])
        $(`#${prefix}-rb-value-${cnt}-value`).val(field.buttons[i + 1]);
    }
}

const populateDate = field => {
    let prefix = buildDate().substring(9, 16);
    rebuild(prefix, field);
}

const populateEmail = field => {
    let prefix = buildEmail().substring(9, 17);
    rebuild(prefix, field);
}

const populatePhone = field => {
    let prefix = buildPhoneNumber().substring(9, 17);
    rebuild(prefix, field);
}

const populateName = field => {
    let prefix = buildName().substring(9, 16);
    rebuild(prefix, field);
}

const populateAddress = field => {
    let prefix = buildAddress().substring(9, 19);
    rebuild(prefix, field);
    rebuildErrors(prefix, field);
}

const populateNino = field => {
    let prefix = buildNino().substring(9, 16);
    rebuild(prefix, field);
}

const populateFragment = field => {
    let prefix = buildFragment().substring(9, 20);
    let f_area = `${prefix}-textarea`;
    $(`#${f_area}`).val(field.fragment);
}

const populateHeader = field => {
    let prefix = buildHeader().substring(9, 18);
    $(`#${prefix}-text-form-data-value`).val(field["text-form-data"]);
    $(`#${prefix}-text-header-value`).val(field["text-header"])
    $(`#${prefix}-h${field["header-size"]}`).prop('checked', true);
}

const populateParagraph = field => {
    let prefix = buildParagraph().substring(9, 21);
    $(`#${prefix}-text-form-data-value`).val(field["text-form-data"]);
    $(`#${prefix}-text-header-value`).val(field["text-header"]);
    $(`#${prefix}-textarea`).val(field.paragraph);
    switch (field["header-size"]) {
        case 1:
            $(`#${prefix}-h1`).prop("checked", true);
            break;
        case 2:
            $(`#${prefix}-h2`).prop("checked", true);
            break;
        case 3:
            $(`#${prefix}-h3`).prop("checked", true);
            break;
        case 4:
            $(`#${prefix}-h4`).prop("checked", true);
            break;
        case 5:
            $(`#${prefix}-h5`).prop("checked", true);
            break;
        case 6:
            $(`#${prefix}-h6`).prop("checked", true);
            break;
    }
}

const rebuild = (prefix, field) => {
    let data_field = `${prefix}-text-form-data-value`;
    let form_data = field["text-form-data"];
    $(`#${data_field}`).val(form_data)

    let header_field = `${prefix}-text-header-value`;
    let form_header = field["text-header"];
    $(`#${header_field}`).val(form_header)

    let hint_field = `${prefix}-text-hint-value`;
    let form_hint = field["text-hint"];
    $(`#${hint_field}`).val(form_hint);
}