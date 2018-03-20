import TypesenseClient from './Typesense/Client'

const Client = TypesenseClient

class Typesense {
  static get Client () {
    return Client
  }
}

module.exports = Typesense
