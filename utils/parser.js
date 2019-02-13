'use strict';

const utils = require('./utility')

function parameterBuilder(files) {
  return Promise.all(files.map(file => utils.yamlPaser(file)))
    .then(objectArray => objectArray.reduce(
        (accumulator, currentValue) => Object.assign(accumulator, currentValue), {}
      )
    )
}

module.exports = {
  parameterBuilder
}
