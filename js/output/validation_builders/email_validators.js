'use strict'

const email_validators = (pageName, tag) => {
    let validators = `
    ${tag}: sf([
    r.required.bind({
      errorMsg: {
        'inline': '${pageName}:${tag}.validation.inline',
        'summary': '${pageName}:${tag}.validation.summary'
      }
    }),
    r.inArray.bind({
      source: ['Yes', 'No'],
      errorMsg: {
        'inline': '${pageName}:${tag}.inArray.inline',
        'summary': '${pageName}:${tag}.inArray.summary'
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
  ], (formtag) => {
    return formtag.${tag} === 'Yes';
  }),
  confirmEmailAddress: sf([
    emailValidator.bind({
      errorMsg: {
        inline: '${pageName}:emailDetails.confirmEmailAddress.validation.match.inline',
        summary: '${pageName}:emailDetails.confirmEmailAddress.validation.match.summary'
      }
    })
  ], (formtag) => {
    return formtag.emailConfirmationWanted === 'Yes';
  }),`

    return validators;
}

module.exports = email_validators;