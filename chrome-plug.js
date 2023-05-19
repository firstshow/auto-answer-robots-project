const fs = require('fs-extra')
const chokidar = require('chokidar')
const path = require('path')
const { resolve } = path

const r = (rootPath) => resolve(__dirname, './', rootPath)

let origin = {
  manifest: r('./src/manifest.json'),
  assets: r('./src/assets')
}

const target = {
  manifest: r('dist/manifest.json'),
  assets: r('dist/resources')
}

const copyFiles = () => {
  for (let name in origin) {
    fs.copy(origin[name], target[name])
  }
}

copyFiles()

// 监听文件变化，同步至插件根目录
chokidar.watch([origin.manifest])
  .on('change', () => {
    copyFiles()
  })

return null