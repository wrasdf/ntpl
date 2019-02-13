const mocha = require('mocha');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const utils = require('../utils/utility');


describe('utils functions', () => {

  describe(`yamlPaser`, () => {
    it(`should parse yaml correctly`, () => {
      return expect(utils.yamlPaser(`${__dirname}/files/params1.yaml`)).to.eventually.have.property("name");
      return expect(utils.yamlPaser(`${__dirname}/files/params1.yaml`)).to.eventually.have.property("namespace");
      return expect(utils.yamlPaser(`${__dirname}/files/params2.yaml`)).to.eventually.have.property("version");
    });
  })

});
