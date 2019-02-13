const mocha = require('mocha');
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;
const parser = require('../utils/parser');

describe('parser functions', () => {

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
