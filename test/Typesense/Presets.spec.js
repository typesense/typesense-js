import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Client as TypesenseClient } from '../../src/Typesense';
import ApiCall from '../../src/Typesense/ApiCall';
import axios from 'axios';
import MockAxiosAdapter from 'axios-mock-adapter';

let expect = chai.expect;
chai.use(chaiAsPromised);

describe('Presets', function () {
  let typesense;
  let presets;
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
    presets = typesense.presets();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe('.upsert', function () {
    it('upserts a preset', function (done) {
      mockAxios
        .onPut(
          apiCall.uriFor('/presets/preset-1', typesense.configuration.nodes[0]),
          {
            value: {
              query_by: 'field1',
            },
          },
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey,
          },
        )
        .reply(201, '{}', { 'content-type': 'application/json' });

      let returnData = presets.upsert('preset-1', {
        value: {
          query_by: 'field1',
        },
      });

      expect(returnData).to.eventually.deep.equal({}).notify(done);
    });
  });

  describe('.retrieve', function () {
    it('retrieves all presets', function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor('/presets', typesense.configuration.nodes[0]),
          undefined,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey,
          },
        )
        .reply(200, '[]', { 'content-type': 'application/json' });

      let returnData = presets.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
