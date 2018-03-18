import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import TypesenseClient from '../lib/Typesense/Client'
import ApiCall from '../lib/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Documents', function () {
  let typesense
  let documents
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
  let document = {
    'id': '124',
    'company_name': 'Stark Industries',
    'num_employees': 5215,
    'country': 'USA'
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
      'timeout': 10
    })
    documents = typesense.collections('companies').documents()
    apiCall = new ApiCall(typesense.configuration)
    mockAxios = new MockAxiosAdapter(axios)
  })

  describe('.search', function () {
    it('searches the documents in a collection', function (done) {
      let searchParameters = {
        'q': 'Stark',
        'query_by': 'company_name'
      }
      let stubbedSearchResult = {
        'facet_counts': [],
        'found': 0,
        'search_time_ms': 0,
        'page': 0,
        'hits': [
          {
            '_highlight': {
              'company_name': '<mark>Stark</mark> Industries'
            },
            'document': {
              'id': '124',
              'company_name': 'Stark Industries',
              'num_employees': 5215,
              'country': 'USA'
            }
          }
        ]
      }
      mockAxios
        .onGet(
          apiCall._uriFor('/collections/companies/documents/search'),
          {
            params: searchParameters
          },
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, stubbedSearchResult)

      let returnData = documents.search(searchParameters)

      expect(returnData).to.eventually.deep.equal(stubbedSearchResult).notify(done)
    })
  })
})
