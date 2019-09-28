'use strict'

const buildParagraphObject = (pageName, field) => {
  let name = field["text-form-data"];
  let paragraph = field.paragraph;
  let p = paragraph.split("\n");
  let paragraphObject = `\n<p>\n`;

  for (let i = 0; i < p.length; i++){
    paragraphObject += `{{ t('${pageName}:${name}.line${i + 1}') }}\n`
  }
  
  paragraphObject += `</p>\n`

  return paragraphObject;
}