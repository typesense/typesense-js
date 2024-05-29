import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Client as TypesenseClient } from '../../src/Typesense';
import ApiCall from '../../src/Typesense/ApiCall';
import axios from 'axios';
import MockAxiosAdapter from 'axios-mock-adapter';

let expect = chai.expect;
chai.use(chaiAsPromised);

describe('Stopword', function () {
  let typesense;
  let stopword;
  let apiCall;
  let mockAxios;
  beforeEach(function () {
    typesense = new TypesenseClient({
      nodes: [
        {
          host: 'node0',
          port: '8108',
          protocol: 'http',
        },
      ],
      apiKey: 'abcd',
      randomizeNodes: false,
    });
    stopword = typesense.stopwords('123');
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe('.retrieve', function () {
    it('retrieves the stopword', function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor('/stopwords/123', typesense.configuration.nodes[0]),
          null,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey,
          },
        )
        .reply(200, '{}', { 'content-type': 'application/json' });

      // console.log(mockAxios.handlers)

      let returnData = stopword.retrieve();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe('.delete', function () {
    it('deletes a stopword', function (done) {
      mockAxios
        .onDelete(
          apiCall.uriFor('/stopwords/123', typesense.configuration.nodes[0]),
          null,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey,
          },
        )
        .reply(200, {});

      let returnData = stopword.delete();

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });
});
