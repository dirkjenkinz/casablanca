'use strict'

const nino_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:${tag}.validation.mandatoryInline',
        summary: '${pageName}:${tag}.validation.mandatorySummary'
      }
    }),
    cadsNinoValidation.bind({
      errorMsg: {
        inline: '${pageName}:${tag}.validation.invalidNinoInline',
        summary: '${pageName}:${tag}.validation.invalidNinoSummary'
      }
    }),
    ninoValidation.bind({
      duplicateNinoPartner: {
        inline: '${pageName}:${tag}.validation.duplicateNinoPartner.inline',
        summary: '${pageName}:${tag}.validation.duplicateNinoPartner.summary'
      },
      duplicateNinoCaree: {
        inline: '${pageName}:${tag}.validation.duplicateNinoCaree.inline',
        summary: '${pageName}:${tag}.validation.duplicateNinoCaree.summary'
      }
    }),
    r.strlen.bind({
      max: 19,
      errorMsgMax: {
        'inline': '${pageName}:${tag}.validation.tooLong.inline',
        'summary': '${pageName}:${tag}.validation.tooLong.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = nino_validators;