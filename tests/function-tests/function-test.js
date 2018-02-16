import test from 'ava';
import { exec } from 'child_process'
import { expect } from 'chai'

test.cb('should generate correct template based on yaml', t => {
  let bashScript = './ntpl -t ./tests/function-tests/tpls/template.yaml -p ./tests/function-tests/params/params.yaml'
  exec(bashScript, function(err, stdout, stderr) {
    expect(stdout).have.string('name: kube-demo')
    expect(stdout).have.string('runtime: Hello World')
    t.end()
  });
})

test.cb('should generate correct template based on json', t => {
  let bashScript = './ntpl -t ./tests/function-tests/tpls/template.yaml -p ./tests/function-tests/params/params.json'
  exec(bashScript, function(err, stdout, stderr) {
    expect(stdout).have.string('name: kube-demo')
    expect(stdout).have.string('runtime: Hello World')
    t.end()
  });
})

test.cb('should generate correct template based on environment variables', t => {
  process.env.USERNAME = "Kerry"
  let bashScript = './ntpl -t ./tests/function-tests/tpls/template.yaml -p ./tests/function-tests/params/params.yaml -e USERNAME'
  exec(bashScript, function(err, stdout, stderr) {
    expect(stdout).have.string('name: kube-demo')
    expect(stdout).have.string('env: Kerry')
    t.end()
  });
})

test.cb('should generate correct template into _build folder', t=> {
  let bashScript = './ntpl -d ./tests/function-tests/tpls/ -p ./tests/function-tests/params/params.json'
  exec(bashScript, function(err, stdout, stderr) {
    expect(fs.isFolderExist('_build')).toBe.true
    expect(fs.files('_build/*')).to.equal(2)
    expect(fs.readFileSync('_build/autoscaling.yaml', 'utf8')).have.string('namespace: kube-demo')
    expect(fs.readFileSync('_build/ingress.yaml', 'utf8')).have.string('namespace: kube-demo')
    t.end()
  });
})
