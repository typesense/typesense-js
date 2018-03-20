import chai from 'chai'
import Typesense from '../../src/Typesense'

let expect = chai.expect

describe('Typesense', function () {
  let typesense
  beforeEach(function () {
    typesense = new Typesense.Client({
      'masterNode': {
        'host': 'master',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      },
      'readReplicaNodes': [{
        'host': 'read-replica',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      }],
      'timeoutSeconds': 10
    })
  })

  it('throws an error if there is a missing config value in the masterNode', function (done) {
    delete typesense.configuration.masterNode.host

    expect(() => {
      typesense.configuration.validate()
    })
      .to.throw('Missing required parameters in masterNode')

    done()
  })

  it('throws an error if there is a missing config value in the readReplicaNodes', function (done) {
    delete typesense.configuration.readReplicaNodes[0].protocol

    expect(() => {
      typesense.configuration.validate()
    })
      .to.throw('Missing required parameters in one of readReplicaNodes')

    done()
  })
})
