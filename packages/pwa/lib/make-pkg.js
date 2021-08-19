const { compile } = require('nexe')
const { readdirSync, copy } = require('fs-extra')
const path = require('path')
const { name } = require('../package.json')

const APP_NAME = 'WKND'
const APP_CONTENT_PATH = path.join(__dirname, `../pkg/${APP_NAME}.app/Contents/MacOS/`)

const modules = readdirSync(path.join(__dirname, '../../../node_modules/@storystore'), { withFileTypes: true })
  .filter(dirent => '@storystore/' + dirent.name !== name)
  .map(dirent => dirent.name)
  .join(',')

compile({
  input: path.join(__dirname, './server.js'),
  output: APP_CONTENT_PATH + APP_NAME,
  loglevel: 'info', // loglevel, info, silent, or verbose
  targets: ['v12.9.1'],
  resources: [
    'public/**/*',
    '.next/**/*',
    `../../node_modules/@storystore/{${modules}}/{{*.js,package.json},dist/**/*}`,
    '../../node_modules/@surma/rollup-plugin-off-main-thread/loader.ejs',
  ],
}).then(() => {
  copy(path.join(__dirname, '../.env.local'), APP_CONTENT_PATH + '.env.local')
  copy(path.join(__dirname, '../.next/server/pages'), APP_CONTENT_PATH + '.next/server/pages')
})
