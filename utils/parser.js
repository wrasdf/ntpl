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
  return Promise.all(files.map(file => utils.yamlPaser(file)))
    .then(objectArray => objectArray.reduce(
        (accumulator, currentValue) => Object.assign(accumulator, currentValue), {}
      )
    )
}

module.exports = {
  isInSupportList,
  getFileExtenionName,
  parameterBuilder
}
