import ApiCall from "./ApiCall";
import {
  ConversationModelCreateSchema,
  ConversationModelSchema,
} from "./ConversationModel";

export interface ConversationModelsRetrieveSchema {
  models: ConversationModelSchema[];
}

const RESOURCEPATH = "/conversations/models";

export default class ConversationModels {
  constructor(private readonly apiCall: ApiCall) {
    this.apiCall = apiCall;
  }

  async create(
    params: ConversationModelCreateSchema,
  ): Promise<ConversationModelCreateSchema> {
    return this.apiCall.post<ConversationModelCreateSchema>(
      this.endpointPath(),
      params,
    );
  }

  async retrieve(): Promise<ConversationModelsRetrieveSchema> {
    return this.apiCall.get<ConversationModelsRetrieveSchema>(
      this.endpointPath(),
    );
  }

  private endpointPath(operation?: string): string {
    return `${ConversationModels.RESOURCEPATH}${
      operation === undefined ? "" : "/" + operation
    }`;
  }

  static get RESOURCEPATH() {
    return RESOURCEPATH;
  }
}
