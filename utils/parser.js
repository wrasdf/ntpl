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
  return files.filter(file => _isInSupportList(file, supportList))
    .map(file => utils.yamlParser(file))
    .reduce((accumulator, currentValue) => merge(accumulator, currentValue), {})
}

function _keyBuilder(keypairs) {
  return keypairs.map(keypair => utils.keyParser(keypair))
    .reduce((accumulator, currentValue) => merge(accumulator, currentValue), {})
}

function getParameters(ntpl) {
  const opts = ntpl.opts()
  const fileParams = _parameterBuilder(opts.parameters)
  const keyParams = _keyBuilder(opts.keyPairs)
  return merge(fileParams, keyParams)
}

function parameterReader(filePath, fileList) {
  if (_isInSupportList(filePath, supportList)) {
    return fileList.concat([filePath]);
  }
  return fileList;
}

function keyReader(keypair, keypairs) {
  return keypairs.concat([keypair]);
}

function componentReader(component, componentsList){
  return componentsList.concat([component]);
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
