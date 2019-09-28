'use strict'

const save_file = () => {
    let casa = buildData();
    let item = `${casa.folder}/${casa["page-name"]}`;
    localStorage.setItem(item, JSON.stringify(casa));
    console.log('file saved');
}

const file_list = () => {
    $('#file-display').show();
    $('#main-display').hide();
    $(`#list-of-files`).remove();
    let items = `<div id="list-of-files"><br/><button class="button btn-sm btn-danger btn-block field-button" id="return-to-build">Return to Build</button><br/>`
    items += `<div class="row"><h5>&nbsp;&nbsp;Saved Pages...</h5><br/><br/></div>`;
    for (let i = 0; i < localStorage.length; i++) {
        let key = window.localStorage.key(i);
        let key_transformed = key.replace('/', '_');
        items += `
        <div class="row load-btn-row">
          <div class="col-md-2"><button class="${BTN} del-file-btn" id="del-file-${key_transformed}">Del</button></div>
          <div class="col"><h5>${key}</h5></div>
          <div class="col-md-3"><button class="${BTN} load-btn" id="${key_transformed}">Load</button></div>
        </div>`
    }
    items += `</div>`
    $('#file-display').append(items);
}

const load_casa = (id) => {
    let key = id.replace('_', '/')
    let casa = JSON.parse(localStorage.getItem(key));
    $("#file-display").hide();
    $("#main-display").show();
    buildDisplay(casa);
    $('.btn-hide').each(function(i, obj) {
        obj.click();
    });
}

const buildDisplay = (casa) => {
    $("#folder").val(casa.folder);
    $("#page-name").val(casa["page-name"]);
    $("#page-header").val(casa["page-header"]);
    $('#prevalidate').prop("checked", casa.prevalidate);
    $('#postvalidate').prop("checked", casa.postvalidate);
    $('.field-build').empty();
    let prefix;
    casa.fields.forEach(field => {
        switch (field["field-name"]) {
            case 'radio_group':
                populateRadioGroup(field);
                break;
            case 'date':
                populateDate(field);
                break;
            case 'email':
                populateEmail(field);
                break;
            case 'phone':
                populatePhone(field);
                break;
            case 'name':
                populateName(field);
                break;
            case 'address':
                populateAddress(field);
                break;
            case 'nino':
                populateNino(field);
                break;
            case 'fragment':
                populateFragment(field)
                break;
            case 'paragraph':
                populateParagraph(field);
                break;
            case 'header':
                populateHeader(field);
                break;
        }
    })
}

const delete_file = (id) => {
    id = id.substring(9);
    localStorage.removeItem(id.replace('_', '/'));
    file_list();
}

const rebuildErrors = (prefix, field) => {
    let error1_field = `${prefix}-error1-value`;
    let error1 = field["error1"];
    $(`#${error1_field}`).val(error1)
    let error2_field = `${prefix}-error2-value`;
    let error2 = field["error2"];
    $(`#${error2_field}`).val(error2)
    let error3_field = `${prefix}-error3-value`;
    let error3 = field["error3"];
    $(`#${error3_field}`).val(error3)
}