let expect = require('chai').expect,
    utils = require('../../utils/utility')


describe("utility", ()=>{

  let jsonPath = './tests/unit-tests/test.json',
      yamlPath = './tests/unit-tests/test.yaml'

  it("should return correct file extname", ()=>{
    expect(utils.getFileExtensionName('test.yaml')).to.equal('yaml');
    expect(utils.getFileExtensionName('test.json')).to.equal('json');
    expect(utils.getFileExtensionName('test.yml')).to.equal('yml');
  })

  it("should return true if the file type in supoort list", ()=>{
    expect(utils.isInSupportList('test.yaml', ['yaml'])).to.be.true;
    expect(utils.isInSupportList('test.json', ['yaml', 'json', 'yml'])).to.equal(true);
  })

  it("should throw erros if the file type not in supoort list", ()=>{
    expect(utils.isInSupportList.bind(utils, 'test.yaml', ['yal'])).to.throw('Only support yal');
  })

  it("should return correct json values", ()=>{
    expect(utils.paramsReader(jsonPath).test).to.equal('Value from json')
  })

  it("should return correct yaml values", ()=> {
    expect(utils.paramsReader(yamlPath).test).to.equal('Value from yaml')
  })

})
