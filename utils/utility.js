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

function yamlPaser(filePath) {
  return yaml.load(readfile(filePath), 'utf8')
}

function readdir(dir) {
  return fs.readdirSync(dir).map(f => join(dir, f))
}

function rreaddir(dir, allFiles = []) {
  const files = fs.readdirSync(dir).map(f => join(dir, f))
  allFiles.push(...files)
  files.forEach(f => {
    fs.statSync(f).isDirectory() && readdir(f, allFiles)
  })
  return allFiles
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}

function getFoldersByFiles(files, dir, dest) {
  return files.map(file => file.split('/').slice(0, -1).join('/'))
    .filter(onlyUnique)
    .map(folder => folder.replace(new RegExp(dir), `${dest}`))
}

function createdirs(dir, destination) {
  rmdir(destination)
  let folders = getFoldersByFiles(readdir(dir))
    .map(folder => folder.replace(new RegExp(dir), `${destination}`))
    .map(folder => mkdir(`${folder}`))
}

function readfile(path) {
  return fs.readFileSync(path, 'utf8');
}

function appendFile(path, content) {
  return fs.appendFileSync(path, content, 'utf8');
}

module.exports = {
  yamlPaser,
  appendFile,
  exec,
  mkdir,
  rmdir,
  readdir,
  readfile,
  getFoldersByFiles,
  createdirs
}
