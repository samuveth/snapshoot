import { getInjectedWallet } from "@/helpers/lock/utils";

const spaceId = ref("");
const spaceEns = ref("");

export function useApp() {
  const { login, getConnector } = useWeb3();
  const runtimeConfig = useRuntimeConfig();

  function getSpaceId() {
    const ENV = runtimeConfig.public.env;
    let id = "testsnap";

    if (
      ENV !== "develop" &&
      window.location.hostname.split(".")[1] === "snapshoot"
    ) {
      id = window.location.hostname.split(".")[0];
    }

    spaceId.value = id;
    spaceEns.value = `${id}.eth`;
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
    getSpaceId();
    connectWallet();
  }

  return {
    init,
    spaceId,
    spaceEns,
  };
}
