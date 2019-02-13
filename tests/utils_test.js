const mocha = require('mocha');
const expect = require("chai").expect;
const utils = require('../utils/utility');

describe('utils functions', () => {

  describe(`yamlPaser`, () => {
    it(`should parse yaml correctly`, async () => {
      const objects = await utils.yamlPaser(`${__dirname}/files/params1.yaml`)
      expect(objects).to.have.property("name");
      expect(objects).to.have.property("namespace");
    });
  })

});
