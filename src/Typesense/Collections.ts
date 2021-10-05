import ApiCall from './ApiCall'

export type FieldType =
  | 'string'
  | 'int32'
  | 'int64'
  | 'float'
  | 'bool'
  | 'string[]'
  | 'int32[]'
  | 'int64[]'
  | 'float[]'
  | 'bool[]'
  | 'auto'
  | 'string*'

export interface CollectionFieldSchema {
  name: string
  type: FieldType
  optional?: boolean
  facet?: boolean
  index?: boolean
}

export interface CollectionCreateSchema {
  name: string
  default_sorting_field?: string
  fields: CollectionFieldSchema[]
}

export interface CollectionSchema extends CollectionCreateSchema {
  created_at: number
  num_documents: number
  num_memory_shards: number
}

const RESOURCEPATH = '/collections'

export default class Collections {
  constructor(private apiCall: ApiCall) {}

  // todo: add an upsert method, as it's cumbersome to figure out if a collection already exists

  // Todo: nick -> this does not give you a Collection instance, but rather, the schema as returned by the api
  // Chaining would be a lot nicer if an instance was returned - but that would break existing implementations.
  async create(schema: CollectionCreateSchema) {
    return await this.apiCall.post<CollectionSchema>(RESOURCEPATH, schema)
  }

  async retrieve(): Promise<CollectionSchema[]> {
    return await this.apiCall.get<CollectionSchema[]>(RESOURCEPATH)
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH
  }
}
