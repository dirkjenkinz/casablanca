'use strict'

const buildIfObject = (pageName, field) => {
  let condition = field.condition;
  let ifObject = `{% if ${condition} %}\n\n`
  return ifObject;
}

module.exports = buildIfObject;