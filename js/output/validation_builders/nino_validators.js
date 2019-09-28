'use strict'

const nino_validators = (pageName, data) => {
    let messages = `
    ${data}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:${data}.validation.mandatoryInline',
        summary: '${pageName}:${data}.validation.mandatorySummary'
      }
    }),
    cadsNinoValidation.bind({
      errorMsg: {
        inline: '${pageName}:${data}.validation.invalidNinoInline',
        summary: '${pageName}:${data}.validation.invalidNinoSummary'
      }
    }),
    ninoValidation.bind({
      duplicateNinoPartner: {
        inline: '${pageName}:${data}.validation.duplicateNinoPartner.inline',
        summary: '${pageName}:${data}.validation.duplicateNinoPartner.summary'
      },
      duplicateNinoCaree: {
        inline: '${pageName}:${data}.validation.duplicateNinoCaree.inline',
        summary: '${pageName}:${data}.validation.duplicateNinoCaree.summary'
      }
    }),
    r.strlen.bind({
      max: 19,
      errorMsgMax: {
        'inline': '${pageName}:${data}.validation.tooLong.inline',
        'summary': '${pageName}:${data}.validation.tooLong.summary'
      }
    })
  ]),
    `
    return messages;
}