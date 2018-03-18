import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import TypesenseClient from '../lib/Typesense/Client'
import ApiCall from '../lib/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Collections', function () {
  let typesense
  let collections
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
    'token_ranking_field': 'num_employees'
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
    collections = typesense.collections()
    apiCall = new ApiCall(typesense.configuration)
    mockAxios = new MockAxiosAdapter(axios)
  })

  describe('.create', function () {
    it('creates a collection', function (done) {
      let {'num_documents': numDocuments, ...schemaForCreation} = companySchema
      mockAxios
        .onPost(
          apiCall._uriFor('/collections'),
          schemaForCreation,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(201, companySchema)

      let returnData = collections.create(schemaForCreation)

      expect(returnData).to.eventually.deep.equal(companySchema).notify(done)
    })
  })

  describe('.retrieveAll', function () {
    it('retrieves all collections', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/collections'),
          undefined,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, [companySchema])

      let returnData = collections.retrieveAll()

      expect(returnData).to.eventually.deep.equal([companySchema]).notify(done)
    })
  })
})
