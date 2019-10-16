'use strict'

const fragment_JSON = (field) => {
  let messArray = [];
  let json = "\n";

  let subFragments = field.fragment.split("<=");

  subFragments.forEach(subFragment => {
    let end = subFragment.indexOf("=>");
    if (end > -1) {
      let pair = subFragment.substring(0, end).split("=");
      messArray.push(pair)
    }
  })

  messArray.forEach(pair => {
    json += `"${pair[0].trim()}": "${pair[1].trim()}",\n`
  })

  if (json.length > 0){
    json+",\n"
  }
  return json;
}

module.exports = fragment_JSON;