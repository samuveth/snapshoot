import { ref, computed } from "vue";
import { getInstance } from "@snapshot-labs/lock/plugins/vue3";
import { getInjected } from "@snapshot-labs/lock/src/utils";

const isReady = ref(false);

export function useApp() {
  const { login } = useWeb3();
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
    const auth = getInstance();

    // Auto connect if previous session was connected
    if (window?.parent === window)
      auth.getConnector().then((connector: any) => {
        if (connector) return login(connector);
      });

    // Auto connect with gnosis-connector when gnosis safe is detected
    login("gnosis");

    const injected = computed(() => getInjected());
    // edge case if MM and CBW are both installed
    if (injected.value?.id === "metamask") return;
    // Auto connect when coinbase wallet is detected
    if (injected.value?.id === "coinbase") return login("injected");
  }

  async function init() {
    // getSpace(spaceId);
    isReady.value = true;
    connectWallet();
  }

  return {
    isReady,
    init,
  };
}
