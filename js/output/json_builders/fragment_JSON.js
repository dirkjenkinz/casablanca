'use strict'

const fragment_JSON = (field) => {
  let messArray = [];
  let message = "\n";

  let subFragments = field.fragment.split("<=");

  subFragments.forEach(subFragment => {
    let end = subFragment.indexOf("=>");
    if (end > -1) {
      let pair = subFragment.substring(0, end).split("=");
      messArray.push(pair)
    }
  })

  messArray.forEach(pair => {
    message += `"${pair[0]}": "${pair[1]}",\n`
  })

  return message;
}