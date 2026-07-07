import ApiCall from "./ApiCall";

const RESOURCEPATH = "/operations";

export interface SchemaChangeStatus {
  collection: string;
  validated_docs: number;
  altered_docs: number;
}

export default class Operations {
  constructor(private apiCall: ApiCall) {}

  /**
   * Perform a cluster operation: snapshot, vote, cache/clear, db/compact, or a custom path.
   *
   * @example
   * await client.operations.perform("snapshot", { snapshot_path: "/tmp/snap" })
   *
   * @see https://typesense.org/docs/latest/api/cluster-operations.html
   */
  async perform(
    operationName:
      | "vote"
      | "snapshot"
      | "cache/clear"
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Can't use `object` here, it needs to intersect with `{}`
      | (string & {}),
    queryParameters: Record<string, any> = {},
  ): Promise<any> {
    return this.apiCall.post(
      `${RESOURCEPATH}/${operationName}`,
      {},
      queryParameters,
    );
  }

  /**
   * Get the status of in-progress schema change operations
   *
   * @example
   * await client.operations.getSchemaChanges()
   *
   * @see https://typesense.org/docs/latest/api/cluster-operations.html
   */
  async getSchemaChanges(): Promise<SchemaChangeStatus[]> {
    return this.apiCall.get<SchemaChangeStatus[]>(
      `${RESOURCEPATH}/schema_changes`,
    );
  }
}
