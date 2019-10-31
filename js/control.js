`use strict`

const { deleteFile, loadCasa, buildDisplay } = require("./input_output/file_handler");
const buildData = require("./output/build_data");

let topPart = [
  `{% extends "cads/layouts/journey-claim.html" %}`,
  `{% import "casa/macros/form.html" as form %}`
];

const buildTopPartDisplay = () => {
  let tp = `<div class="row"><div class="col"><h6>Default Top Part:</h6><div></div>`;

  topPart.forEach(item => {
    tp += `<div class="row"><div class="col">${item}</div></div>`
  });

  tp += `<br><br><br>`;
  tp += `<div class="row"><div class="col">Use the "Top Part" field to override these defaults.</div></div>`;

  $(`#top-parts`).append(tp);
}

const initView = () => {
  $(`.help-build`).hide();
  $(`.page-build`).hide();
  $(`.page-neutral`).hide();
  $(`#file-display`).hide();
}

const flipView = () => {
  $(`.field-build`).show();
  $(`#show-all`).show();
  $(`.page-details`).show();
  $(`#main-display`).show();
  $(`#summary`).show();
  $(`#fields`).show();
  $(`.help-build`).hide();
  $(`.page-build`).hide();
  $(`.page-neutral`).hide();
  $(`#file-display`).hide();
  $(`#return-btn-row`).empty();
  $(`#field-input-area`).show();
}

const deleteButton = (id) => {
  let r = confirm("Are you sure you want to delete this element?");
  if (r == true) {
    let field = id.substring(0, id.length - 11);
    $(`#${field}`).remove();
    field = field + "-element";
    $(`#${field}`).remove();
  }
}

const changeSelection = (id) => {
  let children = $("#elements").children();
  for (let i = 0; i < children.length; i++) {
    let thisID = children[i].id;
    $(`#${thisID}-btn`).removeClass("selected");
  }
  $(`#${id}`).addClass("selected");

  children = $(".field-build").children();
  for (let i = 0; i < children.length; i++) {
    let thisID = children[i].id;
    $(`#${thisID}`).hide();
  }
  id = id.replace("-element-btn", "");
  $(`#${id}`).show();
}

const showAll = () => {
  let casa = buildData();
  $("#elements").empty();
  buildDisplay(casa);
  children = $(".field-build").children();
  for (let i = 0; i < children.length; i++) {
    let thisID = children[i].id;
    $(`#${thisID}`).show();
  }
}

const keyUp = e => {
  let f = `Entity: ${$("#folder").val()}-${$("#page-name").val()}`;
  $(`#folder-and-page`).text(f);
  if (
    e.target.id.includes(`code`) ||
    e.target.id.includes(`paragraph`) ||
    e.target.id.includes(`footer`) ||
    e.target.id.includes(`top-part`) ||
    e.target.id.includes(`error-summary`) ||
    e.target.id.includes(`input`)
  ) {
    if (e.keyCode === 13) {
      let $txt = $($(`#${e.target.id}`));
      let caretPos = $txt[0].selectionStart;
      let textAreaTxt = $txt.val();
      let txtToAdd = "\n";
      $txt.val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos));
    }
  }
}

const moveUp = id => {
  id = id.replace("-arrow", "");
  id = id.substring(0, id.length - 3);
  let casa = buildData();
  let children = ($(`.field-build`).children());
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
    $("#elements").empty();
    buildDisplay(casa);
    children = ($(`.field-build`).children());
    let newID = (children[index - 1].id);
    $(`#${newID}-element-btn`).click();
  }
}

const moveDown = id => {
  id = id.replace("-arrow", "");
  id = id.substring(0, id.length - 5);
  let casa = buildData();
  let children = ($(`.field-build`).children());
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
    $("#elements").empty();
    buildDisplay(casa);
    children = ($(`.field-build`).children());
    let newID = (children[index + 1].id);
    $(`#${newID}-element-btn`).click();
  }
}

const bodyClick = e => {
  let id = e.target.id;

  if (id) {
    if (id.includes(`-ftype`)) {
      id = id.replace(`ftype`, `element-btn`);
      $(`#${id}`).click();
    } else if (id.includes("-up")) {
      moveUp(id)
    } else if (id.includes("-down")) {
      moveDown(id)
    } else if (id === "return-to-build") {
      flipView();
    } else if (id.includes("element-btn")) {
      changeSelection(id);
    } else if ($(`#${id}`).hasClass(`delete-btn`)) {
      deleteButton(id);
    } else if ($(`#${id}`).hasClass(`load-btn`)) {
      loadCasa(id);
    } else if ($(`#${id}`).hasClass(`del-file-btn`)) {
      deleteFile(id);
    } else if ($(`#${id}`).hasClass(`replacements-btn`)) {
      if ($(`#${id}`).text() === "Show Replacements") {
        $(`#${id}`).text("Hide Replacements")
      } else {
        $(`#${id}`).text("Show Replacements")
      }

      id = id.replace(`-btn`, ``);
      $(`#${id}`).toggle();
    }
  }
}

module.exports = {
  initView,
  bodyClick,
  buildTopPartDisplay,
  keyUp,
  topPart,
  showAll,
  moveUp
};