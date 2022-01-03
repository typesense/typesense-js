/*
 These examples walk you through overrides, available in the premium version
 See clientInitalization.js for quick instructions on starting the Typesense server.
*/
require('@babel/register')

const Typesense = require('../../../lib/Typesense')

// Create a client
const typesense = new Typesense.Client({
  nodes: [
    {
      host: 'localhost',
      port: '8108',
      protocol: 'http'
    }
  ],
  apiKey: 'xyz',
  numRetries: 3, // A total of 4 tries (1 original try + 3 retries)
  connectionTimeoutSeconds: 10,
  logLevel: 'debug'
})

async function runExample () {
  try {
    let result

    result = await typesense.operations.perform('snapshot', {
      snapshot_path: '/tmp/dbsnap'
    })
    console.dir(result, { depth: null })
  } catch (error) {
    console.log(error)
  }
}

runExample()
