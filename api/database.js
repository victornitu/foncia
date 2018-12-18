const mongoose = require('mongoose')

const retryTimeout = 5000

module.exports = {
  create: ({ config = {} }) => {
    const { host = 'localhost', name = 'test' } = config
    const state = { connected: false }
    const statusMessage = status =>
      `Connection to MongoDB (name = ${name}, host = ${host}): ${status}`
    return {
      connect: () => {
        const requestConnection = () => {
          console.log(statusMessage('Requested'))
          mongoose.connect(`mongodb://${host}/${name}`, {
            useNewUrlParser: true
          })
        }
        requestConnection()
        const db = mongoose.connection
        db.on('error', err => {
          console.error(statusMessage('Failed'))
          console.error('Error:', err.message)
          console.log(
            'Retry connection to MongoDB in',
            retryTimeout / 1000,
            'seconds'
          )
          setTimeout(requestConnection, retryTimeout)
        })
        db.once('open', () => {
          state.connected = true
          console.log(statusMessage('Succeeded'))
        })
      },
      isConnected: () => state.connected
    }
  }
}
