const mocha = require('mocha');
const expect = require("chai").expect;
const sinon = require("sinon");
const utils = require('../utils/utility');

describe('utils functions', () => {

  describe(`yamlParser`, () => {

    it(`should parse yaml correctly`, () => {
      objects = utils.yamlParser(`${__dirname}/files/params1.yaml`)
      expect(objects.app).to.have.property("name");
      expect(objects.app).to.have.property("namespace");
    });

    it(`should parse empty yaml correctly`, () => {
      objects = utils.yamlParser(`${__dirname}/files/empty.yaml`)
      expect(objects).to.eqls({});
    });

  })


  describe(`keyParser`, () => {

    it(`should return correct object`, async () => {
      const results = utils.keyParser("name=Cluster")
      expect(results).to.eql({
        "name": "Cluster",
      })
    })

    it(`should return correct object`, async () => {
      const results = utils.keyParser("app.name=Cluster")
      expect(results).to.eql({
        "app": {
          "name": "Cluster"
        },
      })
    })

    it(`should return correct object`, async () => {
      const results = utils.keyParser("app.name.version=v1.0.3")
      expect(results).to.eql({
        "app": {
          "name": {
            "version": "v1.0.3"
          }
        },
      })
    })

  })

});
