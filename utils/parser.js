'use strict';

const utils = require('./utility'),
      path = require('path'),
      merge = require('deepmerge'),
      supportList = ['yaml', 'yml']

function _getFileExtenionName(filePath) {
  return path.extname(filePath).replace(`\.`, ``).toLowerCase();
}

function _isInSupportList(filePath, list) {
  return list.indexOf(_getFileExtenionName(filePath)) >= 0
}

function _parameterBuilder(files) {
  return files.filter(file => _isInSupportList(file, ["yaml", "yml"]))
    .map(file => utils.yamlParser(file))
    .reduce((accumulator, currentValue) => merge(accumulator, currentValue), {})
}

function _keyBuilder(keypairs) {
  return keypairs.map(keypair => utils.keyParser(keypair))
    .reduce((accumulator, currentValue) => merge(accumulator, currentValue), {})
}

function getParameters(ntpl) {
  const fileParams = _parameterBuilder(ntpl.parameters)
  const keyParams = _keyBuilder(ntpl.keyPairs)
  return merge(fileParams, keyParams)
}

function parameterReader(filePath, fileList) {
  if (_isInSupportList(filePath, supportList)) {
    fileList.push(filePath)
  }
  return fileList
}

function keyReader(keypair, keyslist) {
  keyslist.push(keypair)
  return keyslist
}

function componentReader(component, componentsList){
  componentsList.push(component)
  return componentsList
}


module.exports = {
  _isInSupportList,
  _getFileExtenionName,
  _parameterBuilder,
  _keyBuilder,
  parameterReader,
  keyReader,
  componentReader,
  getParameters
}
