import chai from 'chai'
import Typesense from '../../src/Typesense'

let expect = chai.expect

describe('Typesense', function () {
  let typesense
  beforeEach(function () {
    typesense = new Typesense.Client({
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })
  })

  it('throws an error if there is a missing config value in nodes', function (done) {
    delete typesense.configuration.nodes[0].host

    expect(() => {
      typesense.configuration.validate()
    })
      .to.throw('Missing required configuration. Ensure that nodes[].protocol, nodes[].host and nodes[].port are set.')

    done()
  })

  it('throws an error if apiKey is missing', function (done) {
    typesense.configuration.apiKey = undefined

    expect(() => {
      typesense.configuration.validate()
    })
      .to.throw('Missing required configuration. Ensure that apiKey is set.')

    done()
  })
})
