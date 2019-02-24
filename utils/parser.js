'use strict';

const utils = require('./utility'),
      path = require('path'),
      merge = require('deepmerge')

function getFileExtenionName(filePath) {
  return path.extname(filePath).replace(`\.`, ``).toLowerCase();
}

function isInSupportList(filePath, list) {
  return list.indexOf(getFileExtenionName(filePath)) >= 0
}

function parameterBuilder(files) {
  return files.filter(file => isInSupportList(file, ["yaml", "yml"]))
    .map(file => utils.yamlParser(file))
    .reduce((accumulator, currentValue) => merge(accumulator, currentValue), {})
}

function keyBuilder(keypairs) {
  return keypairs.map(keypair => utils.keyParser(keypair))
    .reduce((accumulator, currentValue) => merge(accumulator, currentValue), {})
}

module.exports = {
  isInSupportList,
  getFileExtenionName,
  parameterBuilder,
  keyBuilder
}
