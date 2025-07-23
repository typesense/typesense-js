import type { ReadStream } from "fs";
import ApiCall from "./ApiCall";
import Configuration from "./Configuration";
import { ImportError, RequestMalformed } from "./Errors";
import { SearchOnlyDocuments } from "./SearchOnlyDocuments";
import {
  SearchParams,
  SearchResponseRequestParams,
  WriteableDocuments,
} from "./Types";

// Todo: use generic to extract filter_by values
export type DeleteQuery =
  | {
      truncate?: true;
    }
  | {
      truncate?: never;
      filter_by?: string;
      batch_size?: number;
      ignore_not_found?: boolean;
      return_doc?: boolean;
      return_id?: boolean;
    };

export interface DeleteResponse<T extends DocumentSchema = DocumentSchema> {
  num_deleted: number;
  documents?: T[];
  ids?: string[];
}

interface ImportResponseSuccess<T extends DocumentSchema = DocumentSchema> {
  success: true;
  error?: never;
  document?: T;
  id?: string;
  code?: never;
}

export interface ImportResponseFail<T extends DocumentSchema = DocumentSchema> {
  success: false;
  error: string;
  document?: T;
  id?: string;
  code: number;
}

export type ImportResponse<T extends DocumentSchema = DocumentSchema> = ImportResponseSuccess<T> | ImportResponseFail<T>;

export type DocumentSchema = Record<string, any>;

export interface SearchParamsWithPreset<
  T extends DocumentSchema,
  Infix extends string,
> extends Partial<SearchParams<T, Infix>> {
  preset: string;
}

type SearchResponseHighlightObject = {
  matched_tokens?: string[];
  snippet?: string;
  value?: string;
};

export type SearchResponseHighlight<T> = T extends string | number
  ? SearchResponseHighlightObject
  : {
      [TAttribute in keyof T]?: SearchResponseHighlight<T[TAttribute]>;
    };

export interface SearchResponseHit<T extends DocumentSchema> {
  curated?: true;
  highlights?: [
    {
      field: keyof T;
      snippet?: string;
      value?: string;
      snippets?: string[];
      indices?: number[];
      matched_tokens: string[][] | string[];
    },
  ];
  highlight: SearchResponseHighlight<T>;
  document: T;
  text_match: number;
  text_match_info?: {
    best_field_score: `${number}`; // To prevent scores from being truncated by JSON spec
    best_field_weight: number;
    fields_matched: number;
    score: `${number}`; // To prevent scores from being truncated by JSON spec
    tokens_matched: number;
  };
  geo_distance_meters?: {
    location: number
  };
}

export interface SearchResponseFacetCountSchema<T extends DocumentSchema> {
  counts: {
    count: number;
    highlighted: string;
    value: string;
    parent?: Record<string, string | number | boolean>;
  }[];
  field_name: keyof T;
  sampled: boolean;
  stats: {
    avg?: number;
    max?: number;
    min?: number;
    sum?: number;
    total_values?: number;
  };
}

interface LLMResponse {
  content: string;
  extraction_method: string;
  model: string;
}

// Todo: we could infer whether this is a grouped response by adding the search params as a generic
export interface SearchResponse<T extends DocumentSchema> {
  facet_counts?: SearchResponseFacetCountSchema<T>[];
  found: number;
  found_docs?: number;
  out_of: number;
  page: number;
  request_params: SearchResponseRequestParams;
  search_time_ms: number;
  search_cutoff?: boolean;
  hits?: SearchResponseHit<T>[];
  grouped_hits?: {
    group_key: string[];
    hits: SearchResponseHit<T>[];
    found?: number;
  }[];
  parsed_nl_query?: {
    parse_time_ms: number;
    generated_params: SearchParams<T>;
    augmented_params: SearchParams<T>;
    llm_response?: LLMResponse;
  };
  conversation?: {
    answer: string;
    conversation_history: {
      conversation: object[];
      id: string;
      last_updated: number;
      ttl: number;
    };
    conversation_id: string;
    query: string;
  };
  error?: string;
  code?: number;
}

export interface DocumentWriteParameters {
  dirty_values?: "coerce_or_reject" | "coerce_or_drop" | "drop" | "reject";
  action?: "create" | "update" | "upsert" | "emplace";
}

