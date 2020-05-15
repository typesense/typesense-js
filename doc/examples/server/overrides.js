/*
 These examples walk you through overrides, available in the premium version
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
  'apiKey': 'xyz',
  'numRetries': 3, // A total of 4 tries (1 original try + 3 retries)
  'connectionTimeoutSeconds': 10,
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

typesense.collections().create(schema) // create a collection
  .then(function () {
    // create a couple of documents
    return Promise.all(documents.map(function (document) {
      return typesense.collections('companies').documents().create(document)
    }))
  })
  .then(function (data) {
    typesense.collections('companies').overrides().create(
      {
        'id': 'promote-doofenshmirtz',
        'rule': {
          'query': 'doofen',
          'match': 'exact'
        },
        'includes': [{'id': '126', 'position': 1}]
      }
    )
  })
  .then(function (data) {
    typesense.collections('companies').overrides().create(
      {
        'id': 'promote-acme',
        'rule': {
          'query': 'stark',
          'match': 'exact'
        },
        'includes': [{'id': '125', 'position': 1}]
      }
    )
  })
  .then(function (data) {
    let promises = []

    // Search for documents
    promises += typesense.collections('companies').documents().search({
      'q': 'doofen',
      'query_by': 'company_name'
    }).then(function (searchResults) {
      console.dir(searchResults, {depth: null})
    }).catch(function (error) {
      console.log(error)
    })

    promises += typesense.collections('companies').documents().search({
      'q': 'stark',
      'query_by': 'company_name'
    }).then(function (searchResults) {
      console.dir(searchResults, {depth: null})
    }).catch(function (error) {
      console.log(error)
    })

    // Search for more documents
    promises += typesense.collections('companies').documents().search({
      'q': 'Inc',
      'query_by': 'company_name',
      'filter_by': 'num_employees:<100',
      'sort_by': 'num_employees:desc'
    }).then(function (searchResults) {
      console.dir(searchResults, {depth: null})
    }).catch(function (error) {
      console.log(error)
    })

    return Promise.all(promises)
  })
  .then(function () {
    // Cleanup - delete the collection
    return typesense.collections('companies').delete()
  })
  .catch(function (error) {
    console.log(error)
  })
