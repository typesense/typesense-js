import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import TypesenseClient from '../src/Typesense/Client'
import ApiCall from '../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Collection', function () {
  let typesense
  let collection
  let apiCall
  let mockAxios
  let companySchema = {
    'name': 'companies',
    'num_documents': 0,
    'fields': [
      {
        'name': 'company_name',
        'type': 'string',
        'facet': false
      },
      {
        'name': 'num_employees',
        'type': 'int32',
        'facet': false
      },
      {
        'name': 'country',
        'type': 'string',
        'facet': true
      }
    ],
    'default_sorting_field': 'num_employees'
  }
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
    collection = typesense.collections('companies')
    apiCall = new ApiCall(typesense.configuration)
    mockAxios = new MockAxiosAdapter(axios)
  })

  describe('.retrieve', function () {
    it('retrieves a collection', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/collections/companies'),
          null,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, companySchema)

      let returnData = collection.retrieve()

      expect(returnData).to.eventually.deep.equal(companySchema).notify(done)
    })
  })

  describe('.delete', function () {
    it('deletes a collection', function (done) {
      mockAxios
        .onDelete(
          apiCall._uriFor('/collections/companies'),
          null,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, companySchema)

      let returnData = collection.delete()

      expect(returnData).to.eventually.deep.equal(companySchema).notify(done)
    })
  })
})
