/*
 These examples walk you through the search operation.

 See clientInitalization.js for quick instructions on starting the Typesense server.
*/
require('@babel/register')

const Typesense = require('../../../src/Typesense')

// Create a client
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
  // If this optional key is specified, requests are always sent to this node first if it is healthy
  // before falling back on the nodes mentioned in the `nodes` key. This is useful when running a distributed set of search clusters.
  'distributedSearchNode': {
    'host': 'localhost',
    'port': '8108',
    'protocol': 'http'
  },
  'apiKey': 'xyz',
  'connectionTimeoutSeconds': 10,
  'retryIntervalSeconds': 0.1,
  'healthcheckIntervalSeconds': 2,
  'logLevel': 'debug'
})

let schema = {
  'name': 'companies',
  'num_documents': 0,
  'fields': [
    {
      'name': 'company_name',
      'type': 'string',
      'facet': false
    },
    {
      'name': 'num_employees',
      'type': 'int32',
      'facet': false
    },
    {
      'name': 'country',
      'type': 'string',
      'facet': true
    }
  ],
  'default_sorting_field': 'num_employees'
}

let documents = [
  {
    'id': '124',
    'company_name': 'Stark Industries',
    'num_employees': 5215,
    'country': 'USA'
  },
  {
    'id': '125',
    'company_name': 'Acme Corp',
    'num_employees': 1002,
    'country': 'France'
  },
  {
    'id': '127',
    'company_name': 'Stark Corp',
    'num_employees': 1031,
    'country': 'USA'

  },
  {
    'id': '126',
    'company_name': 'Doofenshmirtz Inc',
    'num_employees': 2,
    'country': 'Tri-State Area'

  }
]

async function runExample () {
  try {
    // Delete if the collection already exists from a previous example run
    await typesense.collections('companies').delete()
  } catch (error) {
    // do nothing
  }

  try {
    // create a collection
    await typesense.collections().create(schema)

    // Index documents
    await Promise.all(documents.map(document => {
      return typesense.collections('companies').documents().create(document)
    }))

    // Search for documents
    let searchResults = []
    searchResults = await typesense.collections('companies').documents().search({
      'q': 'Stark',
      'query_by': 'company_name'
    })
    console.log(searchResults)

    // Search for non-existent
    searchResults = await typesense.collections('companies').documents().search({
      'q': 'Non Existent',
      'query_by': 'company_name'
    })
    console.log(searchResults)

    // Search for more documents
    searchResults = await typesense.collections('companies').documents().search({
      'q': 'Inc',
      'query_by': 'company_name',
      'filter_by': 'num_employees:<100',
      'sort_by': 'num_employees:desc'
    })
    console.log(searchResults)
  } catch (error) {
    console.log(error)
  } finally {
    // Cleanup
    typesense.collections('companies').delete()
  }
}

runExample()