export interface UpdateByFilterParameters {
  filter_by?: string;
}

export interface UpdateByFilterResponse {
  num_updated: number;
}

export interface DocumentImportParameters extends DocumentWriteParameters {
  batch_size?: number;
  remote_embedding_batch_size?: number;
  remote_embedding_timeout_ms?: number;
  remote_embedding_num_tries?: number;
  return_doc?: boolean;
  return_id?: boolean;
  throwOnFail?: boolean;
}

export interface DocumentsExportParameters {
  filter_by?: string;
  include_fields?: string;
  exclude_fields?: string;
}

export interface SearchOptions {
  cacheSearchResultsForSeconds?: number;
  abortSignal?: AbortSignal | null;
}

const isNodeJSEnvironment =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null;

export default class Documents<T extends DocumentSchema = object>
  extends SearchOnlyDocuments<T>
  implements WriteableDocuments<T>
{
  constructor(
    collectionName: string,
    apiCall: ApiCall,
    configuration: Configuration,
  ) {
    super(collectionName, apiCall, configuration);
  }

  async create(document: T, options: DocumentWriteParameters = {}): Promise<T> {
    if (!document) throw new Error("No document provided");
    return this.apiCall.post<T>(this.endpointPath(), document, options);
  }

  async upsert(document: T, options: DocumentWriteParameters = {}): Promise<T> {
    if (!document) throw new Error("No document provided");
    return this.apiCall.post<T>(
      this.endpointPath(),
      document,
      Object.assign({}, options, { action: "upsert" }),
    );
  }

  async update(
    document: T,
    options: UpdateByFilterParameters,
  ): Promise<UpdateByFilterResponse>;
  async update(document: T, options: DocumentWriteParameters): Promise<T>;
  async update(
    document: T,
    options: DocumentWriteParameters | UpdateByFilterParameters = {},
  ): Promise<UpdateByFilterResponse | T> {
    if (!document) throw new Error("No document provided");

    if (options["filter_by"] != null) {
      return this.apiCall.patch<T>(
        this.endpointPath(),
        document,
        Object.assign({}, options),
      );
    } else {
      return this.apiCall.post<T>(
        this.endpointPath(),
        document,
        Object.assign({}, options, { action: "update" }),
      );
    }
  }

  async delete(
    query: DeleteQuery = {} as DeleteQuery,
  ): Promise<DeleteResponse<T>> {
    return this.apiCall.delete<DeleteResponse<T>>(this.endpointPath(), query);
  }

  async createMany(documents: T[], options: DocumentImportParameters = {}) {
    this.configuration.logger.warn(
      "createMany is deprecated and will be removed in a future version. Use import instead, which now takes both an array of documents or a JSONL string of documents",
    );
    return this.import(documents, options);
  }

  /**
   * Import a set of documents in a batch.
   * @param {string|Array} documents - Can be a JSONL string of documents or an array of document objects.
   * @param options
   * @return {string|Array} Returns a JSONL string if the input was a JSONL string, otherwise it returns an array of results.
   */
  async import(
    documents: string,
    options?: DocumentImportParameters,
  ): Promise<string>;
  async import(
    documents: T[],
    options?: DocumentImportParameters,
  ): Promise<ImportResponse<T>[]>;
  async import(
    documents: T[] | string,
    options: DocumentImportParameters = {},
  ): Promise<string | ImportResponse<T>[]> {
    // Set default value for throwOnFail if not provided
    const finalOptions = { throwOnFail: true, ...options };
    let documentsInJSONLFormat;
    if (Array.isArray(documents)) {
      if (documents.length === 0) {
        throw new RequestMalformed("No documents provided");
      }
      try {
        documentsInJSONLFormat = documents
          .map((document) => JSON.stringify(document))
          .join("\n");
      } catch (error: any) {
        // if rangeerror, throw custom error message
        if (
          error instanceof RangeError &&
          error.message.includes("Too many properties to enumerate")
        ) {
          throw new Error(`${error}
          It looks like you have reached a Node.js limit that restricts the number of keys in an Object: https://stackoverflow.com/questions/9282869/are-there-limits-to-the-number-of-properties-in-a-javascript-object

         Please try reducing the number of keys in your document, or using CURL to import your data.
          `);
        }

        // else, throw the non-range error anyways
        throw new Error(error);
      }
    } else {
      documentsInJSONLFormat = documents;
      if (isEmptyString(documentsInJSONLFormat)) {
        throw new RequestMalformed("No documents provided");
      }
    }

    const resultsInJSONLFormat = await this.apiCall.performRequest<string>(
      "post",
      this.endpointPath("import"),
      {
        queryParameters: finalOptions,
        bodyParameters: documentsInJSONLFormat,
        additionalHeaders: { "Content-Type": "text/plain" },
        skipConnectionTimeout: true, // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
        enableKeepAlive: isNodeJSEnvironment ? true : false, // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
      },
    );

    if (Array.isArray(documents)) {
      const resultsInJSONFormat = resultsInJSONLFormat
        .split("\n")
        .map((r) => JSON.parse(r)) as ImportResponse<T>[];
      const failedItems = resultsInJSONFormat.filter(
        (r) => r.success === false,
      );
      if (failedItems.length > 0 && finalOptions.throwOnFail) {
        throw new ImportError(
          `${
            resultsInJSONFormat.length - failedItems.length
          } documents imported successfully, ${
            failedItems.length
          } documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`,
          resultsInJSONFormat,
          {
            documentsInJSONLFormat,
            options: finalOptions,
            failedItems,
            successCount: resultsInJSONFormat.length - failedItems.length,
          },
        );
      } else {
        return resultsInJSONFormat;
      }
    } else {
      return resultsInJSONLFormat as string;
    }
  }
  /**
   * Imports documents from a NodeJS readable stream of JSONL.
   */
  async importStream(
    readableStream: ReadStream,
    options: DocumentImportParameters = {},
  ): Promise<ImportResponse<T>[]> {
    const finalOptions = { throwOnFail: true, ...options };
    
    const resultsInJSONLFormat = await this.apiCall.performRequest<string>(
      "post",
      this.endpointPath("import"),
      {
        queryParameters: finalOptions,
        bodyParameters: readableStream,
        additionalHeaders: { "Content-Type": "text/plain" },
        skipConnectionTimeout: true, // We never want to client-side-timeout on an import and retry, since imports are syncronous and we want to let them take as long as it takes to complete fully
        enableKeepAlive: isNodeJSEnvironment ? true : false, // This is to prevent ECONNRESET socket hang up errors. Reference: https://github.com/axios/axios/issues/2936#issuecomment-779439991
      },
    );

    const resultsInJSONFormat = resultsInJSONLFormat
      .split("\n")
      .map((r) => JSON.parse(r)) as ImportResponse<T>[];
    const failedItems = resultsInJSONFormat.filter((r) => r.success === false);
    if (failedItems.length > 0 && finalOptions.throwOnFail) {
      throw new ImportError(
        `${
          resultsInJSONFormat.length - failedItems.length
        } documents imported successfully, ${
          failedItems.length
        } documents failed during import. Use \`error.importResults\` from the raised exception to get a detailed error reason for each document.`,
        resultsInJSONFormat,
        {
          documentsInJSONLFormat: readableStream,
          options: finalOptions,
          failedItems,
          successCount: resultsInJSONFormat.length - failedItems.length,
        },
      );
    } else {
      return resultsInJSONFormat;
    }
  }

  /**
   * Returns a JSONL string for all the documents in this collection
   */
  async export(options: DocumentsExportParameters = {}): Promise<string> {
    return this.apiCall.get<string>(this.endpointPath("export"), options);
  }

  /**
   * Returns a NodeJS readable stream of JSONL for all the documents in this collection.
   */
  async exportStream(
    options: DocumentsExportParameters = {},
  ): Promise<ReadStream> {
    return this.apiCall.get<ReadStream>(this.endpointPath("export"), options, {
      responseType: "stream",
    });
  }
}

function isEmptyString(str: string | null | undefined): boolean {
  return str == null || str === "" || str.length === 0;
}

/**
 * @deprecated Import from './Types' instead
 */
export type {
  SearchParams,
  WriteableDocuments,
  SearchableDocuments,
  DropTokensMode,
  OperationMode,
  UnionArrayKeys,
  UnionArraySearchParams,
  ArraybleParams,
  ExtractBaseTypes,
  SearchResponseRequestParams,
} from "./Types";
