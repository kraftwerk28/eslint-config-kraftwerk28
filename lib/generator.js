const { readFileSync } = require('fs')
const { safeLoad } = require('js-yaml')
const { resolve } = require('path')

const isObj = o => o && typeof o === 'object' && !Array.isArray(o)

const deepMerge = (o1, o2) => {
  for (const key in o2) {
    if (isObj(o2[key])) {
      if (!o1[key]) {
        o1[key] = {}
      }
      deepMerge(o1[key], o2[key])
    } else if (Array.isArray(o2[key])) {
      if (!o1[key]) {
        o1[key] = []
      }
      o1[key] = o1[key].concat(o2[key])
    } else {
      o1[key] = o2[key]
    }
  }
  return o1
}

const loadCfg = name => {
  const cfg = safeLoad(readFileSync(
    resolve(__dirname, '../configs', name),
    'utf8'
  ))
  return cfg ? cfg : {}
}

const common = loadCfg('common.yml')

exports.react = () => {
  const react = loadCfg('react.yml')
  return deepMerge(common, react)
}

exports.node = () => {
  const node = loadCfg('node.yml')
  return deepMerge(common, node)
}

exports.common = () => common
