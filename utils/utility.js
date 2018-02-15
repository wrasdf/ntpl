
'use strict';

const fs = require('fs'),
    path = require('path'),
    yaml = require('js-yaml');

function getFileExtensionName(filePath) {
  return path.extname(filePath).replace('\.', '').toLowerCase();
}

function isInSupportList(filePath, list) {
  if (list.indexOf(getFileExtensionName(filePath)) < 0) {
    throw new Error(`Only support ${list}`)
  }
  return true
}

function paramsReader(filePath) {
  if (getFileExtensionName(filePath) === 'json'){
    return JSON.parse(fs.readFileSync(filePath, 'utf8'))
  }
  return yaml.load(fs.readFileSync(filePath, 'utf8'));
}

module.exports = {
  isInSupportList: isInSupportList,
  getFileExtensionName: getFileExtensionName,
  paramsReader: paramsReader
}
