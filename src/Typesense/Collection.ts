import ApiCall from "./ApiCall";
import Collections from "./Collections";
import Documents from "./Documents";
import Document from "./Document";
import Overrides from "./Overrides";
import Override from "./Override";
import Synonyms from "./Synonyms";
import Synonym from "./Synonym";

export default class Collection {
    private readonly _documents: Documents;
    private individualDocuments: Record<string, any> = {};
    private readonly _overrides: Overrides;
    private individualOverrides: Record<string, any> = {};
    private readonly _synonyms: Synonyms;
    private individualSynonyms: Record<string, any> = {};

    constructor(private readonly name: string, private readonly apiCall: ApiCall, private readonly configuration: any) {
        this.name = name;
        this.apiCall = apiCall;
        this.configuration = configuration;

        this._documents = new Documents(this.name, this.apiCall, this.configuration);
        this._overrides = new Overrides(this.name, this.apiCall);
        this._synonyms = new Synonyms(this.name, this.apiCall);
    }

    retrieve() {
        return this.apiCall.get(this.endpointPath());
    }

    delete() {
        return this.apiCall.delete(this.endpointPath());
    }

    documents(documentId) {
        if (documentId === undefined) {
            return this._documents;
        } else {
            if (this.individualDocuments[documentId] === undefined) {
                this.individualDocuments[documentId] = new Document(this.name, documentId, this.apiCall);
            }
            return this.individualDocuments[documentId];
        }
    }

    overrides(overrideId) {
        if (overrideId === undefined) {
            return this._overrides;
        } else {
            if (this.individualOverrides[overrideId] === undefined) {
                this.individualOverrides[overrideId] = new Override(this.name, overrideId, this.apiCall);
            }
            return this.individualOverrides[overrideId];
        }
    }

    synonyms(synonymId) {
        if (synonymId === undefined) {
            return this._synonyms;
        } else {
            if (this.individualSynonyms[synonymId] === undefined) {
                this.individualSynonyms[synonymId] = new Synonym(this.name, synonymId, this.apiCall);
            }
            return this.individualSynonyms[synonymId];
        }
    }

    private endpointPath() {
        return `${Collections.RESOURCEPATH}/${this.name}`;
    }
}
