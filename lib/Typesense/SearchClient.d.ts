import { ConfigurationOptions } from './Configuration';
import Collection from './Collection';
export default class SearchClient {
    private readonly configuration;
    private readonly apiCall;
    private readonly multiSearch;
    private readonly individualCollections;
    constructor(options: ConfigurationOptions);
    collections(collectionName: string): Collection;
}
