'use strict'

const showJSON = (casa) => {
  $('.field-build').hide();
  $('.json-build').show();
  $('.page-details').hide();
  $('.page-neutral').show();
  $('#json-output').remove();
  let json = buildJSON(casa);
  $('.json-build').append(`<textarea id="json-output" cols="140" rows="30">${json}</textarea>`);
}

const buildJSON = (casa) => {
  let header = casa['page-header'];
  let json = `{
    "pageHeader": "${header}",
  `
  json += buildMessages(casa.fields);
  json = indentJSON(json.split('\n')).trim();

  if (json.substring(json.length -1 ) === ","){
    json = json.substring(0, json.length - 1)
  }

  json += `\n}`

  return json
}

const buildMessages = fields => {
  let json = [];
  fields.forEach(field => {
    switch (field['field-name']) {
      case 'address':
        json += address_JSON(field.error1, field.error2, field.error3);
        break;
      case 'phone':
        json += phone_JSON(field['text-form-data']);
        break;
      case 'email':
        json += email_JSON(field['text-form-data']);
        break;
      case 'name':
        json += name_JSON(field['text-form-data']);
        break;
      case 'nino':
        json += nino_JSON(field['text-form-data'], field['text-hint']);
        break;
      case 'date':
        json += date_JSON(field['text-form-data'], field['text-hint']);
        break;
      case 'paragraph':
        json += paragraph_JSON(field);
        break;
      case 'header':
        json += header_JSON(field);
        break;
      case 'fragment':
        json += fragment_JSON(field);
        break;
      case 'radio_group':
        json += radioGroup_JSON(field);
        break;
    }
  })
  return json;
}

const indentJSON = data => {
  let b = '    ';
  let block = [];
  let padding = "";
  let ind = 0;
  let output = "";
  let newLine = "";

  for (let i = 0; i < 100; i++) {
    block.push(padding);
    padding += b;
  }

  data.forEach(line => {
    newLine = `${line.trim()}\n`;
    
    if (newLine.includes("{")) {
      ind++;
    } else if (newLine.includes("}")) {
      ind--;
    }
    output += `${block[ind]}${newLine}`
  })

  return output;
}