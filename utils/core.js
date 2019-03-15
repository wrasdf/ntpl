'use strict';

const utils = require('./utility'),
    Mustache = require('mustache'),
    parser = require('./parser'),
    merge = require('deepmerge'),
    buildPath = '_build'

function templateRender(ntpl) {
  const fileContent = utils.readfile(ntpl.template),
        params = parser.getParameters(ntpl)
  utils.appendFile(ntpl.output, Mustache.render(fileContent, params))
}

function kubeCompile(ntpl) {
  const params = parser.getParameters(ntpl),
        components = ntpl.components
  // Clean build folder
  utils.rmdir(buildPath)
  components.map(component => utils.mkdir(`${process.cwd()}/${buildPath}/${component}`))

  // Compile Components From Templates Folder to Build Folder
  components.map(component => {
    const files = utils.readdir(`${process.cwd()}/templates/${component}`)
    files.map(file => {
      const fileContent = utils.readfile(file)
      utils.appendFile(file.replace(/templates/, buildPath), Mustache.render(fileContent, params))
    })
  })

}

function kubeValidate(ntpl) {
  kubeCompile(ntpl)
  ntpl.components.map(component => {
    const files = utils.readdir(`${process.cwd()}/${buildPath}/${component}`)
    files.map(file => utils.exec(`kubectl apply --validate --dry-run -f ${file}`))
  })
}

function kubeApply(ntpl) {
  kubeCompile(ntpl)
  ntpl.components.map(component => {
    const files = utils.readdir(`${process.cwd()}/${buildPath}/${component}`)
    files.map(file => utils.exec(`kubectl apply -f ${file}`))
  })
}

function kubeDelete(ntpl) {
  kubeCompile(ntpl)
  ntpl.components.map(component => {
    const files = utils.readdir(`${process.cwd()}/${buildPath}/${component}`)
    files.map(file => utils.exec(`kubectl delete -f ${file}`))
  })
}

module.exports = {
  templateRender,
  kubeCompile,
  kubeValidate,
  kubeApply,
  kubeDelete
}
