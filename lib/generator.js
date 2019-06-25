'use strict'
const { readFileSync } = require('fs')
const jsyml = require('js-yaml')
const { resolve } = require('path')

const loadCfg = name => {
  const cfg = jsyml.safeLoad(
    readFileSync(resolve(__dirname, '../configs', name), 'utf8'),
    { schema: jsyml.JSON_SCHEMA, json: true }
  )
  return cfg ? cfg : {}
}

;['common', 'react', 'node'].forEach(n => {
  exports[n] = () => loadCfg(n + '.yml')
})
