import ApiCall from './ApiCall';
import { OverrideSchema } from './Override';
export interface OverrideCreateSchema {
    rule: {
        query: string;
        match: 'exact' | 'contains';
    };
    filter_by?: string;
    remove_matched_tokens?: boolean;
    includes?: Array<{
        id: string;
        position: number;
    }>;
    excludes?: Array<{
        id: string;
    }>;
    filter_curated_hits?: boolean;
}
export interface OverridesRetrieveSchema {
    overrides: OverrideSchema[];
}
export default class Overrides {
    private collectionName;
    private apiCall;
    constructor(collectionName: string, apiCall: ApiCall);
    upsert(overrideId: string, params: OverrideCreateSchema): Promise<OverrideSchema>;
    retrieve(): Promise<OverridesRetrieveSchema>;
    private endpointPath;
    static get RESOURCEPATH(): string;
}
