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

  describe(`getFileExtenionName`, () => {
    it(`should return correct file extention`, () => {
      return expect(utils.getFileExtenionName(`params1.yaml`)).to.equal('yaml');
      return expect(utils.getFileExtenionName(`params1.json`)).to.equal('json');
      return expect(utils.getFileExtenionName(`params1.yml`)).to.equal('yml');
    });
  })

  describe(`isInSupportList`, () => {

    it(`should return correct boolean`, () => {
      return expect(utils.isInSupportList(`params1.yaml`, ['yaml'])).to.equal(true);
      return expect(utils.isInSupportList(`params1.yml`, ['yaml', 'yml'])).to.equal(true);
    });

    it(`should return false boolean`, () => {
      return expect(utils.isInSupportList(`params1.yaml`, ['yml'])).to.equal(false);
      return expect(utils.isInSupportList(`params1.yml`, ['yaml', 'json'])).to.equal(false);
      return expect(utils.isInSupportList(`params1.yml`, [])).to.equal(false);
    });
  })


});
