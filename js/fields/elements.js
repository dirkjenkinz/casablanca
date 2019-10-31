const addElement = (element, prefix) => {
    let elementRow = `<div class="row element-row"  id="${prefix}-element">`
    elementRow += `<div class="col-md-3">`
    elementRow += ` <button class="btn-sm btn-danger delete-btn" id="${prefix}-delete-btn">Delete</button>`
    elementRow += `</div>`
    elementRow += `<div class="col">`
    elementRow += `<button class="btn-sm btn-dark btn-block btn-select selected" id="${prefix}-element-btn">${element}</button>`
    elementRow += `</div>`

    if (element !== `Top Part` && element !== `Footer`) {
        elementRow += `<div class="col-md-1">`
        elementRow += `<img id="${prefix}-up-arrow" src="../../images/arrow.png" class="arrow" height="25px">`
        elementRow += `</div>`
        elementRow += `<div class="col-md-1">`
        elementRow += `<img id="${prefix}-down-arrow" src="../../images/arrow.png" class="arrow" height="25px" style="transform:rotate(180deg);">`
        elementRow += `</div>`
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