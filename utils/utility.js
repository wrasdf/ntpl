'use strict';

const fs = require('fs'),
    path = require('path'),
    shell = require('shelljs'),
    yaml = require('js-yaml');

function mkdir(directory) {
  return new Promise(resolve => {
    shell.mkdir('-p', directory);
    return resolve(true);
  })
}

function rmdir(directory) {
  return new Promise(resolve => {
    shell.rm('-rf', directory);
    return resolve(true);
  })
}

function yamlPaser(filePath) {
  return readfile(filePath).then(content => yaml.load(content, 'utf8'))
}

async function readdir(directory) {
  return await fs.promises.readdir(directory);
}

async function readfile(path) {
  return await fs.promises.readFile(path,'utf8');
}

async function appendFile(path, content) {
  return await fs.promises.appendFile(path, content, 'utf8');
}

function clean(directory) {
  return rmdir(directory).then(() => mkdir(directory))
}

module.exports = {
  yamlPaser,
  appendFile,
  mkdir,
  clean,
  readdir,
  readfile
}
