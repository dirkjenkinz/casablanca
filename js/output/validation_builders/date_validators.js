'use strict'

const date_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:${tag}.validation.mandatory.inline',
        summary: '${pageName}:${tag}.validation.mandatory.summary'
      }
    }),
    r.dateObject.bind({
      errorMsg: {
        inline: ${tag}.validation.inline.mapping,
        summary: ${tag}.validation.summary.mapping
      },
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      afterOffsetFromNow: moment.duration(-(moment().diff([1899, 11, 31], 'days')), 'days'),
      errorMsgAfterOffset: {
        inline: ${tag}.validation.inline.mapping,
        summary: ${tag}.validation.summary.mapping
      },
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsgBeforeOffset: {
        inline: ${tag}.validation.inline.mapping,
        summary: ${tag}.validation.summary.mapping
      }
    })
  ]),`
    return validators;
}

module.exports = date_validators;