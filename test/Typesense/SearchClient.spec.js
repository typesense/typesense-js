import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {SearchClient as TypesenseSearchClient} from '../../src/Typesense'
import MockAxiosAdapter from 'axios-mock-adapter'
import axios from 'axios'
import ApiCall from '../../src/Typesense/ApiCall'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('SearchClient', function () {
  let typesense
  before(function () {
    typesense = new TypesenseSearchClient({
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })
  })
  it('should set the right default configuration values', function (done) {
    expect(typesense.configuration.nodes).to.eql(
      [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http',
        'path': ''
      }])
    expect(typesense.configuration.connectionTimeoutSeconds).to.eql(10)
    expect(typesense.configuration.apiKey).to.eql('abcd')
    done()
  })
  it('should only expose the search endpoints', function (done) {
    expect(typesense.collections).to.throw('Typesense.SearchClient only supports search operations')
    expect(typesense.collections('xyz').documents().search).to.be.a('function')
    expect(typesense.multi_search.perform).to.be.a('function')
    expect(typesense.keys).to.be.an('undefined')
    done()
  })

  it('should send the api key via GET', function (done) {
    let mockAxios = new MockAxiosAdapter(axios)
    let apiCall = new ApiCall(typesense.configuration)
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
          'Content-Type': 'text/plain'
        }
      )
      .reply(config => {
        expect(config.params).to.deep.equal(
          Object.assign({},
            commonParams,
            {'x-typesense-api-key': typesense.configuration.apiKey}
          )
        )
        return [200, '{}', {'content-type': 'application/json'}]
      })

    let returnData = typesense.multi_search.perform(searches, commonParams)

    expect(returnData).to.eventually.deep.equal({}).notify(done)
  })
})
