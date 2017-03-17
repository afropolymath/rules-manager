const path = require('path')
const jwt = require('restify-jwt')
const restify = require('restify')
const plugins = require('restify-plugins')
const restifyValidation = require('node-restify-validation')

require('dotenv').config()

const ManagementClient = require('auth0').ManagementClient

const PROJECT_DIR = path.dirname(__dirname)
const PORT = Number(process.env.PORT || 7000)

const authCheck = jwt({
  secret: process.env.AUTH0_CLIENT_SECRET,
  audience: process.env.AUTH0_CLIENT_ID
})

const management = new ManagementClient({
  token: process.env.AUTH0_TOKEN,
  domain: process.env.AUTH0_DOMAIN
})

const server = restify.createServer({
  name: 'Rules Manager',
  version: '1.0.0'
})

server.use(plugins.acceptParser(server.acceptable))
server.use(plugins.queryParser())
server.use(plugins.bodyParser())
server.use(plugins.fullResponse())
server.use(restifyValidation.validationPlugin({
  errorsAsArray: false,
  forbidUndefinedVariables: false,
  errorHandler: restify.errors.InvalidArgumentError
}))

server.get('/api/rules', authCheck, (req, res, next) => {
  if (!req.user) {
    res.send(401)
  }
  management.getRules().then((rules) => {
    res.send(200, rules)
  })
})

server.get('/api/clients', authCheck, (req, res, next) => {
  if (!req.user) {
    res.send(401)
  }
  management.getClients().then((clients) => {
    res.send(200, clients)
  })
})

server.get('/.*/', restify.serveStatic({
  directory: path.join(PROJECT_DIR, 'dist'),
  default: 'index.html'
}))

server.listen(PORT, () => {
  /* eslint-disable no-console */
  console.log('%s listening at %s', server.name, server.url)
})
