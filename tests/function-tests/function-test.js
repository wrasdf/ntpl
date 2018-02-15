import test from 'ava';
import { exec } from 'child_process'
import { expect } from 'chai'

test.cb('should generate correct template based on yaml', t => {
  let bashScript = './ntpl -t ./tests/function-tests/template.yaml -p ./tests/function-tests/params.yaml'
  exec(bashScript, function(err, stdout, stderr) {
    expect(stdout).have.string('name: kube-demo')
    expect(stdout).have.string('runtime: Hello World')
    t.end()
  });
})

test.cb('should generate correct template based on json', t => {
  let bashScript = './ntpl -t ./tests/function-tests/template.yaml -p ./tests/function-tests/params.json'
  exec(bashScript, function(err, stdout, stderr) {
    expect(stdout).have.string('name: kube-demo')
    expect(stdout).have.string('runtime: Hello World')
    t.end()
  });
})

test.cb('should generate correct template based on environment variables', t => {
  process.env.USERNAME = "Kerry"
  let bashScript = './ntpl -t ./tests/function-tests/template.yaml -p ./tests/function-tests/params.json -e USERNAME'
  exec(bashScript, function(err, stdout, stderr) {
    expect(stdout).have.string('name: kube-demo')
    expect(stdout).have.string('env: Kerry')
    t.end()
  });
})
