import Configuration, { ConfigurationOptions } from "./Configuration";
import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Collection from "./Collection";
import Aliases from "./Aliases";
import Alias from "./Alias";
import Keys from "./Keys";
import Key from "./Key";
import Debug from "./Debug";
import Metrics from "./Metrics";
import Stats from "./Stats";
import Health from "./Health";
import Operations from "./Operations";
import MultiSearch from "./MultiSearch";
import Presets from "./Presets";
import Preset from "./Preset";
import AnalyticsV1 from "./AnalyticsV1";
import Analytics from "./Analytics";
import Stopwords from "./Stopwords";
import Stopword from "./Stopword";
import Conversations from "./Conversations";
import Conversation from "./Conversation";
import Stemming from "./Stemming";
import NLSearchModels from "./NLSearchModels";
import NLSearchModel from "./NLSearchModel";
import SynonymSets from "./SynonymSets";
import SynonymSet from "./SynonymSet";
import CurationSets from "./CurationSets";
import CurationSet from "./CurationSet";
/**
 * Typesense client for indexing, searching, and managing collections.
 *
 * @see https://typesense.org/docs/latest/api/
 */
export default class Client {
    configuration: Configuration;
    apiCall: ApiCall;
    /**
     * Retrieve server version and state information.
     *
     * @example
     * await client.debug.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html#debug
     */
    debug: Debug;
    /**
     * Get current RAM, CPU, Disk & Network usage metrics.
     *
     * @example
     * await client.metrics.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    metrics: Metrics;
    /**
     * Get stats about API endpoints.
     *
     * @example
     * await client.stats.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    stats: Stats;
    /**
     * Checks if Typesense server is ready to accept requests.
     *
     * @example
     * await client.health.retrieve()
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html#health
     */
    health: Health;
    /**
     * Cluster operations: snapshots, voting, cache, on-disk compaction, slow request log.
     *
     * @example
     * await client.operations.perform("snapshot", { snapshot_path: "/tmp/snap" })
     *
     * @see https://typesense.org/docs/latest/api/cluster-operations.html
     */
    operations: Operations;
    /**
     * Send multiple search requests in a single HTTP request.
     *
     * @example
     * await client.multiSearch.perform({ searches: [{ collection: "products", q: "*" }] })
     *
     * @see https://typesense.org/docs/latest/api/documents.html#federated-multi-search
     */
    multiSearch: MultiSearch;
    /**
     * Manage analytics rules and events.
     *
     * @example
     * await client.analytics.rules().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    analytics: Analytics;
    /**
     * Legacy v1 analytics API for rules and events.
     *
     * @example
     * await client.analyticsV1.rules().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/analytics-query-suggestions.html
     */
    analyticsV1: AnalyticsV1;
    /**
     * Manage stemming dictionaries.
     *
     * @example
     * await client.stemming.dictionaries().retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stemming.html
     */
    stemming: Stemming;
    private readonly _collections;
    private readonly individualCollections;
    private readonly _aliases;
    private readonly individualAliases;
    private readonly _keys;
    private readonly individualKeys;
    private readonly _presets;
    private readonly individualPresets;
    private readonly _stopwords;
    private readonly individualStopwords;
    private readonly _conversations;
    private readonly individualConversations;
    private readonly _nlSearchModels;
    private readonly individualNLSearchModels;
    private readonly _synonymSets;
    private readonly individualSynonymSets;
    private readonly _curationSets;
    private readonly individualCurationSets;
    constructor(options: ConfigurationOptions);
    /**
     * Access the collections resource. Call without arguments to list or create collections, or pass a name to access a single collection.
     *
     * @example
     * await client.collections().create({ name: "products", fields: [{ name: "title", type: "string" }] })
     * @example
     * await client.collections("products").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collections.html
     */
    collections(): Collections;
    /**
     * Access an individual collection by name.
     *
     * @example
     * await client.collections("products").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collections.html
     */
    collections<T extends Record<string, any> = object>(collectionName: string): Collection<T>;
    /**
     * Access the aliases resource. Call without arguments to list or upsert aliases, or pass a name to access a single alias.
     *
     * @example
     * await client.aliases().upsert("my-alias", { collection_name: "products" })
     * @example
     * await client.aliases("my-alias").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html
     */
    aliases(): Aliases;
    /**
     * Access an individual collection alias by name.
     *
     * @example
     * await client.aliases("my-alias").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/collection-alias.html
     */
    aliases(aliasName: string): Alias;
    /**
     * Access the API keys resource. Call without arguments to list or create keys, or pass an ID to access a single key.
     *
     * @example
     * await client.keys().create({ description: "Search-only key", actions: ["documents:search"], collections: ["*"] })
     * @example
     * await client.keys(1).retrieve()
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html
     */
    keys(): Keys;
    /**
     * Access an individual API key by ID.
     *
     * @example
     * await client.keys(1).retrieve()
     *
     * @see https://typesense.org/docs/latest/api/api-keys.html
     */
    keys(id: number): Key;
    /**
     * Access the presets resource. Call without arguments to list or upsert presets, or pass an ID to access a single preset.
     *
     * @example
     * await client.presets().upsert("listing_view", { value: { q: "*" } })
     * @example
     * await client.presets("listing_view").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    presets(): Presets;
    /**
     * Access an individual preset by ID.
     *
     * @example
     * await client.presets("listing_view").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/search.html#presets
     */
    presets(id: string): Preset;
    /**
     * Access the stopwords resource. Call without arguments to list or upsert stopword sets, or pass an ID to access a single set.
     *
     * @example
     * await client.stopwords().upsert("en", { stopwords: ["a", "the"] })
     * @example
     * await client.stopwords("en").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stopwords.html
     */
    stopwords(): Stopwords;
    /**
     * Access an individual stopwords set by ID.
     *
     * @example
     * await client.stopwords("en").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/stopwords.html
     */
    stopwords(id: string): Stopword;
    /**
     * Access the conversation models resource. Call without arguments to list models, or pass an ID to access a single model.
     *
     * @example
     * await client.conversations().retrieve()
     * @example
     * await client.conversations("conv-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    conversations(): Conversations;
    /**
     * Access an individual conversation model by ID.
     *
     * @example
     * await client.conversations("conv-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/conversational-search-rag.html
     */
    conversations(id: string): Conversation;
    /**
     * Access the NL search models resource. Call without arguments to list or create models, or pass an ID to access a single model.
     *
     * @example
     * await client.nlSearchModels().create({ model_name: "openai/gpt-4" })
     * @example
     * await client.nlSearchModels("model-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/natural-language-search.html
     */
    nlSearchModels(): NLSearchModels;
    /**
     * Access an individual NL search model by ID.
     *
     * @example
     * await client.nlSearchModels("model-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/natural-language-search.html
     */
    nlSearchModels(id: string): NLSearchModel;
    /**
     * Access the synonym sets resource. Call without arguments to list sets, or pass a name to access a single set.
     *
     * @example
     * await client.synonymSets().retrieve()
     * @example
     * await client.synonymSets("my-set").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    synonymSets(): SynonymSets;
    /**
     * Access an individual synonym set by name.
     *
     * @example
     * await client.synonymSets("my-set").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/synonyms.html
     */
    synonymSets(synonymSetName: string): SynonymSet;
    /**
     * Access the curation sets resource. Call without arguments to list sets, or pass a name to access a single set.
     *
     * @example
     * await client.curationSets().retrieve()
     * @example
     * await client.curationSets("my-set").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    curationSets(): CurationSets;
    /**
     * Access an individual curation set by name.
     *
     * @example
     * await client.curationSets("my-set").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/curation.html
     */
    curationSets(name: string): CurationSet;
}
