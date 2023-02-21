import LockConnector from "../connector";
import type { ConnectorOptions } from "../types";
import type {
  JsonRpcFetchFunc,
  ExternalProvider,
} from "@ethersproject/providers";

interface WalletConnectProviderOptions extends ConnectorOptions {
  rpc?: Record<string, any>;
}

export default class Connector extends LockConnector {
  constructor(options: WalletConnectProviderOptions) {
    super(options);
  }
  async connect(): Promise<void | ExternalProvider | JsonRpcFetchFunc> {
    let provider;
    try {
      const WalletConnectProvider = await import(
        "@walletconnect/web3-provider/dist/umd/index.min.js"!
      );
      provider = new WalletConnectProvider.default(this.options);
      await provider.enable();
    } catch (e) {
      console.error(e);
      return;
    }
    provider.connectorName = "walletconnect";
    return provider;
  }

  disconnect() {
    if (localStorage) {
      localStorage.removeItem("walletconnect");
    }
    return;
  }
}
