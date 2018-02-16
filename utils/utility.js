'use strict';

const fs = require('fs'),
    path = require('path'),
    yaml = require('js-yaml'),
    exec = require('child_process')

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

function createDirectory(directory){
  exec(`mkdir -p ${directory}`, ()=> {
    return true
  })
  // try {
  //   fs.statSync(directory);
  // } catch(e) {
  //   fs.mkdirSync(directory);
  // }
}

function deleteDirectory(directory){
  exec('rm -rf directory')
}

//
// fs.readdir(path, function(err, items) {
//     console.log(items);
//
//     for (var i=0; i<items.length; i++) {
//         console.log(items[i]);
//     }
// });

module.exports = {
  isInSupportList: isInSupportList,
  getFileExtensionName: getFileExtensionName,
  paramsReader: paramsReader,
  createDirectory: createDirectory,
  deleteDirectory: deleteDirectory
}
