'use strict'

const date_validators = (pageName, data) => {
    let messages = `
    ${data}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:${data}.validation.mandatoryInline',
        summary: '${pageName}:${data}.validation.mandatorySummary'
      }
    }),
    r.dateObject.bind({
      errorMsg: {
        inline: ${data}ValidationInlineMapping,
        summary: ${data}ValidationSummaryMapping
      },
      allowSingleDigitDay: true,
      allowSingleDigitMonth: true,
      afterOffsetFromNow: moment.duration(-(moment().diff([1899, 11, 31], 'days')), 'days'),
      errorMsgAfterOffset: {
        inline: ${data}ValidationInlineMapping,
        summary: ${data}dobValidationSummaryMapping
      },
      beforeOffsetFromNow: moment.duration(1, 'days'),
      errorMsgBeforeOffset: {
        inline: ${data}ValidationInlineMapping,
        summary: ${data}ValidationSummaryMapping
      }
    })
  ])`
    return messages;
}