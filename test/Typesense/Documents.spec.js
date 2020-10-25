import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import {Client as TypesenseClient} from '../../src/Typesense'
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
    typesense = new TypesenseClient({
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
          apiCall._uriFor('/collections/companies/documents/search', typesense.configuration.nodes[0]),
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
          apiCall._uriFor('/collections/companies/documents', typesense.configuration.nodes[0]),
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

  describe('.upsert', function () {
    it('upserts the document', function (done) {
      mockAxios
        .onPost(
          apiCall._uriFor('/collections/companies/documents', typesense.configuration.nodes[0]),
          document,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(config => {
          expect(config.params.action).to.equal('upsert')
          return [201, JSON.stringify(document), {'content-type': 'application/json'}]
        })

      let returnData = documents.upsert(document)

      expect(returnData).to.eventually.deep.equal(document).notify(done)
    })
  })

  describe('.update', function () {
    it('updates the document', function (done) {
      mockAxios
        .onPost(
          apiCall._uriFor('/collections/companies/documents', typesense.configuration.nodes[0]),
          document,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(config => {
          expect(config.params.action).to.equal('update')
          return [201, JSON.stringify(document), {'content-type': 'application/json'}]
        })

      let returnData = documents.update(document)

      expect(returnData).to.eventually.deep.equal(document).notify(done)
    })
  })

  describe('.createMany', function () {
    it('imports the documents', function (done) {
      mockAxios
        .onPost(
          apiCall._uriFor('/collections/companies/documents/import', typesense.configuration.nodes[0]),
          `${JSON.stringify(document)}\n${JSON.stringify(anotherDocument)}`,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'text/plain',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, JSON.stringify({success: true}), {'content-type': 'text/plain'})

      let returnData = documents.createMany([document, anotherDocument])

      expect(returnData).to.eventually.deep.equal([{success: true}]).notify(done)
    })

    context('when a query paramater is passed', function () {
      it('passes the query parameter to the API', function (done) {
        mockAxios
          .onPost(
            apiCall._uriFor('/collections/companies/documents/import', typesense.configuration.nodes[0]),
            `${JSON.stringify(document)}\n${JSON.stringify(anotherDocument)}`,
            {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'text/plain',
              'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
            }
          )
          .reply(config => {
            expect(config.params.upsert).to.equal(true)
            return [200, JSON.stringify({success: true}), {'content-type': 'text/plain'}]
          })

        let returnData = documents.createMany([document, anotherDocument], {upsert: true})

        expect(returnData).to.eventually.deep.equal([{success: true}]).notify(done)
      })
    })
  })

  describe('.import', function () {
    context('when a query paramater is passed', function () {
      it('passes the query parameter to the API', function (done) {
        mockAxios
          .onPost(
            apiCall._uriFor('/collections/companies/documents/import', typesense.configuration.nodes[0]),
            `${JSON.stringify(document)}\n${JSON.stringify(anotherDocument)}`,
            {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'text/plain',
              'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
            }
          )
          .reply(config => {
            expect(config.params.action).to.equal('upsert')
            return [200, JSON.stringify({success: true}), {'content-type': 'text/plain'}]
          })

        let jsonlData = [document, anotherDocument].map(document => JSON.stringify(document)).join('\n')
        let returnData = documents.import(jsonlData, {action: 'upsert'})

        expect(returnData).to.eventually.deep.equal(JSON.stringify({success: true})).notify(done)
      })
    })

    context('when an array of docs is passed', function () {
      it('converts it to JSONL and returns an array of results', function (done) {
        mockAxios
          .onPost(
            apiCall._uriFor('/collections/companies/documents/import', typesense.configuration.nodes[0]),
            `${JSON.stringify(document)}\n${JSON.stringify(anotherDocument)}`,
            {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'text/plain',
              'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
            }
          )
          .reply(config => {
            return [200, '{}\n{}', {'content-type': 'text/plain'}]
          })

        let returnData = documents.import([document, anotherDocument])

        expect(returnData).to.eventually.deep.equal([{}, {}]).notify(done)
      })
    })

    context('when a JSONL string is passed', function () {
      it('it sends the string as is and returns a string', function (done) {
        mockAxios
          .onPost(
            apiCall._uriFor('/collections/companies/documents/import', typesense.configuration.nodes[0]),
            `${JSON.stringify(document)}\n${JSON.stringify(anotherDocument)}`,
            {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'text/plain',
              'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
            }
          )
          .reply(config => {
            return [200, '{}\n{}', {'content-type': 'text/plain'}]
          })

        let jsonlData = [document, anotherDocument].map(document => JSON.stringify(document)).join('\n')
        let returnData = documents.import(jsonlData)

        expect(returnData).to.eventually.deep.equal('{}\n{}').notify(done)
      })
    })
  })

  describe('.export', function () {
    it('exports the documents', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/collections/companies/documents/export', typesense.configuration.nodes[0]),
          undefined,
          {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey
          }
        )
        .reply(200, [JSON.stringify(document), JSON.stringify(anotherDocument)].join('\n'), {'content-type': 'text/plain'})

      let returnData = documents.export()

      expect(returnData).to.eventually.deep.equal([JSON.stringify(document), JSON.stringify(anotherDocument)].join('\n')).notify(done)
    })
  })
})
