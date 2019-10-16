'use  strict'

const buildOptions = (pageName, tag, field, maxlength = 0, inline = false, trim = false) => {
  let options = "";

  if (field["text-hint"] || maxlength || field.target || trim) {
    options = `options = {\n`;

    if (field["text-hint"]) {
      options += `hint: t("${pageName}:${tag}.hint")\n`

      field.replacements.forEach(replacement => {
        if (replacement[0] === `hint`) {
          options += `| replace("${replacement[1]}", ${replacement[2]}\n`
        }
      })

      options += `),\n`;
    }

    if (maxlength > 0) {
      options += `maxlength: ${maxlength},\n`;
    }

    if (trim){
      options += `trim: true,\n`
    }

    if (inline){
      options += `inline: true,\n`;
    }

    if (field.target){
      options += `targetPanel: "${field.target}",\n`
    }

    options += `},\n`;
  }
  return options
}

module.exports = { buildOptions };