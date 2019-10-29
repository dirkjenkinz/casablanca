'use strict'

const checkboxArray_JSON = (field) => {
    let tag = field.tag;
    let header = field.header;
    let boxes = field.boxes;

    let answer = `answer": {\n`;
    let list = `<ul class='list-bullet'>`;

    for (let i = 0; i < boxes.length; i++) {
        if (i === boxes.length - 1) {
            answer += `"${tag}.answer.${i +1}": "${boxes[i][0]}"\n`;
        } else {
            answer += `"${tag}.answer.${i +1}": "${boxes[i][0]}",\n`;
        }
        list += `<li>${boxes[i][0]}</li>`
    }

    answer += `},`
    list += `</ul>`

    let json = `
    "${tag}": {
    "label": "${header}",
    "${answer}
    "validation": {
      "mandatory": {
        "inline": "You must select: ${list}",
        "summary": "${header} - You must select: ${list}"
      },
      "inArray": {
        "inline": "Invalid value",
        "summary": "${header} - Invalid value"
      }
    }
  },`
    return json;
}

module.exports = checkboxArray_JSON;