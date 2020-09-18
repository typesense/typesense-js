import chai from 'chai'
import { Client as TypesenseClient } from '../../src/Typesense'
import { MissingConfigurationError } from '../../src/Typesense/Errors'

let expect = chai.expect

describe('Configuration', function () {
  let typesense
  beforeEach(function () {
    typesense = new TypesenseClient({
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
    }).to.throw(MissingConfigurationError)

    done()
  })

  it('throws an error if apiKey is missing', function (done) {
    typesense.configuration.apiKey = undefined

    expect(() => {
      typesense.configuration.validate()
    }).to.throw(MissingConfigurationError)

    done()
  })
})
