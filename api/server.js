const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const handleDatabaseNotConnected = res => res.status(503).send({error: 'database not connected'})

const middleware = {
  connectionValidator: db => (req, res, next) => db.isConnected() ? next() : handleDatabaseNotConnected(res),
  serverErrorHandler: (err, req, res, next) => res.status(500).send({error: err.message}),
  endpointNotFoundHandler: (req, res) => res.status(404).send({error: 'endpoint not found'})
}

module.exports = {
  create: ({config = {}}) => {
    const {port = 80, name = 'API'} = config
    const server = express()
    return {
      run: ({database, routes = {}}) => {
        const {get = {}, post = {}} = routes
        server
          .use(morgan('tiny'))
          .use(middleware.connectionValidator(database))
          .use(bodyParser.json())
        Object.keys(get).forEach(route => server.get(route, async (req, res) => {
          const result = (await get[route](req)) || {status: 'Done'}
          return res.send(result)
        }))
        Object.keys(post).forEach(route => server.post(route, async (req, res) => {
          console.log('req', req)
          const result = (await post[route](req)) || {status: 'Done'}
          return res.status(201).send(result)
        }))
        server
          .use(middleware.serverErrorHandler)
          .use(middleware.endpointNotFoundHandler)
          .listen(port, () => console.log(`Running ${name}`))
      }
    }
  }
}
