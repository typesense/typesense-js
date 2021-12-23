/*
 These examples walk you through how to handle errors.

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
  logLevel: 'debug'
})

async function runExample() {
  try {
    // Let's try to index data to a non-existent collection
    await typesense.collections('non-existent').documents().create({ badSchema: 'badSchema' })
  } catch (error) {
    // You can check if `error` is an instanceof any of the custom error classes and handle it accordingly
    // See src/Typesense/Errors for a list of all available error classes
    if (error instanceof Typesense.Errors.ObjectNotFound) {
      // May be try to create the collection here
      console.log(error)
    } else {
      // Or you can also get the specific httpStatus from the error, if you'd like to handle it yourself
      console.log(error.httpStatus)
      console.log(error.message)
    }
  }
}

runExample()
