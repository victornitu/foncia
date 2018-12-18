const config = require('config')
const serverBuilder = require('./server')
const databaseBuilder = require('./database')
const repositoryBuilder = require('./repository')

const {API, Database} = config

const database = databaseBuilder.create({config: Database})
const repository = repositoryBuilder.create();
const server = serverBuilder.create({config: API})
database.connect()
server.run({
  database,
  routes: {
    get: {
      '/': async () => ({status: 'running'}),
      '/client': repository.listClients,
      '/lot': repository.listLots
    },
    post: {
      '/client': repository.addClient,
      '/lot': repository.addLot
    }
  }
})
