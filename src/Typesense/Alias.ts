import Aliases, { CollectionAliasSchema } from "./Aliases";
import ApiCall from "./ApiCall";

export default class Alias {
  constructor(private name: string, private apiCall: ApiCall) {}

  /**
   * Find out which collection an alias points to by fetching it
   *
   * @example
   * await client.aliases("my-alias").retrieve()
   *
   * @see https://typesense.org/docs/latest/api/collection-alias.html#retrieve-an-alias
   */
  async retrieve(): Promise<CollectionAliasSchema> {
    return this.apiCall.get<CollectionAliasSchema>(this.endpointPath());
  }

  /**
   * Delete an alias
   *
   * @example
   * await client.aliases("my-alias").delete()
   *
   * @see https://typesense.org/docs/latest/api/collection-alias.html#delete-an-alias
   */
  async delete(): Promise<CollectionAliasSchema> {
    return this.apiCall.delete<CollectionAliasSchema>(this.endpointPath());
  }

  private endpointPath(): string {
    return `${Aliases.RESOURCEPATH}/${encodeURIComponent(this.name)}`;
  }
}
