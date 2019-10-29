'use strict'

const bankDetails_validators = (pageName, tag) => {


    let validators = `
 accountHolderName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.accountHolderName.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.accountHolderName.validation.mandatorySummary'
      }
    }),
    r.strlen.bind({
      max: 60,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.accountHolderName.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.accountHolderName.validation.tooLong.summary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:bankAccount.accountHolderName.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.accountHolderName.validation.invalidCharsSummary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  bankName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.bankName.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.bankName.validation.mandatorySummary'
      }
    }),
    r.strlen.bind({
      max: 60,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.bankName.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.bankName.validation.tooLong.summary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:bankAccount.bankName.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.bankName.validation.invalidCharsSummary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  sortCode: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.sortCode.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.sortCode.validation.mandatorySummary'
      }
    }),
    sortCodeValidation.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.sortCode.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.sortCode.validation.invalidCharsSummary'
      },
      invalidLengthErrorMsg: {
        inline: '${pageName}:bankAccount.sortCode.validation.invalidLengthInline',
        summary: '${pageName}:bankAccount.sortCode.validation.invalidLengthSummary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  accountNumber: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}:bankAccount.accountNumber.validation.mandatoryInline',
        summary: '${pageName}:bankAccount.accountNumber.validation.mandatorySummary'
      }
    }),
    r.strlen.bind({
      max: 10,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.accountNumber.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.accountNumber.validation.tooLong.summary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.NUMBER_REGEX,
      errorMsg: {
        inline: '${pageName}:bankAccount.accountNumber.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.accountNumber.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      min: 6,
      errorMsgMin: {
        inline: '${pageName}:bankAccount.accountNumber.validation.fieldLengthInline',
        summary: '${pageName}:bankAccount.accountNumber.validation.fieldLengthSummary'
      }
    })

  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),

  rollNumber: sf([
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:bankAccount.rollNumber.validation.invalidCharsInline',
        summary: '${pageName}:bankAccount.rollNumber.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 18,
      errorMsgMax: {
        inline: '${pageName}:bankAccount.rollNumber.validation.tooLong.inline',
        summary: '${pageName}:bankAccount.rollNumber.validation.tooLong.summary'
      }
    })
  ], (formData) => {
    return formData.haveBankAccount === 'Yes';
  }),`

    return validators;
}

module.exports = bankDetails_validators;