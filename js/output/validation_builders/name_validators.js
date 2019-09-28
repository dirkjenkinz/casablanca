'use strict'

const name_validators = (pageName, data) => {
    let messages = `
    ${data}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}${data}.validation.mandatoryInline',
        summary: '${pageName}${data}.validation.mandatorySummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}${data}.validation.invalidCharsInline',
        summary: '${pageName}${data}.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: {
        'inline': '${pageName}${data}.validation.tooLong.inline',
        'summary': '${pageName}${data}.validation.tooLong.summary'
      }
    })
  ]),
  carerFirstName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}carerFirstName.validation.mandatoryInline',
        summary: '${pageName}carerFirstName.validation.mandatorySummary'
      }
    }),
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}carerFirstName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}carerFirstName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}carerFirstName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}carerFirstName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}carerFirstName.validation.invalidCharsInline',
        summary: '${pageName}carerFirstName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}carerFirstName.validation.tooLong.inline',
        'summary': '${pageName}carerFirstName.validation.tooLong.summary'
      }
    })
  ]),
  carerMiddleName: sf([
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}carerMiddleName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}carerMiddleName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}carerMiddleName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}carerMiddleName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}carerMiddleName.validation.invalidCharsInline',
        summary: '${pageName}carerMiddleName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}carerMiddleName.validation.tooLong.inline',
        'summary': '${pageName}carerMiddleName.validation.tooLong.summary'
      }
    })
  ]),
  carerLastName: sf([
    r.required.bind({
      errorMsg: {
        inline: '${pageName}carerLastName.validation.mandatoryInline',
        summary: '${pageName}carerLastName.validation.mandatorySummary'
      }
    }),
    hyphenValidation.bind({
      errorMsg: {
        inline: '${pageName}carerLastName.validation.invalidUseOfHyphensInline',
        summary: '${pageName}carerLastName.validation.invalidUseOfHyphensSummary'
      }
    }),
    doubleNonAlphabeticalCharacter.bind({
      errorMsg: {
        inline: '${pageName}carerLastName.validation.invalidNonAlphaCharsInline',
        summary: '${pageName}carerLastName.validation.invalidNonAlphaCharsSummary'
      }
    }),
    r.regex.bind({
      pattern: regexDef.DRS_REGEX,
      errorMsg: {
        inline: '${pageName}carerLastName.validation.invalidCharsInline',
        summary: '${pageName}carerLastName.validation.invalidCharsSummary'
      }
    }),
    r.strlen.bind({
      max: 35,
      errorMsgMax: {
        'inline': '${pageName}carerLastName.validation.tooLong.inline',
        'summary': '${pageName}carerLastName.validation.tooLong.summary'
      }
    })
  ]),
    `
    return messages;
}