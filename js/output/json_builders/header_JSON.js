'use strict'

const header_JSON = (field) => {
  console.log('>', field)
    let data = field["text-form-data"];
    let text = field["text-header"]
    let messages = `"${data}.text":${text}\n`
    return messages;
}