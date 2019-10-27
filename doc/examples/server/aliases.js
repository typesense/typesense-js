/*
 These examples walk you through all the operations you can do with aliases
*/

var Typesense = require('../../../lib/Typesense')

/*
 Setup

 Start the master
   $ docker run -p 8108:8108  -it -v/tmp/typesense-data-master/:/data -it typesense/typesense-premium:oct-13-2 --data-dir /data --api-key=abcd --listen-port 8108
*/

// Create a client
var typesense = new Typesense.Client({
  'masterNode': {
    'host': 'localhost',
    'port': '8108',
    'protocol': 'http',
    'apiKey': 'abcd'
  }
})

typesense.collections().create({
  'name': 'books_january',
  'fields': [
    {'name': 'title', 'type': 'string'},
    {'name': 'authors', 'type': 'string[]'},
    {'name': 'authors_facet', 'type': 'string[]', 'facet': true},
    {'name': 'publication_year', 'type': 'int32'},
    {'name': 'publication_year_facet', 'type': 'string', 'facet': true},
    {'name': 'ratings_count', 'type': 'int32'},
    {'name': 'average_rating', 'type': 'float'},
    {'name': 'image_url', 'type': 'string'}
  ],
  'default_sorting_field': 'ratings_count'
})
  .then(function (data) {
    console.log(data)

    // Create or update an existing alias
    return typesense.aliases().upsert('books', {
      'collection_name': 'books_january'
    })
  })
  .then(function (data) {
    console.log(data)

    // Add a book using the alias name `books`

    hungerGamesBook = {
      'id': '1',
      'original_publication_year': 2008,
      'authors': ['Suzanne Collins'],
      'average_rating': 4.34,
      'publication_year': 2008,
      'publication_year_facet': '2008',
      'authors_facet': ['Suzanne Collins'],
      'title': 'The Hunger Games',
      'image_url': 'https://images.gr-assets.com/books/1447303603m/2767052.jpg',
      'ratings_count': 4780653
    }

    return typesense.collections('books').documents().create(hungerGamesBook)
  })
  .then(function (data) {
    console.log(data)

    // Search using the alias
    return typesense.collections('books').documents().search({
      'q': 'hunger',
      'query_by': 'title',
      'sort_by': 'ratings_count:desc'
    })
  })
  .then(function (data) {
    console.log(data)

    // List all aliases
    return typesense.aliases().retrieve()
  })
  .then(function (data) {
    console.log(data)

    // Retrieve the configuration of a specific alias
    return typesense.aliases('books').retrieve()
  })
  .then(function (data) {
    console.log(data)

    // Delete an alias
    return typesense.aliases('books').delete()
  })
  .catch(function (error) {
    console.log(error)
  })
