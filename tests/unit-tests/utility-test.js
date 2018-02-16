import test from 'ava';
import path from 'path';
import { expect } from 'chai';
import utils from '../../utils/utility';
import fs from 'fs';
import {exec} from 'child_process';

let jsonPath = path.join(__dirname, 'test.json'),
    yamlPath = path.join(__dirname, 'test.yaml');

test('should return correct file extname', t => {
  expect(utils.getFileExtensionName('test.yml')).to.equal('yml')
  expect(utils.getFileExtensionName('test.yaml')).to.equal('yaml')
  expect(utils.getFileExtensionName('test.json')).to.equal('json')
  t.pass()
});

test('should return true if the file type in supoort list', t => {
  t.true(utils.isInSupportList('test.yaml', ['yaml']))
  t.true(utils.isInSupportList('test.json', ['yaml', 'json', 'yml']))
});

test('should return correct json values', t=> {
  t.is(utils.paramsReader(jsonPath).test, 'Value from json')
})

test('should return correct yaml values', t=> {
  t.is(utils.paramsReader(yamlPath).test, 'Value from yaml')
})

test('should throw erros if the file type not in supoort list', t => {
  const error = t.throws(() => {
		utils.isInSupportList('test.yaml', ['yal'])
	}, Error);
	t.is(error.message, 'Only support yal');
})

test('should create _build template folder', t=> {
  utils.createDirectory('_build')
  expect(fs.existsSync('_build')).to.be.true
  t.pass()
})

// test('should return remove _build template folder', t=> {
//   utils.removeDirectory('_build')
//   expect(fs.existsSync('_build')).to.be.false
//   t.pass()
// })
