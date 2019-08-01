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
      if (fileContent) {
        const renderContent = Mustache.render(fileContent, params)
        if (renderContent) {
            utils.appendFile(file.replace(/templates/, buildPath), renderContent)
        }
      }
    })
  })

}

function kubeValidate(ntpl) {
  kubeCompile(ntpl)
  ntpl.components.map(component => {
    utils.exec(`kubectl apply --validate --dry-run -f ${process.cwd()}/${buildPath}/${component}`)
  })
}

function kubeApply(ntpl) {
  kubeCompile(ntpl)
  ntpl.components.map(component => {
    utils.exec(`kubectl apply -f ${process.cwd()}/${buildPath}/${component}`)
  })
}

function kubeDelete(ntpl) {
  kubeCompile(ntpl)
  ntpl.components.map(component => {
    utils.exec(`kubectl delete -f ${process.cwd()}/${buildPath}/${component}`)
  })
}

module.exports = {
  templateRender,
  kubeCompile,
  kubeValidate,
  kubeApply,
  kubeDelete
}
