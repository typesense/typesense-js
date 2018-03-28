/*
 These examples walk you through the search operation
*/

var Typesense = require('../../../lib/Typesense')

/*
 Setup

 Start the master
   $ docker run -p 8108:8108  -it -v/tmp/typesense-data-master/:/data -it typesense/typesense:0.8.0-rc1 --data-dir /data --api-key=abcd --listen-port 8108

 Start the read replica
   $ docker run -p 8109:8109  -it -v/tmp/typesense-data-read-replica-1/:/data -it typesense/typesense:0.8.0-rc1 --data-dir /data --api-key=wxyz --listen-port 8109 --master http://localhost:8108
*/

// Create a client
var typesense = new Typesense.Client({
  'masterNode': {
    'host': 'localhost',
    'port': '8108',
    'protocol': 'http',
    'apiKey': 'abcd'
  },
  'readReplicaNodes': [{
    'host': 'localhost',
    'port': '8109',
    'protocol': 'http',
    'apiKey': 'wxyz'
  }],
  'timeoutSeconds': 10
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
    let promises = []

    // Search for documents
    promises += typesense.collections('companies').documents().search({
      'q': 'Stark',
      'query_by': 'company_name'
    }).then(function (searchResults) {
      console.log(searchResults)
    }).catch(function (error) {
      console.log(error)
    })

    // Search for non-existent
    promises += typesense.collections('companies').documents().search({
      'q': 'Non Existent',
      'query_by': 'company_name'
    }).then(function (searchResults) {
      console.log(searchResults)
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
      console.log(searchResults)
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
