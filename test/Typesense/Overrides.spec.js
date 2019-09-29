import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Typesense from '../../src/Typesense'
import ApiCall from '../../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'

let expect = chai.expect
chai.use(chaiAsPromised)

describe('Overrides', function () {
  let typesense
  let overrides
  let override
  let apiCall
  let mockAxios

  before(function () {
    typesense = new Typesense.Client({
      'masterNode': {
        'host': 'master',
        'port': '8108',
        'protocol': 'http',
        'apiKey': 'abcd'
      }
    })

    override = {
      'id': 'lex-exact',
      'rule': {
        'query': 'lex luthor',
        'match': 'exact'
      },
      'includes': [
        {'id': '125', 'position': 1}
      ],
      'excludes': [
        {'id': '124'}
      ]
    }

    overrides = typesense.collections('companies').overrides()
    apiCall = new ApiCall(typesense.configuration)
    mockAxios = new MockAxiosAdapter(axios)
  })

  describe('.create', function () {
    it('creates the override in the collection', function (done) {
      mockAxios
        .onPut(
          apiCall._uriFor('/collections/companies/overrides'),
          override,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(201, override)

      let returnData = overrides.create('lex-exact', 'lex luthor', 'exact', [{
        'id': '125',
        'position': 1
      }], [{'id': '124'}])
      expect(returnData).to.eventually.deep.equal(override).notify(done)
    })
  })

  describe('.retrieve', function () {
    it('retrieves all overrides', function (done) {
      mockAxios
        .onGet(
          apiCall._uriFor('/collections/companies/overrides'),
          undefined,
          {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.masterNode.apiKey
          }
        )
        .reply(200, [override])

      let returnData = overrides.retrieve()

      expect(returnData).to.eventually.deep.equal([override]).notify(done)
    })
  })
})
