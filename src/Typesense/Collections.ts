import ApiCall from "./ApiCall";
import { CollectionFieldSchema, CollectionSchema } from "./Collection";

export interface CollectionCreateSchema {
  name: string;
  default_sorting_field?: string;
  fields?: CollectionFieldSchema[];
  symbols_to_index?: string[];
  token_separators?: string[];
  enable_nested_fields?: boolean;
}

export interface CollectionCreateOptions {
  src_name?: string;
}

const RESOURCEPATH = "/collections";

export default class Collections {
  constructor(private apiCall: ApiCall) {}

  async create(
    schema: CollectionCreateSchema,
    options: CollectionCreateOptions = {}
  ): Promise<CollectionSchema> {
    return this.apiCall.post<CollectionSchema>(RESOURCEPATH, schema, options);
  }

  async retrieve(): Promise<CollectionSchema[]> {
    return this.apiCall.get<CollectionSchema[]>(RESOURCEPATH);
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
