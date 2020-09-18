import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import { Client as TypesenseClient } from '../../src/Typesense'
import ApiCall from '../../src/Typesense/ApiCall'
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
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })
    document = typesense.collections('companies').documents('124')
    apiCall = new ApiCall(typesense.configuration)
    mockAxios = new MockAxiosAdapter(axios)
  })

  describe('.retrieve', function () {
    it('retrieves a document', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/collections/companies/documents/124', typesense.configuration.nodes[0]),
          null,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, JSON.stringify(documentResult), {'content-type': 'application/json'})

      let returnData = document.retrieve()

      expect(returnData).to.eventually.deep.equal(documentResult).notify(done)
    })
  })

  describe('.delete', function () {
    it('deletes a document', function (done) {
      mockAxios
        .onDelete(
          apiCall._uriFor('/collections/companies/documents/124', typesense.configuration.nodes[0]),
          null,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, JSON.stringify(documentResult), {'content-type': 'application/json'})

      let returnData = document.delete()

      expect(returnData).to.eventually.deep.equal(documentResult).notify(done)
    })
  })
})
