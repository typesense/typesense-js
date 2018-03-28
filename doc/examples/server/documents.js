/*
 These examples walk you through all the operations you can do on a document
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
  }
]

typesense.collections().create(schema) // create a collection
  .then(function () {
    // create a document
    return typesense.collections('companies').documents().create(documents[0])
  })
  .then(function (data) {
    console.log(data)

    // Retrieve a document
    return typesense.collections('companies').documents('124').retrieve()
  })
  .then(function (data) {
    console.log(data)

    // delete a document (deletion returns the document after deletion)
    return typesense.collections('companies').documents('124').delete()
  })
  .then(function (data) {
    console.log(data)

    // create a couple of documents
    return Promise.all(documents.map(function (document) {
      return typesense.collections('companies').documents().create(document)
    }))
  })
  .then(function (data) {
    // Export all documents in a collection in JSON Lines format
    //  We use JSON Lines format for performance reasons. You can choose to parse selected lines (elements in the array) as needed.
    return typesense.collections('companies').documents().export()
  })
  .then(function (data) {
    // Cleanup - delete the collection
    return typesense.collections('companies').delete()
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.log(error)
  })
