'use strict'

const buildHeaderObject = (pageName, field) => {
console.log(field)


  let sizes = [``, `heading-large`, `heading-medium`, `heading-medium`, `heading-small`, `heading-small`, `heading-small`];
  let tag = field.tag;
  let size = "h" + field["header-size"] + " " + sizes[field["header-size"]];

  let headerObject = `<${size}>{{ t('${pageName}:${tag}.text') }}</${size}>,\n\n`
  return headerObject;
}

module.exports = buildHeaderObject;