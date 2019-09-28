'use strict'

const phone_validators = (pageName, data) => {
    let messages = `
    ${data}: sf([
    r.optional,
    r.regex.bind({
      pattern: regexDefinitions.TELEPHONE_REGEX,
      errorMsg: {
        'inline': '${pageName}:${data}.validation.errorMsg.inline',
        'summary': '${pageName}:${data}.validation.errorMsg.summary'
      }
    }),
    r.strlen.bind({
      max: 20,
      errorMsgMax: {
        'inline': '${pageName}:${data}.validation.tooLong.inline',
        'summary': '${pageName}:${data}.validation.tooLong.summary'
      }
    })
  ]),`

    return messages;
}