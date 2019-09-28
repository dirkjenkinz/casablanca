'use strict'

const address_validators = (pageName, data) => {
    let messages = `
    ${data}: sf([
    addressValidation.bind({
      maxAddressLength: 36,
      maxPostcodeLength: 20,
      errorMsgAddress1and2: {
        'inline': '${pageName}:${data}.validation.errorMsgAddress1and2.inline',
        'summary': '${pageName}:${data}.validation.errorMsgAddress1and2.summary'
      },
      errorMsgPostcode: {
        'inline': '${pageName}:${data}.validation.errorMsgPostcode.inline',
        'summary': '${pageName}:${data}.validation.errorMsgPostcode.summary'
      },
      errorMsgPostcodeRegex: {
        'inline': '${pageName}:${data}.validation.errorMsgPostcodeRegex.inline',
        'summary': '${pageName}:${data}.validation.errorMsgPostcodeRegex.summary'
      },
      invalidRegexAddress: {
        'inline': '${pageName}:${data}.validation.invalidRegexAddress.inline',
        'summary': '${pageName}:${data}.validation.invalidRegexAddress.summary'
      },
      mandatoryAndRegexErrors: {
        'inline': '${pageName}:${data}.validation.mandatoryAndRegexErrors.inline',
        'summary': '${pageName}:${data}.validation.mandatoryAndRegexErrors.summary'
      },
      errorMsgAddressTooLong: {
        'inline': '${pageName}:${data}.validation.errorMsgAddressTooLong.inline',
        'summary': '${pageName}:${data}.validation.errorMsgAddressTooLong.summary'
      },
      errorMsgPostcodeTooLong: {
        'inline': '${pageName}:${data}.validation.errorMsgPostcodeTooLong.inline',
        'summary': '${pageName}:${data}.validation.errorMsgPostcodeTooLong.summary'
      }
    })
  ]),`

    return messages;
}