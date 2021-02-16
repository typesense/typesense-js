/*

# Setup

## Option 1: Start a single-node cluster
    $ docker run -i -p 8108:8108 -v/tmp/typesense-server-data-1b/:/data typesense/typesense:0.19.0 --data-dir /data --api-key=xyz --listen-port 8108 --enable-cors

## Option 2: Start a 3-node cluster

Create file in present working directory called typesense-server-peers (update IP Addresses appropriately to your local network):
  $ echo '172.17.0.2:8107:8108,172.17.0.3:7107:7108,172.17.0.4:9107:9108' > `pwd`/typesense-server-peers

Start node 1:
  $ docker run -i -p 8108:8108 -p 8107:8107 -v/tmp/typesense-server-data-1b/:/data -v`pwd`/typesense-server-peers:/typesense-server-peers typesense/typesense:0.19.0 --data-dir /data --api-key=xyz --listen-port 8108 --peering-port 8107 --enable-cors --nodes=/typesense-server-peers

Start node 2:
  $ docker run -i -p 7108:7108 -p 7107:7107 -v/tmp/.typesense-server-data-2b/:/data -v`pwd`/typesense-server-peers:/typesense-server-peers typesense/typesense:0.19.0 --data-dir /data --api-key=xyz --listen-port 7108 --peering-port 7107 --enable-cors --nodes=/typesense-server-peers

Start node 3:
  $ docker run -i -p 9108:9108 -p 9107:9107 -v/tmp/.typesense-server-data-3b/:/data -v`pwd`/typesense-server-peers:/typesense-server-peers typesense/typesense:0.19.0 --data-dir /data --api-key=xyz --listen-port 9108 --peering-port 9107 --enable-cors --nodes=/typesense-server-peers

 */

require('@babel/register')

const Typesense = require('../..')

// Create a client
// eslint-disable-next-line no-unused-vars
const typesense = new Typesense.Client({
  'nodes': [
    {
      'host': 'localhost',
      'port': '8108',
      'protocol': 'http'
    },
    {
      'host': 'localhost',
      'port': '7108',
      'protocol': 'http'
    },
    {
      'host': 'localhost',
      'port': '9108',
      'protocol': 'http'
    }],
  'apiKey': 'xyz',
  'numRetries': 3, // A total of 4 tries (1 original try + 3 retries)
  'connectionTimeoutSeconds': 10,
  'logLevel': 'debug'
})
