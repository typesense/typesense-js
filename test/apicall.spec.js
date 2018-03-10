import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Typesense from '../lib/Typesense'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('ApiCall', function () {
  let typesense
  let apiCall
  let mockAxios

  before(function () {
    typesense = new Typesense({
      'masterNode': {
        'host': 'master',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      },
      'readReplicaNodes': [
        {
          'host': 'read-replica-1',
          'port': '8108',
          'protocol': 'http',
          'apiKey': 'abcd'
        },
        {
          'host': 'read-replica-2',
          'port': '8108',
          'protocol': 'http',
          'apiKey': 'abcd'
        }],
      'timeout': 10
    })
    mockAxios = new MockAxiosAdapter(axios)
    apiCall = typesense.ApiCall
  })

  describe('.post', function () {
    it('performs POST requests only against the master node and does not failover to read replicas', function (done) {
      mockAxios.onPost(apiCall._uriFor('/collections/companies', 'master'), {dummy: 0}).reply(500)

      let returnData = apiCall.post('/collections/companies', {dummy: 0})

      expect(returnData).to.be.rejected.notify(done)
    })
  })

  describe('.get', function () {
    it('fails-over to read replicas for get requests', function (done) {
      mockAxios
        .onGet(apiCall._uriFor('/collections/companies', 'master'), {params: {dummy: 0}}).reply(500)
        .onGet(apiCall._uriFor('/collections/companies', 'readReplica', 0), {params: {dummy: 0}}).reply(500)
        .onGet(apiCall._uriFor('/collections/companies', 'readReplica', 1), {params: {dummy: 0}}).reply(200, {result: 'OK'})

      let returnData = apiCall.get('/collections/companies', {dummy: 0})

      expect(returnData).to.eventually.deep.equal({result: 'OK'}).notify(done)
    })

    it('returns an error when both master and all read replicas are unavailable', function (done) {
      mockAxios
        .onGet(apiCall._uriFor('/collections/companies', 'master'), {params: {dummy: 0}}).reply(500)
        .onGet(apiCall._uriFor('/collections/companies', 'readReplica', 0), {params: {dummy: 0}}).reply(500)
        .onGet(apiCall._uriFor('/collections/companies', 'readReplica', 1), {params: {dummy: 0}}).reply(500)

      let returnData = apiCall.get('/collections/companies', {dummy: 0})

      expect(returnData).to.be.rejected.notify(done)
    })
  })
})
