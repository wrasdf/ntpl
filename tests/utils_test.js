const mocha = require('mocha');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const utils = require('../utils/utility');


describe('utils functions', () => {

  describe(`yamlPaser`, () => {
    it(`should parse yaml correctly`, () => {
      expect(utils.yamlPaser(`${__dirname}/files/params1.yaml`)).to.eventually.have.property("name");
      expect(utils.yamlPaser(`${__dirname}/files/params1.yaml`)).to.eventually.have.property("namespace");
      expect(utils.yamlPaser(`${__dirname}/files/params2.yaml`)).to.eventually.have.property("version");
    });
  })

});
