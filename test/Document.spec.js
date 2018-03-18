import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import TypesenseClient from '../src/Typesense/Client'
import ApiCall from '../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Document', function () {
  let typesense
  let document
  let documentResult = {
    'id': '124',
    'company_name': 'Stark Industries',
    'num_employees': 5215,
    'country': 'USA'
  }
  let apiCall
  let mockAxios
  before(function () {
    typesense = new TypesenseClient({
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
    document = typesense.collections('companies').documents('124')
    apiCall = new ApiCall(typesense.configuration)
    mockAxios = new MockAxiosAdapter(axios)
  })

  describe('.retrieve', function () {
    it('retrieves a document', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/collections/companies/documents/124'),
          null,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, documentResult)

      let returnData = document.retrieve()

      expect(returnData).to.eventually.deep.equal(documentResult).notify(done)
    })
  })

  describe('.delete', function () {
    it('deletes a document', function (done) {
      mockAxios
        .onDelete(
          apiCall._uriFor('/collections/companies/documents/124'),
          null,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, documentResult)

      let returnData = document.delete()

      expect(returnData).to.eventually.deep.equal(documentResult).notify(done)
    })
  })
})
