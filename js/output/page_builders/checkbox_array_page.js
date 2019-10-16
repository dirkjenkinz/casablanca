"use strict"

const buildcheckboxArrayObject = (field) => {
  let tag = field.tag;

  let checkboxArrayObject = `{{ form.checkboxArray(formData.${tag},\n`
  checkboxArrayObject += `"${tag}",\n`;
  checkboxArrayObject += `t("${tag}.label"),\n`;
  checkboxArrayObject += `"${tag}",\n`
  checkboxArrayObject += `errors=formErrors)\n`;
  checkboxArrayObject += `}},\n\n`

  return checkboxArrayObject;
}

module.exports = buildcheckboxArrayObject;