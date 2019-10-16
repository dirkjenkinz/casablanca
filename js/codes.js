'use strict'

  let codes = [];


const buildCodes = () => {
  let seed = 'ABCDEFGHIJKLMNOPQRUSTUVWXYZ';
  seed = seed + seed + seed + seed;
  for (let i = 0; i < seed.length; i++) {
    for (let j = 0; j < 26; j++) {
      codes.push(seed[i] + seed[j])
    }
  }
}

const getCode = () => {
  let fieldID = codes[0];
  codes.shift();
  return fieldID;
}

module.exports = {buildCodes, getCode}