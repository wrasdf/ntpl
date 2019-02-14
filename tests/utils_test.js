const mocha = require('mocha');
const expect = require("chai").expect;
const sinon = require("sinon");
const utils = require('../utils/utility');

describe('utils functions', () => {

  describe(`yamlPaser`, () => {
    it(`should parse yaml correctly`, () => {
      objects = utils.yamlPaser(`${__dirname}/files/params1.yaml`)
      expect(objects).to.have.property("name");
      expect(objects).to.have.property("namespace");
    });
  })

  // describe('getFoldersByFiles', () => {
  //   it(`should return all folders`, async () => {
  //     const files = [
  //       '/app/test1.yaml',
  //       '/app/test2/a.yaml',
  //       '/app/test2/b.yaml',
  //       '/app/test3/a.yaml',
  //       '/app/test3/c.yaml',
  //       '/app/test3/test4/a.yml'
  //     ]
  //     // const objects = utils.createdirs(`${__dirname}/files`, `${__dirname}/_build`)
  //     expect(utils.getFoldersByFiles(files)).to.eql([
  //       '/app',
  //       '/app/test2',
  //       '/app/test3',
  //       '/app/test3/test4'
  //     ])
  //   });
  // })
});
