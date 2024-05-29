import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Client as TypesenseClient } from '../../src/Typesense';
import ApiCall from '../../src/Typesense/ApiCall';
import axios from 'axios';
import MockAxiosAdapter from 'axios-mock-adapter';

let expect = chai.expect;
chai.use(chaiAsPromised);

describe('Conversations', function () {
  let typesense;
  let conversations;
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
    conversations = typesense.conversations();
    apiCall = new ApiCall(typesense.configuration);
    mockAxios = new MockAxiosAdapter(axios);
  });

  describe('.retrieve', function () {
    it('retrieves all conversations', function (done) {
      mockAxios
        .onGet(
          apiCall.uriFor('/conversations', typesense.configuration.nodes[0]),
          undefined,
          {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'X-TYPESENSE-API-KEY': typesense.configuration.apiKey,
          },
        )
        .reply(200, '[]', { 'content-type': 'application/json' });

      let returnData = conversations.retrieve();

      expect(returnData).to.eventually.deep.equal([]).notify(done);
    });
  });
});
