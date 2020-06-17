import chai from 'chai'
import { SearchClient as TypesenseSearchClient } from '../../src/Typesense'

let expect = chai.expect

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
  it('should only expose the search endpoint', function (done) {
    expect(typesense.collections).to.throw('Typesense.SearchClient only supports search operations')
    expect(typesense.collections('xyz').documents().search).to.be.a('function')
    expect(typesense.keys).to.be.an('undefined')
    done()
  })
})
