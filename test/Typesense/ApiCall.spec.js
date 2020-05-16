import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
import Typesense from '../../src/Typesense'
import ApiCall from '../../src/Typesense/ApiCall'
import axios from 'axios'
import MockAxiosAdapter from 'axios-mock-adapter'
import timekeeper from 'timekeeper'

let expect = chai.expect
chai.use(chaiAsPromised)

let sharedNodeSelectionBehavior = (method) => {
  it('raises an error when no nodes are healthy', async function () {
    this.mockAxios.onAny(this.apiCall._uriFor('/', 0)).reply(500, {'message': 'Error message'})
    this.mockAxios.onAny(this.apiCall._uriFor('/', 1)).reply(500, {'message': 'Error message'})
    this.mockAxios.onAny(this.apiCall._uriFor('/', 2)).reply(500, {'message': 'Error message'})

    await expect(this.apiCall[method]('/')).to.eventually.be.rejectedWith('Request failed with status code 500')
    let requestHistory = this.mockAxios.history[method]
    expect(requestHistory.length).to.equal(4)
    expect(requestHistory[0].url).to.equal('http://node0:8108/')
    expect(requestHistory[1].url).to.equal('http://node1:7108/')
    expect(requestHistory[2].url).to.equal('http://node2:9108/')
    expect(requestHistory[3].url).to.equal('http://node0:8108/')
  })

  it('selects the next available node when there is a connection timeout', async function () {
    this.mockAxios.onAny(this.apiCall._uriFor('/', 0)).timeout()
    this.mockAxios.onAny(this.apiCall._uriFor('/', 1)).timeout()
    this.mockAxios.onAny(this.apiCall._uriFor('/', 2)).reply(200, {'message': 'Success'})

    await expect(this.apiCall[method]('/')).to.eventually.deep.equal({'message': 'Success'})
    let requestHistory = this.mockAxios.history[method]
    expect(requestHistory.length).to.equal(3)
    expect(requestHistory[0].url).to.equal('http://node0:8108/')
    expect(requestHistory[1].url).to.equal('http://node1:7108/')
    expect(requestHistory[2].url).to.equal('http://node2:9108/')
  })

  it('remove unhealthy nodes out of rotation, until threshold', async function () {
    this.mockAxios.onAny(this.apiCall._uriFor('/', 0)).timeout()
    this.mockAxios.onAny(this.apiCall._uriFor('/', 1)).timeout()
    this.mockAxios.onAny(this.apiCall._uriFor('/', 2)).reply(200, {'message': 'Success'})

    let currentTime = Date.now()
    timekeeper.freeze(currentTime)
    await this.apiCall[method]('/') // Node 0 and Node 1 are marked as unhealthy after this, request should have been made to Node 2
    await this.apiCall[method]('/') // Request should have been made to Node 2
    await this.apiCall[method]('/') // Request should have been made to Node 2

    timekeeper.freeze(currentTime + 5 * 1000)
    await this.apiCall[method]('/') // Request should have been made to Node 2

    timekeeper.freeze(currentTime + 65 * 1000)
    await this.apiCall[method]('/') // Request should have been made to Node 2, since Node 0 and Node 1 are still unhealthy, though they were added back into rotation after the threshold

    // Remove first mock, to let request to node 0 succeed
    this.mockAxios.handlers[method].shift()
    this.mockAxios.onAny(this.apiCall._uriFor('/', 0)).reply(200, {'message': 'Success'})

    timekeeper.freeze(currentTime + 125 * 1000)
    await this.apiCall[method]('/') // Request should have been made to Node 0, since it is now healthy and the unhealthy threshold was exceeded

    let requestHistory = this.mockAxios.history[method]
    expect(requestHistory.length).to.equal(10)

    expect(requestHistory[0].url).to.equal('http://node0:8108/')
    expect(requestHistory[1].url).to.equal('http://node1:7108/')
    expect(requestHistory[2].url).to.equal('http://node2:9108/')

    expect(requestHistory[3].url).to.equal('http://node2:9108/')

    expect(requestHistory[4].url).to.equal('http://node2:9108/')

    expect(requestHistory[5].url).to.equal('http://node2:9108/')

    expect(requestHistory[6].url).to.equal('http://node0:8108/')
    expect(requestHistory[7].url).to.equal('http://node1:7108/')
    expect(requestHistory[8].url).to.equal('http://node2:9108/')

    expect(requestHistory[9].url).to.equal('http://node0:8108/')

    timekeeper.reset()
  })
}

describe('ApiCall', function () {
  beforeEach(function () {
    this.typesense = new Typesense.Client({
      'nodes': [
        {
          'host': 'node0',
          'port': '8108',
          'protocol': 'http'
        },
        {
          'host': 'node1',
          'port': '7108',
          'protocol': 'http'
        },
        {
          'host': 'node2',
          'port': '9108',
          'protocol': 'http'
        }
      ],
      'apiKey': 'abcd',
      'logLevel': 'error'
    })
    this.mockAxios = new MockAxiosAdapter(axios)
    this.apiCall = new ApiCall(this.typesense.configuration)
  })

  describe('.post', function () {
    sharedNodeSelectionBehavior('post')
  })

  describe('.put', function () {
    sharedNodeSelectionBehavior('post')
  })

  describe('.get', function () {
    sharedNodeSelectionBehavior('post')
  })

  describe('.delete', function () {
    sharedNodeSelectionBehavior('post')
  })
})
