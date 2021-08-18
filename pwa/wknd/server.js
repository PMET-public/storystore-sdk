require('dotenv').config({ path: './.env.local' })

const events = require('events')
events.EventEmitter.prototype._maxListeners = 70
events.defaultMaxListeners = 70

const { name, version } = require('./package.json')
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const PORT = parseInt(process.env.PORT, 10) || 6007

const dev = process.env.NODE_ENV === 'development'

const config = require('./next.config')

const app = next({ dev, config, dir: __dirname })

const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    handle(req, res, parsedUrl)
  }).listen(PORT, err => {
    if (err) throw err
    console.group()
    console.log(`${name} v${version}`)
    console.log(`Serving ${process.env.AEM_GRAPHQL_URL}`)
    console.log(`➡️  http://localhost:${PORT}`)
    console.groupEnd()
  })
})
