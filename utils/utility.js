'use strict';

const join = require('path').join,
      fs = require('fs'),
      shell = require('shelljs'),
      yaml = require('js-yaml')

function exec(script) {
  return shell.exec(script);
}

function mkdir(directory) {
  return shell.mkdir('-p', directory);
}

function rmdir(directory) {
  return shell.rm('-rf', directory);
}

function yamlParser(filePath) {
  return yaml.load(readfile(filePath), 'utf8')
}

function keyParser(keypair) {
  const result = {}
  const arr = keypair.split('=')
  arr[1] && (result[arr[0]] = arr[1])
  return result
}

function readdir(dir) {
  return fs.readdirSync(dir).map(f => join(dir, f))
}

function readfile(path) {
  return fs.readFileSync(path, 'utf8');
}

function appendFile(path, content) {
  return fs.appendFileSync(path, content, 'utf8');
}

module.exports = {
  yamlParser,
  keyParser,
  exec,
  mkdir,
  rmdir,
  readdir,
  readfile,
  appendFile
}
