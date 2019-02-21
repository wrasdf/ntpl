'use strict';

const utils = require('./utility'),
      path = require('path')

function getFileExtenionName(filePath) {
  return path.extname(filePath).replace(`\.`, ``).toLowerCase();
}

function isInSupportList(filePath, list) {
  return list.indexOf(getFileExtenionName(filePath)) >= 0
}

function parameterBuilder(files) {
  return files.map(file => utils.yamlParser(file))
    .reduce((accumulator, currentValue) => Object.assign(accumulator, currentValue), {})
}

function keyBuilder(keypairs) {
  return keypairs.map(keypair => utils.keyParser(keypair))
    .reduce((accumulator, currentValue) => Object.assign(accumulator, currentValue), {})
}

module.exports = {
  isInSupportList,
  getFileExtenionName,
  parameterBuilder,
  keyBuilder
}
