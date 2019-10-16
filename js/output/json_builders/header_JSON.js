'use strict'

const header_JSON = (field) => {
    let tag = field.tag;
    let text = field.header
    let json = `"${tag}.text": "${text}"\n`
    return json.trim();
}

module.exports = header_JSON;