'use strict'

const paragraph_JSON = (field) => {
  let name = field["text-form-data"];
  let messages = "";
  let lines = field.paragraph.split("\n")

  for (let i = 0; i < lines.length; i++) {
    messages += `"${name}.line${i + 1}":"${lines[i]}"\n`
  }
  return messages;
}