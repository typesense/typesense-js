import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {Client as TypesenseClient} from '../../src/Typesense'
import ApiCall from '../../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Search', function () {
  let mockAxios
  let typesense
  let apiCall
  before(function () {
    mockAxios = new MockAxiosAdapter(axios)
    typesense = new TypesenseClient({
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })
    apiCall = new ApiCall(typesense.configuration)
  })

  describe('.perform', function () {
    it('performs a multi-search', function (done) {
      let searches = {
        searches: [
          {q: 'term1'},
          {q: 'term2'}
        ]
      }
      let commonParams = {
        collection: 'docs',
        query_by: 'field'
      }

      mockAxios
        .onPost(
          apiCall._uriFor('/multi_search', typesense.configuration.nodes[0]),
          searches,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(config => {
          expect(config.params).to.deep.equal(commonParams)
          return [200, '{}', {'content-type': 'application/json'}]
        })

      let returnData = typesense.multi_search.perform(searches, commonParams)

      expect(returnData).to.eventually.deep.equal({}).notify(done)
    })
  })
})
