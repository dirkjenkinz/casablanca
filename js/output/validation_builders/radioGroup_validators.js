'use strict'

const radioGroup_validators = (pageName, field) => {

    let tag = field.tag;
    let buttons = field.buttons;
    let source = `source: [`;

    for (let i = 0; i < buttons.length; i++) {
        if (i === buttons.length - 1) {
            source += `"${buttons[i][1]}"`;
        } else {
            source += `"${buttons[i][1]}", `;
        }
    }

    source += `],`

    let validators = `
    ${tag}: sf([
      r.required.bind({
        errorMsg: {
          inline: '${pageName}:${tag}.validation.mandatory.inline',
          summary: '${pageName}:${tag}.validation.mandatory.summary'
        }
      }),
      r.inArray.bind({
        ${source}
        errorMsg: {
          summary: '${pageName}:${tag}.validation.inArray.summary',
          inline: '${pageName}:${tag}.validation.inArray.inline'
        }
      })
    ]),`


    return validators;
}

module.exports = radioGroup_validators;