'use strict'

const buildErrorSummaryObject = (pageName, field) => {
  let tag = field.tag;
  let summary = field["error-summary"];
  let summarySplit = summary.split("\n");
  let errorSummaryObject = `<div class="js-hidden error-summary" id="${tag}">\n`;

  let lineCnt = 1;

  summarySplit.forEach(line => {
    line = line.trim();
    if (line.length > 0) {
      errorSummaryObject += `{{ t('${pageName}:${tag}.line${lineCnt}') }}\n`
      lineCnt++;
    }
  })

  errorSummaryObject += `</div>,\n\n`

  return errorSummaryObject;
}

  module.exports = buildErrorSummaryObject