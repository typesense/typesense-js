import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Typesense from '../../src/Typesense'
import ApiCall from '../../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Debug', function () {
  let mockAxios
  let typesense
  let apiCall
  before(function () {
    mockAxios = new MockAxiosAdapter(axios)
    typesense = new Typesense.Client({
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })
    apiCall = new ApiCall(typesense.configuration)
  })

  describe('.retrieve', function () {
    it('retrieves debugging information', function (done) {
      let debugInfo = {version: '0.8.0'}
      mockAxios
        .onGet(
          apiCall._uriFor('/debug', 0),
          undefined,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, debugInfo)

      let returnData = typesense.debug.retrieve()

      expect(returnData).to.eventually.deep.equal(debugInfo).notify(done)
    })
  })
})
