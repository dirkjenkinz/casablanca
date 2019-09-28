'use strict'

const email_validators = (pageName, data) => {
    let messages = `
    ${data}: sf([
    r.required.bind({
      errorMsg: {
        'inline': '${pageName}:${data}.validation.inline',
        'summary': '${pageName}:${data}.validation.summary'
      }
    }),
    r.inArray.bind({
      source: ['Yes', 'No'],
      errorMsg: {
        'inline': '${pageName}:${data}.inArray.inline',
        'summary': '${pageName}:${data}.inArray.summary'
      }
    })
  ]),
  emailAddress: sf([
    r.email.bind({
      errorMsg: {
        inline: '${pageName}:emailDetails.emailAddress.validation.inline',
        summary: '${pageName}:emailDetails.emailAddress.validation.summary'
      }
    }),
    emailFormatValidator.bind({
      errorMsg: {
        inline: '${pageName}:emailDetails.emailAddress.validation.notifyEmailValidation.inline',
        summary: '${pageName}:emailDetails.emailAddress.validation.notifyEmailValidation.summary'
      }
    })
  ], (formData) => {
    return formData.${data} === 'Yes';
  }),
  confirmEmailAddress: sf([
    emailValidator.bind({
      errorMsg: {
        inline: '${pageName}:emailDetails.confirmEmailAddress.validation.match.inline',
        summary: '${pageName}:emailDetails.confirmEmailAddress.validation.match.summary'
      }
    })
  })
};`
    return messages;
}