import chai from 'chai'
import Typesense from '../../src/Typesense'

let expect = chai.expect

describe('Client', function () {
  let typesense
  before(function () {
    typesense = new Typesense.Client({
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
})
