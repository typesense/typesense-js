import ApiCall from "./ApiCall";
export interface SchemaChangeStatus {
    collection: string;
    validated_docs: number;
    altered_docs: number;
}
export default class Operations {
    private apiCall;
    constructor(apiCall: ApiCall);
    /**
     * Perform a cluster operation: snapshot, vote, cache/clear, db/compact, or a custom path.
     *
     * @example
     * await client.operations.perform("snapshot", { snapshot_path: "/tmp/snap" })
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    perform(operationName: "vote" | "snapshot" | "cache/clear" | (string & {}), queryParameters?: Record<string, any>): Promise<any>;
    /**
     * Get the status of in-progress schema change operations
     *
     * @example
     * await client.operations.getSchemaChanges()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    getSchemaChanges(): Promise<SchemaChangeStatus[]>;
}
