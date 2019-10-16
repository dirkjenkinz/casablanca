'use strict'

const paragraph_JSON = (field) => {
  let tag = field.tag;
  let paragraph = field.paragraph;
  let paraSplit = paragraph.split("\n");
  let json = "";

  let lineCnt = 1;

  paraSplit.forEach(line => {
    line = line.trim();
    if (line.substring(0, 1) === "<") {
      json += parseLine(line, tag)
    } else if (line.length > 0 && line.substr(0,1) != '<') {
      json += `"${tag}.line${lineCnt}":"${line}",\n`
      lineCnt++;
    }
  });

  json += `\n\n`;

  return json;
}

const parseLine = (line, tag) => {
 if (line.substring(0,4) === `<=li` || line.substring(0,3) === `<=h`){
    let start = line.indexOf(`>`) + 1;
    let end = line.indexOf('<', start);
    let midLine = line.substring(start, end).split("=");
    line = `"${tag}.${midLine[0]}": "${midLine[1]}",\n`
 } else {
   line = "";
 }

  return line;
}

module.exports = paragraph_JSON;