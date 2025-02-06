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
import Analytics from "./Analytics";
import Stopwords from "./Stopwords";
import Stopword from "./Stopword";
import Conversations from "./Conversations";
import Conversation from "./Conversation";
import Stemming from "./Stemming";
export default class Client {
    configuration: Configuration;
    apiCall: ApiCall;
    debug: Debug;
    metrics: Metrics;
    stats: Stats;
    health: Health;
    operations: Operations;
    multiSearch: MultiSearch;
    analytics: Analytics;
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
    constructor(options: ConfigurationOptions);
    collections(): Collections;
    collections<T extends Record<string, any> = object>(collectionName: string): Collection<T>;
    aliases(): Aliases;
    aliases(aliasName: string): Alias;
    keys(): Keys;
    keys(id: number): Key;
    presets(): Presets;
    presets(id: string): Preset;
    stopwords(): Stopwords;
    stopwords(id: string): Stopword;
    conversations(): Conversations;
    conversations(id: string): Conversation;
}
