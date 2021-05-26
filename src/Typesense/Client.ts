import Configuration from "./Configuration";
import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Collection from "./Collection";
import Aliases from "./Aliases";
import Alias from "./Alias";
import Keys from "./Keys";
import Key from "./Key";
import Debug from "./Debug";
import Metrics from "./Metrics";
import Health from "./Health";
import Operations from "./Operations";
import MultiSearch from "./MultiSearch";

export default class Client {
    configuration: Configuration;
    apiCall: ApiCall;
    debug: Debug;
    metrics: Metrics;
    health: Health;
    operations: Operations;
    multiSearch: MultiSearch;
    private _collections: Collections;
    private individualCollections: Record<string, any>;
    private _aliases: Aliases;
    private individualAliases: Record<string, any>;
    private _keys: Keys;
    private individualKeys: Record<string, any>;

    constructor(options) {
        this.configuration = new Configuration(options);
        this.apiCall = new ApiCall(this.configuration);
        this.debug = new Debug(this.apiCall);
        this.metrics = new Metrics(this.apiCall);
        this.health = new Health(this.apiCall);
        this.operations = new Operations(this.apiCall);
        this.multiSearch = new MultiSearch(this.apiCall, this.configuration);
        this._collections = new Collections(this.apiCall);
        this.individualCollections = {};
        this._aliases = new Aliases(this.apiCall);
        this.individualAliases = {};
        this._keys = new Keys(this.apiCall);
        this.individualKeys = {};
    }

    collections(collectionName) {
        if (collectionName === undefined) {
            return this._collections;
        } else {
            if (this.individualCollections[collectionName] === undefined) {
                this.individualCollections[collectionName] = new Collection(
                    collectionName,
                    this.apiCall,
                    this.configuration
                );
            }
            return this.individualCollections[collectionName];
        }
    }

    aliases(aliasName) {
        if (aliasName === undefined) {
            return this._aliases;
        } else {
            if (this.individualAliases[aliasName] === undefined) {
                this.individualAliases[aliasName] = new Alias(aliasName, this.apiCall);
            }
            return this.individualAliases[aliasName];
        }
    }

    keys(id) {
        if (id === undefined) {
            return this._keys;
        } else {
            if (this.individualKeys[id] === undefined) {
                this.individualKeys[id] = new Key(id, this.apiCall);
            }
            return this.individualKeys[id];
        }
    }
}
