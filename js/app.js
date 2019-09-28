'use strict'

const DIVIDER = '<div class="row"><hr></div>';
const BTN = 'button btn-primary btn-sm btn-block';
let codes = [];
let topPart = [
    '{% extends "cads/layouts/journey-claim.html" %}',
    '{% import "casa/macros/form.html" as form %}'
];

const buildCodes = () => {
    let seed = 'ABCDEFGHIJKLMNOPQRUSTUVWXYZ';
    seed = seed + seed + seed + seed;
    for (let i = 0; i < seed.length; i++) {
        for (let j = 0; j < 26; j++) {
            codes.push(seed[i] + seed[j])
        }
    }
}

const buildTopParts = () => {
    let tp = `<div>Top Parts<div>`
    topPart.forEach(item => {
        tp += `${item}<br/>`
    })
    $('#top-parts').append(tp);
}

const initView = () => {
    $('.page-build').hide();
    $('.page-neutral').hide();
    $('.json-build').hide();
    $('.validator-build').hide();
    $('.javascript-build').hide();
    $('#file-display').hide();
}

const flipView = () => {
    $('.field-build').show();
    $('.page-details').show();
    $('#main-display').show();
    $('.page-build').hide();
    $('.page-neutral').hide();
    $('.json-build').hide();
    $('.validator-build').hide();
    $('.javascript-build').hide();
    $('#file-display').hide();
}
const moveUp = id => {
    id = id.substring(0, id.length - 3);
    let casa = buildData();
    let children = ($('.field-build').children());
    let index;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === id) {
            index = i;
        }
    }
    if (index > 0) {
        let hold = casa.fields[index - 1];
        casa.fields[index - 1] = casa.fields[index];
        casa.fields[index] = hold;
        buildDisplay(casa);
    }
}
const moveDown = id => {
    id = id.substring(0, id.length - 5);
    console.log(id)
    let casa = buildData();
    let children = ($('.field-build').children());
    let index;
    for (let i = 0; i < children.length; i++) {
        if (children[i].id === id) {
            index = i;
        }
    }
    if (index < children.length - 1) {
        let hold = casa.fields[index + 1];
        casa.fields[index + 1] = casa.fields[index];
        casa.fields[index] = hold;
        buildDisplay(casa);
    }
}

$(
    $(window).keydown(function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
            return false;
        }
    }),
    buildCodes(),
    buildTopParts(),
    initView(),
    $('.field-button').click((e) => {
        switch (e.target.id) {
            case 'radio_group':
                buildRadioGroup();
                break;
            case 'date':
                buildDate();
                break;
            case 'email':
                buildEmail();
                break;
            case 'phone':
                buildPhoneNumber();
                break;
            case 'name':
                buildName();
                break;
            case 'address':
                buildAddress();
                break;
            case 'nino':
                buildNino();
                break;
            case 'fragment':
                buildFragment();
                break;
            case 'paragraph':
                buildParagraph();
                break;
            case 'header':
                buildHeader();
                break;
        }
    }),
    $('#show-page').click(() => {
        let casa = buildData();
        console.log(casa)
        showPage(casa)
    }),
    $('#show-json').click(() => {
        let casa = buildData();
        showJSON(casa)
    }),
    $('#show-javascript').click(() => {
        let casa = buildData();
        showJavaScript(casa)
    }),
    $('#show-validators').click(() => {
        let casa = buildData();
        showValidators(casa)
    }),
    $(`#save`).click(() => {
        save_file();
    }),
    $('#file-list').click(() => {
        file_list()
    }),
    $(`#export`).click(() => {
        let casa = buildData();
        exportFiles(casa)
    }),
    $(`#hide-all`).click(() => {
        $('.field-type').each(function(i, obj) {
            let _class = ($(obj).attr("class"));
            if (!_class.includes('collapse')) {
                obj.click();
            }
        });
    }),
    $(`#show-all`).click(() => {
        $('.field-type').each(function(i, obj) {
            let _class = ($(obj).attr("class"));
            if (_class.includes('collapse')) {
                obj.click();
            }
        });
    }),
    $("body").keyup((e) => {
      console.log(e.target.id)
        if (e.target.id.substring(3, 11) === 'fragment' || 
        e.target.id.substring(3, 12) === 'paragraph' || 
        e.target.id.substring(3, 8) === 'input' 
        ) {
            if (e.keyCode === 13) {
                let text = $(`#${e.target.id}`).val();
                text += `\n`
                $(`#${e.target.id}`).val(text)
            }
        }
    }),
    $("body").click((e) => {
        let id = e.target.id;
        if (id) {
            if (id.substring(id.length - 2) === "up") {
                moveUp(id)
            } else if (id.substring(id.length - 4) === "down") {
                moveDown(id)
            } else if (id === "return-to-build") {
                flipView();
            } else if ($(`#${id}`).hasClass('delete-btn')) {
                let field = id.substring(0, id.length - 11);
                $(`#${field}`).remove();
            } else if ($(`#${id}`).hasClass('load-btn')) {
                load_casa(id);
            } else if ($(`#${id}`).hasClass('del-file-btn')) {
                delete_file(id);
            }
        }
    }))