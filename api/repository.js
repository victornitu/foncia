const Client = require('./schema/client')
const Lot = require('./schema/lot')

module.exports = {
  create: () => ({
    listClients: async () => {
      return {
        clients: await Client.find().exec()
      }
    },
    listLots: async () => {
      return {
        lots: await Lot.find().exec()
      }
    },
    addClient: async ({ body }) => {
      console.log('body', body)
      const client = new Client({ ...body })
      return await client.save()
    },
    addLot: async ({ body }) => {
      const lot = new Lot(body)
      return await lot.save()
    }
  })
}
