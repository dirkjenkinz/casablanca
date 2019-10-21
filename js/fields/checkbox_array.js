let checkbox_array_boxCount = 0;

const checkbox_array_addCheckbox = (id, boxCount = checkbox_array_boxCount) => {
    checkbox_array_boxCount++;
    let prefix = id.substring(0, 17);
    let newBox = `<div class = "checkbox-array-group" id="${prefix}-cbgroup-${boxCount}">`;
    newBox += buildCheckbox(`${prefix}-cb-text-${boxCount}`, `${prefix}-cb-del-${boxCount}`);
    newBox += buildInputRow(`${prefix}-cb-value-${boxCount}`);

    $(`#${prefix}-checkbox-area`).append(newBox);
    return newBox;
}

const checkbox_array_deleteCheckbox = (id) => {
    id = id.replace("-cb-del-", "-cbgroup-")
    $(`#${id}`).remove();
}

const buildCheckbox = (name, btnID) => {
    let row = `<div class="row" id="${name}">`
    row += `     <div class="col-md-2 right-justify">`;
    row += `       Box Text </div>`
    row += `     <div class="col">`
    row += `        <input type="text" id="${name}-value" size="60">`;
    row += `     </div>`
    row += `     <div class="col-md-2">`
    row += `       <button class="button btn-danger btn-sm btn-block delete-btn" id="${btnID}">`
    row += `         Delete`
    row += `       </button>`
    row += `     </div>`
    row += `     <div class="col-md-1"></div>`
    row += `   </div>`
    return row
}

const buildInputRow = name => {
    let row = `<div class="row btn-value" id="${name}">`
    row += `<div class="col-md-2 right-justify">`;
    row += `Box Value</div><div class="col"><input type="text" id="${name}-value" size="20">`;
    row += `</div>`
    row += `<div class="col-md-2 right-justify">`;
    name = name.replace(`value`, `trigger`);
    row += `Target:</div><div class="col"><input type="text" id="${name}" size="40">`;
    row += `</div>`
    row += `<div class="col"></div>`
    row += `</div>`
    return row
}

$(
    $("body").click((e) => {
        let id = e.target.id;
        if (id.substring(3, 17) === "checkbox-array") {
            if (id.includes("-cb-add-")) {
                checkbox_array_addCheckbox(id);
            } else if (id.includes("-cb-del-")) {
                checkbox_array_deleteCheckbox(id);
            }
        }
    })
)

module.exports = { checkbox_array_addCheckbox }