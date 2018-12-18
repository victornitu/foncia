const Client = require('./schema/client')
const Lot = require('./schema/lot')

const listEntity = ({ name, Schema }) => async ({ query }) => {
  try {
    const [page, size] = [parseInt(query.page) || 1, parseInt(query.size) || 5]
    const offset = (page - 1) * size
    const entities = await Schema.find()
      .skip(offset)
      .limit(size)
      .exec()
    return {
      [name]: entities,
      next: entities.length === size ? `?page=${page + 1}&size=${size}` : null,
      previous: page > 1 ? `?page=${page - 1}&size=${size}` : null
    }
  } catch (e) {
    throw Error(`Failed to list ${name}: ${e.message}`)
  }
}

module.exports = {
  create: () => ({
    listClients: listEntity({ name: 'clients', Schema: Client }),
    listLots: listEntity({ name: 'lots', Schema: Lot }),
    addClient: async ({ body }) => {
      try {
        const client = new Client(body)
        return await client.save()
      } catch (e) {
        throw Error(`Failed to create client: ${e.message}`)
      }
    },
    addLot: async ({ body }) => {
      try {
        const lot = new Lot(body)
        return await lot.save()
      } catch (e) {
        throw Error(`Failed to create lot: ${e.message}`)
      }
    }
  })
}
