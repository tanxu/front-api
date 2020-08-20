
const path = require('path')

exports.resolve = function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
export function getWebpackResolveConfig(customAlias = {}) {
  const appPath = exports.APP_PATH;
  return {
    modules: [appPath, 'node_modules'],
    extensions: ['.js', '.json'],
    alias: {
      '@': appPath,
      ...customAlias
    }
  }
}


exports.APP_PATH = exports.resolve('src')
exports.DIST_PATH = exports.resolve('dist')
