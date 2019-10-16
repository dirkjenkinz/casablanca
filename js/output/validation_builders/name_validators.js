'use strict'

const name_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.validation.mandatoryInline',
        summary: '${pageName}.${tag}.validation.mandatorySummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}.${tag}.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.validation.tooLong.summary'
      }
    })
  ]),
  .${tag}.FirstName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.validation.mandatoryInline',
        summary: '${pageName}.${tag}.FirstName.validation.mandatorySummary'
      }
    }),
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.FirstName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}.${tag}.FirstName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.FirstName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}.${tag}.FirstName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}.${tag}.FirstName.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.FirstName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.FirstName.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.FirstName.validation.tooLong.summary'
      }
    })
  ]),
  .${tag}.MiddleName: sf([
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.MiddleName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}.${tag}.MiddleName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.MiddleName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}.${tag}.MiddleName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}.${tag}.MiddleName.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.MiddleName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.MiddleName.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.MiddleName.validation.tooLong.summary'
      }
    })
  ]),
  .${tag}.LastName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.mandatoryInline',
        summary: '${pageName}.${tag}.LastName.validation.mandatorySummary'
      }
    }),
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}.${tag}.LastName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}.${tag}.LastName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}.${tag}.LastName.validation.invalidCharsInline',
        summary: '${pageName}.${tag}.LastName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}.${tag}.LastName.validation.tooLong.inline',
        'summary': '${pageName}.${tag}.LastName.validation.tooLong.summary'
      }
    })
  ]),`
    return validators;
}

module.exports = name_validators;