import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import TypesenseClient from '../lib/Typesense/Client'
import ApiCall from '../lib/Typesense/ApiCall'
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
    typesense = new TypesenseClient({
      'masterNode': {
        'host': 'master',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      },
      'readReplicaNodes': [{
        'host': 'read-replica',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      }],
      'timeout': 10
    })
    apiCall = new ApiCall(typesense.configuration)
  })

  describe('.retrieve', function () {
    it('retrieves debugging information', function (done) {
      let debugInfo = {version: '0.8.0'}
      mockAxios
        .onGet(
          apiCall._uriFor('/debug'),
          undefined,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, debugInfo)

      let returnData = typesense.debug.retrieve()

      expect(returnData).to.eventually.deep.equal(debugInfo).notify(done)
    })
  })
})
