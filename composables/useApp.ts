import { ref, computed } from "vue";
import connectors from "@/helpers/connectors.json";
import { getInjectedWallet } from "@/helpers/lock/utils";

export function useApp() {
  const { login, getConnector } = useWeb3();
  const runtimeConfig = useRuntimeConfig();

  const ENV = runtimeConfig.env;
  let spaceId = "";

  if (ENV === "develop") {
    spaceId = "testsnap";
  } else {
    if (window.location.hostname.includes("snapshoot"))
      spaceId = window.location.hostname.split(".")[0];
  }

  function connectWallet() {
    // Auto connect if previous session was connected
    if (window?.parent === window)
      getConnector().then((connector: any) => {
        if (connector) return login(connector);
      });

    // Auto connect with gnosis-connector when gnosis safe is detected
    // login("gnosis");

    const injected = getInjectedWallet();
    // edge case if MM and CBW are both installed
    if (injected?.id === "metamask") return;
    // Auto connect when coinbase wallet is detected
    // if (injected?.id === "coinbase") return login("injected");
  }

  async function init() {
    connectWallet();
  }

  return {
    init,
    spaceId,
  };
}
