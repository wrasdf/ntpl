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

});
