import chai from 'chai'
import Typesense from '../../src/Typesense'

let expect = chai.expect

describe('Client', function () {
  let typesense
  before(function () {
    typesense = new Typesense.Client()
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
