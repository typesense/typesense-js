/* eslint-disable no-dupe-class-members */

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
import NLSearchModels from "./NLSearchModels";
import NLSearchModel from "./NLSearchModel";

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
  private readonly _collections: Collections;
  private readonly individualCollections: Record<string, Collection>;
  private readonly _aliases: Aliases;
  private readonly individualAliases: Record<string, Alias>;
  private readonly _keys: Keys;
  private readonly individualKeys: Record<number, Key>;
  private readonly _presets: Presets;
  private readonly individualPresets: Record<string, Preset>;
  private readonly _stopwords: Stopwords;
  private readonly individualStopwords: Record<string, Stopword>;
  private readonly _conversations: Conversations;
  private readonly individualConversations: Record<string, Conversation>;
  private readonly _nlSearchModels: NLSearchModels;
  private readonly individualNLSearchModels: Record<string, NLSearchModel>;

  constructor(options: ConfigurationOptions) {
    options.sendApiKeyAsQueryParam = options.sendApiKeyAsQueryParam ?? false;

    this.configuration = new Configuration(options);
    this.apiCall = new ApiCall(this.configuration);
    this.debug = new Debug(this.apiCall);
    this.metrics = new Metrics(this.apiCall);
    this.stats = new Stats(this.apiCall);
    this.health = new Health(this.apiCall);
    this.operations = new Operations(this.apiCall);
    this.multiSearch = new MultiSearch(this.apiCall, this.configuration);
    this._collections = new Collections(this.apiCall);
    this.individualCollections = {};
    this._aliases = new Aliases(this.apiCall);
    this.individualAliases = {};
    this._keys = new Keys(this.apiCall);
    this.individualKeys = {};
    this._presets = new Presets(this.apiCall);
    this.individualPresets = {};
    this._stopwords = new Stopwords(this.apiCall);
    this.individualStopwords = {};
    this.analytics = new Analytics(this.apiCall);
    this.stemming = new Stemming(this.apiCall);
    this._conversations = new Conversations(this.apiCall);
    this.individualConversations = {};
    this._nlSearchModels = new NLSearchModels(this.apiCall);
    this.individualNLSearchModels = {};
  }

  collections(): Collections;
  collections<T extends Record<string, any> = object>(
    collectionName: string,
  ): Collection<T>;
  collections(collectionName?: string): Collections | Collection {
    if (collectionName === undefined) {
      return this._collections;
    } else {
      if (this.individualCollections[collectionName] === undefined) {
        this.individualCollections[collectionName] = new Collection(
          collectionName,
          this.apiCall,
          this.configuration,
        );
      }
      return this.individualCollections[collectionName];
    }
  }

  aliases(): Aliases;
  aliases(aliasName: string): Alias;
  aliases(aliasName?: string): Aliases | Alias {
    if (aliasName === undefined) {
      return this._aliases;
    } else {
      if (this.individualAliases[aliasName] === undefined) {
        this.individualAliases[aliasName] = new Alias(aliasName, this.apiCall);
      }
      return this.individualAliases[aliasName];
    }
  }

  keys(): Keys;
  keys(id: number): Key;
  keys(id?: number): Keys | Key {
    if (id === undefined) {
      return this._keys;
    } else {
      if (this.individualKeys[id] === undefined) {
        this.individualKeys[id] = new Key(id, this.apiCall);
      }
      return this.individualKeys[id];
    }
  }

  presets(): Presets;
  presets(id: string): Preset;
  presets(id?: string): Presets | Preset {
    if (id === undefined) {
      return this._presets;
    } else {
      if (this.individualPresets[id] === undefined) {
        this.individualPresets[id] = new Preset(id, this.apiCall);
      }
      return this.individualPresets[id];
    }
  }

  stopwords(): Stopwords;
  stopwords(id: string): Stopword;
  stopwords(id?: string): Stopwords | Stopword {
    if (id === undefined) {
      return this._stopwords;
    } else {
      if (this.individualStopwords[id] === undefined) {
        this.individualStopwords[id] = new Stopword(id, this.apiCall);
      }
      return this.individualStopwords[id];
    }
  }

  conversations(): Conversations;
  conversations(id: string): Conversation;
  conversations(id?: string): Conversations | Conversation {
    if (id === undefined) {
      return this._conversations;
    } else {
      if (this.individualConversations[id] === undefined) {
        this.individualConversations[id] = new Conversation(id, this.apiCall);
      }
      return this.individualConversations[id];
    }
  }

  nlSearchModels(): NLSearchModels;
  nlSearchModels(id: string): NLSearchModel;
  nlSearchModels(id?: string): NLSearchModels | NLSearchModel {
    if (id === undefined) {
      return this._nlSearchModels;
    } else {
      if (this.individualNLSearchModels[id] === undefined) {
        this.individualNLSearchModels[id] = new NLSearchModel(id, this.apiCall);
      }
      return this.individualNLSearchModels[id];
    }
  }
}
