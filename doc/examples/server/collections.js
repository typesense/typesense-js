/*
 These examples walk you through all the operations you can do on a collection
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
    },
    {
      host: 'localhost',
      port: '7108',
      protocol: 'http'
    },
    {
      host: 'localhost',
      port: '9108',
      protocol: 'http'
    }
  ],
  apiKey: 'xyz',
  numRetries: 3, // A total of 4 tries (1 original try + 3 retries)
  connectionTimeoutSeconds: 10,
  logLevel: 'debug'
})

let schema = {
  name: 'companies',
  num_documents: 0,
  fields: [
    {
      name: 'company_name',
      type: 'string',
      facet: false
    },
    {
      name: 'num_employees',
      type: 'int32',
      facet: false
    },
    {
      name: 'country',
      type: 'string',
      facet: true
    }
  ],
  default_sorting_field: 'num_employees'
}

async function runExample () {
  try {
    // Delete if the collection already exists from a previous example run
    await typesense.collections('companies').delete()
  } catch (error) {
    // do nothing
  }

  try {
    let result
    // create a collection
    result = await typesense.collections().create(schema)
    console.log(result)

    // retrieve the created collection
    await timer(0.5) // Give Typesense cluster a few hundred ms to create collection on all nodes, before reading it right after (eventually consistent)
    result = await typesense.collections('companies').retrieve()
    console.log(result)

    // retrieve all collections
    result = await typesense.collections().retrieve()
    console.log(result)

    // delete a collection (deletion returns the schema of the collection after deletion)
    result = await typesense.collections('companies').delete()
    console.log(result)
  } catch (error) {
    console.log(error)
  } finally {
    // Cleanup
    typesense
      .collections('companies')
      .delete()
      .catch(() => {})
  }
}

async function timer (seconds) {
  return new Promise((resolve) => setTimeout(resolve, seconds * 1000))
}

runExample()
