const axios = require('axios')

const baseUrl = 'http://localhost:8080'

const testEndpoint = (url, code, name) => {
  test(name, async () => {
    expect.assertions(2)
    try {
      const { status, data } = await axios.get(`${baseUrl}/${url}`)
      expect(status).toEqual(code)
      expect(data).toMatchSnapshot()
    } catch (e) {
      console.error(e)
    }
  })
}

const testError = (url, code, name) => {
  test(name, async () => {
    expect.assertions(2)
    try {
      await axios.get(`${baseUrl}/${url}`)
    } catch ({ response }) {
      const { status, data } = response
      expect(status).toEqual(code)
      expect(data).toMatchSnapshot()
    }
  })
}

testEndpoint('', 200, 'API is running')
testEndpoint('client', 200, 'API returns a list of clients')
testEndpoint('lot', 200, 'API returns a list of lots')
testError('unknown', 404, 'API returns a not found error')

test('API creates a client and a lot', async () => {
  expect.assertions(6)
  const client = {
    fullname: 'Victor Nitu',
    email: 'nitu.v.r@gmail.com',
    email2: 'victor.nitu@vvfluxembourg.com',
    telDomicile: '+33 123 123',
    telPro: '+44 234 234',
    telMobile: '+32 345 345',
    telMobile2: '+352 456 456',
    fax: '+49 567 567',
    sexe: 'M'
  }
  const lot = {
    surface: 35
  }
  try {
    // Create a new client
    const clientResponse = await axios.post(`${baseUrl}/client`, client)
    expect(clientResponse.status).toEqual(201)
    expect(clientResponse.data).toMatchObject(client)
    // Check new client is in the list of clients
    const clientId = clientResponse.data._id
    const clients = await axios.get(`${baseUrl}/client`)
    const savedClient = clients.data.clients.find(c => c._id === clientId)
    expect(savedClient).toEqual(clientResponse.data)
    // Set lot client to the newly created client
    lot.client = clientId
    // Create a new lot
    const lotResponse = await axios.post(`${baseUrl}/lot`, lot)
    expect(lotResponse.status).toEqual(201)
    expect(lotResponse.data).toMatchObject(lot)
    // Check new lot is in the list of lots
    const lotId = lotResponse.data._id
    const lots = await axios.get(`${baseUrl}/lot`)
    const savedLot = lots.data.lots.find(l => l._id === lotId)
    expect(savedLot).toEqual(lotResponse.data)
  } catch (e) {
    console.error(e)
  }
})
