'use strict'

const textInput_validators = (pageName, field) => {
    let tag = field.tag;

    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        inline: '${tag}:${tag}.validation.conditionalMandatoryInline',
        summary: '${pageName}:${tag}.validation.conditionalMandatorySummary'
      }
    }),
    r.regex.bind({
      pattern: regexDefinitions.DEFAULT_ACCEPTABLE_CHARS,
      errorMsg: {
        inline: '${pageName}:${tag}.validation.invalidRegexInline',
        summary: '${pageName}:${tag}.validation.invalidRegexSummary'
      }
    }),
    r.strlen.bind({
      max: 60,
      errorMsgMax: {
        inline: '${pageName}:${tag}.validation.tooLongInline',
        summary: '${pageName}:${tag}.validation.tooLongSummary'
      }
    })
  ], (formData) => {
    return formData.areYouTheCarer === 'No';
  }),`
    return validators;
}

module.exports = textInput_validators;