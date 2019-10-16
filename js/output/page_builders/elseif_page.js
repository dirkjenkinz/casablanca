'use strict'

const buildElseifObject = (pageName, field) => {
  let condition = field.condition;
  let elseifObject = `{% elseif ${condition} %}\n\n`
  return elseifObject;
}

module.exports = buildElseifObject;