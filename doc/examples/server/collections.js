/*
 These examples walk you through all the operations you can do on a collection
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

typesense.collections().create(schema) // create a collection
  .then(function (data) {
    console.log(data)

    // retrieve the created collection
    return typesense.collections('companies').retrieve()
  })
  .then(function (data) {
    console.log(data)

    // retrieve all collections
    return typesense.collections().retrieve()
  })
  .then(function (data) {
    console.log(data)

    // delete a collection (deletion returns the schema of the collection after deletion)
    return typesense.collections('companies').delete()
  })
  .then(function (data) {
    console.log(data)
  })
  .catch(function (error) {
    console.log(error)
  })
