const mocha = require('mocha');
const expect = require("chai").expect;
const sinon = require("sinon");
const utils = require('../utils/utility');

describe('utils functions', () => {

  describe(`yamlParser`, () => {
    it(`should parse yaml correctly`, () => {
      objects = utils.yamlParser(`${__dirname}/files/params1.yaml`)
      expect(objects).to.have.property("name");
      expect(objects).to.have.property("namespace");
    });
  })


  describe(`keyParser`, () => {
    it(`should return correct object`, async () => {
      const results = utils.keyParser("name=Cluster")
      expect(results).to.eql({
        "name": "Cluster",
      })
    })
  })

});
