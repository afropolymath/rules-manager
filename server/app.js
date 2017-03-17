const path = require('path')
const jwt = require('restify-jwt')
const restify = require('restify')
const plugins = require('restify-plugins')
const restifyValidation = require('node-restify-validation')

const ManagementClient = require('auth0').ManagementClient

const PROJECT_DIR = path.dirname(__dirname)
const PORT = Number(process.env.PORT || 7000)

const authCheck = jwt({
  secret: 'mGWiuyw45t0lo95rtJGWmdvrqG_WA8bF7II5plVgagHI3bARq-aZeD_UBgbtrImH',
  audience: 'l5ClHK3PirB6J8C3NFbE54bWlIBZKnsA'
})

const management = new ManagementClient({
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1VRkZORVZGTmpsQk1UVkVRall3TlVVNE5VWXdORUU1T0RJM056VTFRa1E1UlRkRU5rVkZPQSJ9.eyJpc3MiOiJodHRwczovL2NoaWRpZWJlcmVubmFkaS5hdXRoMC5jb20vIiwic3ViIjoiZkZEcDRwbkltaktkTTlBUjZDdDU5OGVBeU9WUE5UbmxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vY2hpZGllYmVyZW5uYWRpLmF1dGgwLmNvbS9hcGkvdjIvIiwiZXhwIjoxNDkwMzE0ODkwLCJpYXQiOjE0ODk3MTAwOTAsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6ZW1haWxfcHJvdmlkZXIgdXBkYXRlOmVtYWlsX3Byb3ZpZGVyIGRlbGV0ZTplbWFpbF9wcm92aWRlciBjcmVhdGU6ZW1haWxfcHJvdmlkZXIgYmxhY2tsaXN0OnRva2VucyByZWFkOnN0YXRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6c2hpZWxkcyBjcmVhdGU6c2hpZWxkcyBkZWxldGU6c2hpZWxkcyByZWFkOmdyYW50cyBkZWxldGU6Z3JhbnRzIHJlYWQ6Z3VhcmRpYW5fZmFjdG9ycyB1cGRhdGU6Z3VhcmRpYW5fZmFjdG9ycyByZWFkOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGRlbGV0ZTpndWFyZGlhbl9lbnJvbGxtZW50cyBjcmVhdGU6Z3VhcmRpYW5fZW5yb2xsbWVudF90aWNrZXRzIHJlYWQ6dXNlcl9pZHBfdG9rZW5zIn0.TabPHHU8AtUTA_sLivHl1Dn0WKoKD3Ijm1pJf8RFhpZkcHEYjc0FYhzH5rOICK4Q8BXiTWeqUvnX6Rfl4LFLLOMc01gVLtPXsG0nC_1rj_WxPi1McL4CAfagfJTk3-DxlEMETJ17shvD8WbrPhYoKUAHfoLBKWr_TMbGUZcw7Acs47PRSZbJAwFHCHiWgfl_Pju7-9FouyZBulxiZ86GXY7f0LC5EwVA1Uy_ulkSGIsZc6mXcYhDehXhaAraMkYL2GIqANJGLcuyqEdxfX3d5TN4lJFn16Oy6rwIzTRZiqT1IoWfueD7zogp4P98jWELGXWubP05MiBbpjtuH58Cew',
  domain: 'chidieberennadi.auth0.com'
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

server.get('/rules', authCheck, (req, res, next) => {
  if (!req.user) {
    res.send(401)
  }
  management.getRules().then((rules) => {
    res.send(200, rules)
  })
})

server.get('/clients', authCheck, (req, res, next) => {
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
