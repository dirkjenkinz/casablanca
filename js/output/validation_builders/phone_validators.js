'use strict'

const phone_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.optional,
    r.regex.bind({
      pattern: regexDefinitions.TELEPHONE_REGEX,
      errorMsg: {
        'inline': '${pageName}:${tag}.validation.errorMsg.inline',
        'summary': '${pageName}:${tag}.validation.errorMsg.summary'
      }
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: {
        'inline': '${pageName}:${tag}.validation.tooLong.inline',
        'summary': '${pageName}:${tag}.validation.tooLong.summary'
      }
    })
  ]),`

    return validators;
}

module.exports = phone_validators;