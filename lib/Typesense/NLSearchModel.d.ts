import ApiCall from "./ApiCall";
import type { NLSearchModelBase, NLSearchModelSchema } from "./NLSearchModels";
type NLSearchModelUpdateSchema = NLSearchModelBase;
export interface NLSearchModelDeleteSchema {
    id: string;
}
export default class NLSearchModel {
    private id;
    private apiCall;
    constructor(id: string, apiCall: ApiCall);
    /**
     * Retrieve a specific NL search model by its ID.
     *
     * @example
     * await client.nlSearchModels("model-1").retrieve()
     *
     * @see https://typesense.org/docs/latest/api/natural-language-search.html
     */
    retrieve(): Promise<NLSearchModelSchema>;
    /**
     * Update an existing NL search model.
     *
     * @example
     * await client.nlSearchModels("model-1").update({ model_name: "openai/gpt-4" })
     *
     * @see https://typesense.org/docs/latest/api/natural-language-search.html
     */
    update(schema: NLSearchModelUpdateSchema): Promise<NLSearchModelSchema>;
    /**
     * Delete a specific NL search model by its ID.
     *
     * @example
     * await client.nlSearchModels("model-1").delete()
     *
     * @see https://typesense.org/docs/latest/api/natural-language-search.html
     */
    delete(): Promise<NLSearchModelDeleteSchema>;
    private endpointPath;
}
export {};
