require('dotenv').config({ path: '../.env.local' })

const events = require('events')
events.EventEmitter.prototype._maxListeners = 70
events.defaultMaxListeners = 70

const { name, version } = require('../package.json')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')
const path = require('path')

const PORT = parseInt(process.env.PORT, 10) || 6007

const dev = process.env.NODE_ENV === 'development'

const config = require('../next.config')

const app = next({
  dev,
  config,
  dir: path.join(__dirname, '../')
})

const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(PORT, err => {
    if (err) throw err
    const url = `http://localhost:${PORT}`
    console.group()
    console.log(`${name} v${version}`)
    console.log(`Serving ${process.env.AEM_GRAPHQL_URL}`)
    console.log(`➡️  ${url}`)
    console.groupEnd()

    if (process.env.OPEN_IN_BROWSER) {
      const start = (process.platform == 'darwin' ? 'open' : process.platform == 'win32' ? 'start' : 'xdg-open');
      require('child_process').exec(start + ' ' + url);
    }
  })
})
