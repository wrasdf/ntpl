const mocha = require('mocha');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const parser = require('../utils/parser');

describe('parser functions', () => {

  describe(`getFileExtenionName`, () => {
    it(`should return correct file extention`, () => {
      return expect(parser.getFileExtenionName(`params1.yaml`)).to.equal('yaml');
      return expect(parser.getFileExtenionName(`params1.json`)).to.equal('json');
      return expect(parser.getFileExtenionName(`params1.yml`)).to.equal('yml');
    });
  })

  describe(`isInSupportList`, () => {

    it(`should return correct boolean`, () => {
      return expect(parser.isInSupportList(`params1.yaml`, ['yaml'])).to.equal(true);
      return expect(parser.isInSupportList(`params1.yml`, ['yaml', 'yml'])).to.equal(true);
    });

    it(`should return false boolean`, () => {
      return expect(parser.isInSupportList(`params1.yaml`, ['yml'])).to.equal(false);
      return expect(parser.isInSupportList(`params1.yml`, ['yaml', 'json'])).to.equal(false);
      return expect(parser.isInSupportList(`params1.yml`, [])).to.equal(false);
    });
  })

  describe(`parametersBuilder`, () => {
    it(`should return correct parameters objects`, (done) => {
      let list = [`${__dirname}/files/params1.yaml`, `${__dirname}/files/params2.yaml`]
      return parser.parameterBuilder(list).then(objs => {
        expect(objs).to.eql({
          "name": "ntpl-demo",
          "namespace": "platform-enablement",
          "version": "v0.2.3"
        })
      }, done())
    })
  })

});
