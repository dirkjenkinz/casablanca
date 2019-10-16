'use strict'

const errorSummary_JSON = (field) => {
  let tag = field.tag;
  let errorSummary = field["error-summary"];
  let errorSummarySplit = errorSummary.split("\n");
  let json = "";

  let lineCnt = 1;

  errorSummarySplit.forEach(line => {
    line = line.trim();
    if (line.length > 0 ) {
      json += `"${tag}.line${lineCnt}":"${line}",\n`
      lineCnt++;
    }
  });

  json += `\n\n`;

  return json;
}

module.exports = errorSummary_JSON;