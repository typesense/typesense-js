/*
 These examples walk you through key management operations.

 See clientInitalization.js for quick instructions on starting the Typesense server.
*/
require('@babel/register')

const Typesense = require('../../../src/Typesense')

const masterApiKey = 'xyz'

const typesense = new Typesense.Client({
  'nodes': [{
    'host': 'localhost',
    'port': '8108',
    'protocol': 'http'
  }],
  'apiKey': masterApiKey
})

// Let's also setup some test data for this example
let schema = {
  'name': 'users',
  'fields': [
    {
      'name': 'company_id',
      'type': 'int32',
      'facet': false
    },
    {
      'name': 'user_name',
      'type': 'string',
      'facet': false
    },
    {
      'name': 'login_count',
      'type': 'int32',
      'facet': false
    },
    {
      'name': 'country',
      'type': 'string',
      'facet': true
    }
  ],
  'default_sorting_field': 'company_id'
}

// We have four users, belonging to two companies: 124 and 126
let documents = [
  {
    'company_id': 124,
    'user_name': 'Hilary Bradford',
    'login_count': 10,
    'country': 'USA'
  },
  {
    'company_id': 124,
    'user_name': 'Nile Carty',
    'login_count': 100,
    'country': 'USA'
  },
  {
    'company_id': 126,
    'user_name': 'Tahlia Maxwell',
    'login_count': 1,
    'country': 'France'
  },
  {
    'company_id': 126,
    'user_name': 'Karl Roy',
    'login_count': 2,
    'country': 'Germany'
  }
]

async function runExample () {
  try {
    // Delete if the collection already exists from a previous example run
    await typesense.collections('users').delete()
  } catch (error) {
    // do nothing
  }

  try {
    // create a collection
    await typesense.collections().create(schema)

    // Index documents
    await Promise.all(documents.map(document => {
      return typesense.collections('users').documents().create(document)
    }))

    // Generate an API key and restrict it to only allow searches
    // You want to use this API Key in the browser instead of the master API Key
    let unscopedSearchOnlyApiKeyResponse = await typesense.keys().create({
      'description': 'Search-only key.',
      'actions': ['documents:search'],
      'collections': ['*']})
    console.log(unscopedSearchOnlyApiKeyResponse)

    // Save the key returned, since this will be the only time the full API Key is returned, for security purposes
    const unscopedSearchOnlyApiKey = unscopedSearchOnlyApiKeyResponse['value']

    // Side note: you can also retrieve metadata of API keys using the ID returned in the above response
    unscopedSearchOnlyApiKeyResponse = await typesense.keys(unscopedSearchOnlyApiKeyResponse['id']).retrieve()
    console.log(unscopedSearchOnlyApiKeyResponse)

    // We'll now use this search-only API key to generate a scoped search API key that can only access documents that have company_id:124
    //  This is useful when you store multi-tenant data in a single Typesense server, but you only want
    //  a particular tenant to access their own data. You'd generate one scoped search key per tenant.
    //  IMPORTANT: scoped search keys should only be generated *server-side*, so as to not leak the unscoped main search key to clients
    const scopedSearchOnlyApiKey = typesense.keys()
      .generateScopedSearchKey(unscopedSearchOnlyApiKey, {'filter_by': 'company_id:124'})
    console.log(`scopedSearchOnlyApiKey: ${scopedSearchOnlyApiKey}`)

    // Now let's search the data using the scoped API Key for company_id:124
    // You can do searches with this scopedSearchOnlyKey from the server-side or client-side
    const scopedTypesenseClient = new Typesense.Client({
      'nodes': [{
        'host': 'localhost',
        'port': '8108',
        'protocol': 'http'
      }],
      'apiKey': scopedSearchOnlyApiKey
    })

    let searchResults = []
    searchResults = await scopedTypesenseClient.collections('users').documents().search({
      'q': 'Hilary',
      'query_by': 'user_name'
    })
    console.log(JSON.stringify(searchResults, null, 2))

    // Search for a user that exists, but is outside the current key's scope
    searchResults = await scopedTypesenseClient.collections('users').documents().search({
      'q': 'Maxwell',
      'query_by': 'user_name'
    })
    console.log(JSON.stringify(searchResults, null, 2)) // Will return empty result set

    // Now let's delete the unscopedSearchOnlyKey. You'd want to do this when you need to rotate keys for example.
    const results = await typesense.keys(unscopedSearchOnlyApiKeyResponse['id']).delete()
    console.log(results)
  } catch (error) {
    console.log(error)
  } finally {
    // Cleanup
    typesense.collections('users').delete()
  }
}

runExample()
