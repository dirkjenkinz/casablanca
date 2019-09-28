'use strict'

const radioGroup_validators = (pageName, data, buttons) => {
    let messages = `
    benefits: sf([
      r.required.bind({
        errorMsg: {
          inline: '${pageName}:${data}.validation.mandatory.inline',
          summary: '${pageName}:${data}.validation.mandatory.summary'
        }
      }),
      r.inArray.bind({
        source: ['PIP', 'DLA', 'AA', 'CAA', 'AFIP', 'None'],
        errorMsg: {
          summary: '${pageName}:${data}.validation.inArray.summary',
          inline: '${pageName}:${data}.validation.inArray.inline'
        }
      })
    ])`
    return messages;
}