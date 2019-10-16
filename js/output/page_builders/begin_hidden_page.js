'use strict'

//  <div class="panel panel-border-narrow js-hidden" id="third-party-name" blanked-by="f-radio-areYouTheCarer-Yes">

const buildBeginHiddenObject = (pageName, field) => {
  let tag = field.tag;
  let blanked = field["blanked-by"]
  let beginHiddenObject = `<div class="panel panel-border-narrow js-hidden" id="${tag}" blanked-by="${blanked}">\n\n`;
  return beginHiddenObject;
}

module.exports = buildBeginHiddenObject;