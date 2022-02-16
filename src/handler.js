'use strict';
const uuid = require('uuid').v4;

module.exports.generateRandomstring = event => {
  const randomstring = uuid();
  console.log("The random generated integer is:  ", randomstring);
  return randomstring;
};