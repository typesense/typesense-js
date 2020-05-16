import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Typesense from '../../src/Typesense'
import ApiCall from '../../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Documents', function () {
  let typesense
  let documents
  let document
  let anotherDocument
  let apiCall
  let mockAxios

  before(function () {
    typesense = new Typesense.Client({
      'nodes': [{
        'host': 'node0',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': 'abcd'
    })

    document = {
      'id': '124',
      'company_name': 'Stark Industries',
      'num_employees': 5215,
      'country': 'USA'
    }

    anotherDocument = {
      'id': '125',
      'company_name': 'Stark Industries',
      'num_employees': 5215,
      'country': 'USA'
    }

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
          apiCall._uriFor('/collections/companies/documents/search', 0),
          {
            params: searchParameters
          },
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, stubbedSearchResult)

      let returnData = documents.search(searchParameters)

      expect(returnData).to.eventually.deep.equal(stubbedSearchResult).notify(done)
    })
  })

  describe('.create', function () {
    it('creates the document', function (done) {
      mockAxios
        .onPost(
          apiCall._uriFor('/collections/companies/documents', 0),
          document,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(201, document)

      let returnData = documents.create(document)

      expect(returnData).to.eventually.deep.equal(document).notify(done)
    })
  })

  describe('.export', function () {
    it('exports the documents', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/collections/companies/documents/export', 0),
          undefined,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, [JSON.stringify(document), JSON.stringify(anotherDocument)].join('\n'))

      let returnData = documents.export()

      expect(returnData).to.eventually.deep.equal([JSON.stringify(document), JSON.stringify(anotherDocument)]).notify(done)
    })
  })
})
