const mocha = require('mocha');
const expect = require("chai").expect;
const parser = require('../utils/parser');

describe('parser functions', () => {

  describe(`getFileExtenionName`, () => {
    it(`should return correct file extention`, () => {
      expect(parser.getFileExtenionName(`params1.yaml`)).to.equal('yaml');
      expect(parser.getFileExtenionName(`params1.json`)).to.equal('json');
      expect(parser.getFileExtenionName(`params1.yml`)).to.equal('yml');
    });
  })

  describe(`isInSupportList`, () => {

    it(`should return correct boolean`, () => {
      expect(parser.isInSupportList(`params1.yaml`, ['yaml'])).to.equal(true);
      expect(parser.isInSupportList(`params1.yml`, ['yaml', 'yml'])).to.equal(true);
    });

    it(`should return false boolean`, () => {
      expect(parser.isInSupportList(`params1.yaml`, ['yml'])).to.equal(false);
      expect(parser.isInSupportList(`params1.yml`, ['yaml', 'json'])).to.equal(false);
      expect(parser.isInSupportList(`params1.yml`, [])).to.equal(false);
    });
  })

  describe(`parametersBuilder`, () => {
    it(`should return correct parameters objects`, async () => {
      let list = [`${__dirname}/files/params1.yaml`, `${__dirname}/files/params2.yaml`]
      const results = await parser.parameterBuilder(list)
      expect(results).to.eql({
        "name": "ntpl-demo",
        "namespace": "platform-enablement",
        "version": "v0.2.3"
      })
    })
  })

});
