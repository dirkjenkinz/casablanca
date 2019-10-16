const addElement = (element, prefix) => {
    let elementRow = `
  <div class="row element-row"  id="${prefix}-element">
      <div class = "col-md-3">
          <button class="btn-sm btn-danger delete-btn" id="${prefix}-delete-btn">Delete</button>
      </div>
      <div class = "col">
          <button class="btn-sm btn-dark btn-block btn-select selected" id="${prefix}-element-btn">${element}</button>
      </div>`

    if (element !== `Top Part`) {
        elementRow += `
      <div class = "col-md-1">
          <img id="${prefix}-up-arrow" src="../../images/arrow.png" class="arrow" height="25px">
      </div>
      <div class = "col-md-1">
          <img id="${prefix}-down-arrow" src="../../images/arrow.png" class="arrow" height="25px" style="transform:rotate(180deg);">
      </div>`
    }

    elementRow += `</div>`

    return elementRow;
}
const showSelectedElement = () => {
    let children = $(".field-build").children();
    let thisID;
    for (let i = 0; i < children.length - 1; i++) {
        thisID = children[i].id;
        $(`#${thisID}`).hide();
        $(`#${thisID}-element-btn`).removeClass("selected");
    }
}

module.exports = { addElement, showSelectedElement };