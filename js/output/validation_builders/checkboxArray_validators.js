'use strict'

const checkboxArray_validators = (pageName, field) => {
 let tag = field.tag;
  let boxes = field.boxes;
  let source = `source: [`;

  for (let i = 0; i < boxes.length; i++) {
    if (i === boxes.length - 1) {
      source += `"${boxes[i][1]}"`;
    } else {
      source += `"${boxes[i][1]}", `;
    }
  }
  source += `],`

  let validators = `
    breaksSinceCareStarted: sf([
    yourBreaksValidator,
    r.inArray.bind({
      ${source}
      errorMsg: {
        inline: '${pageName}:${tag}.validation.inArray.inline',
        summary: '${pageName}:${tag}.validation.inArray.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = checkboxArray_validators;