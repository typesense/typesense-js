import chai from 'chai'
import Typesense from '../lib/typesense'

var expect = chai.expect

describe('Typesense', function () {
  let typesense
  before(function () {
    typesense = new Typesense()
  })
  it('should set the right default configuration values', function (done) {
    expect(typesense.__configuration).to.eql({
      'master_node': {
        'host': 'localhost',
        'port': '8108',
        'protocol': 'http'
      },
      'read_replica_nodes': [],
      'timeout': 10
    })
    done()
  })
})
