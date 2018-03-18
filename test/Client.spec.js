import chai from 'chai'
import TypesenseClient from '../lib/Typesense/Client'

let expect = chai.expect

describe('Typesense', function () {
  let typesense
  before(function () {
    typesense = new TypesenseClient()
  })
  it('should set the right default configuration values', function (done) {
    expect(typesense.configuration).to.eql({
      'masterNode': {
        'host': 'localhost',
        'port': '8108',
        'protocol': 'http'
      },
      'readReplicaNodes': [],
      'timeoutSeconds': 10
    })
    done()
  })
})
