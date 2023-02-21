import type { ConnectorOptions } from "./types";
import type {
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";

export default class LockConnector {
  public options: ConnectorOptions;

  constructor(options: ConnectorOptions) {
    this.options = options;
  }

  async connect(): Promise<void | ExternalProvider | JsonRpcFetchFunc> {
    return;
  }

  disconnect(): void {
    return;
  }

  async isLoggedIn(): Promise<boolean | void> {
    return;
  }
}
