'use strict'

const buildBeginHiddenObject = (pageName, field) => {
  let tag = field.tag;
  let blanked = field["blanked-by"]
  let beginHiddenObject = `<div class="panel panel-border-narrow js-hidden" id="${tag}"`
  if (blanked.length > 0) {
    beginHiddenObject += `blanked-by="${blanked}"`
  }
  beginHiddenObject += `>\n\n`;
  return beginHiddenObject;
}

module.exports = buildBeginHiddenObject;