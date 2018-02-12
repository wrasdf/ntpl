const expect = require('chai').expect,
  exec = require('child_process').exec;

describe("utility", ()=>{

  it("should generate correct template based on yaml", ()=>{
    let bashScript = './ntpl -t ./tests/function-tests/template.yaml -p ./tests/function-tests/params.yaml'
    exec(bashScript, function(err, stdout, stderr) {
      expect(stdout).have.string('name: "kube-demo"');
      expect(stdout).have.string('namespace: "kube-demo"');
    });
  })

  it("should generate correct template based on json", ()=>{
    let bashScript = './ntpl -t ./tests/function-tests/template.yaml -p ./tests/function-tests/params.json'
    exec(bashScript, function(err, stdout, stderr) {
      expect(stdout).have.string('name: "kube-demo"');
      expect(stdout).have.string('app: "kube-demo"');
    });
  })

  it("should generate correct template based on environment variables", ()=> {
    process.env.USERNAME = "Kerry"
    let bashScript = './ntpl -t ./tests/function-tests/template.yaml -p ./tests/function-tests/params.json -e USERNAME'
    exec(bashScript, function(err, stdout, stderr) {
      expect(stdout).have.string('name: "kube-demo"');
      expect(stdout).have.string('USERNAME: "Kerry"');
    });
  })

})
