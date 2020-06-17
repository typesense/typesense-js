import chai from 'chai'
import { Client as TypesenseClient } from '../src/Typesense'

let expect = chai.expect

describe('Typesense', function () {
  it('should have a Client object that can be instantiated', function (done) {
    let client = new TypesenseClient({
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })

    expect(client.configuration).to.be.an('object')
    done()
  })
})
