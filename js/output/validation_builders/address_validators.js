'use strict'

const address_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    addressValidation.bind({
      maxAddressLength: 36,
      maxPostcodeLength: 20,
      errorMsgAddress1and2: {
        'inline': '${pageName}:${tag}.validation.errorMsgAddress1and2.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgAddress1and2.summary'
      },
      errorMsgPostcode: {
        'inline': '${pageName}:${tag}.validation.errorMsgPostcode.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgPostcode.summary'
      },
      errorMsgPostcodeRegex: {
        'inline': '${pageName}:${tag}.validation.errorMsgPostcodeRegex.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgPostcodeRegex.summary'
      },
      invalidRegexAddress: {
        'inline': '${pageName}:${tag}.validation.invalidRegexAddress.inline',
        'summary': '${pageName}:${tag}.validation.invalidRegexAddress.summary'
      },
      mandatoryAndRegexErrors: {
        'inline': '${pageName}:${tag}.validation.mandatoryAndRegexErrors.inline',
        'summary': '${pageName}:${tag}.validation.mandatoryAndRegexErrors.summary'
      },
      errorMsgAddressTooLong: {
        'inline': '${pageName}:${tag}.validation.errorMsgAddressTooLong.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgAddressTooLong.summary'
      },
      errorMsgPostcodeTooLong: {
        'inline': '${pageName}:${tag}.validation.errorMsgPostcodeTooLong.inline',
        'summary': '${pageName}:${tag}.validation.errorMsgPostcodeTooLong.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = address_validators;