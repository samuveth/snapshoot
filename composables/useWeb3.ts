import { computed, reactive } from "vue";
import { Web3Provider } from "@ethersproject/providers";
import { getInstance } from "@snapshot-labs/lock/plugins/vue3";
import networks from "@snapshot-labs/snapshot.js/src/networks.json";
import { formatUnits } from "@ethersproject/units";

const state = reactive<{
  account: string;
  network: Record<string, any>;
  authLoading: boolean;
  walletConnectType: string | null;
}>({
  account: "",
  network: {},
  authLoading: false,
  walletConnectType: null,
});

export function useWeb3() {
  let auth;

  const runtimeConfig = useRuntimeConfig();

  const defaultNetwork: string =
    runtimeConfig.defaultNetwork || Object.keys(networks)[0];

  state.network = networks[defaultNetwork as keyof typeof networks];

  async function login(connector = "injected") {
    auth = getInstance();
    state.authLoading = true;
    await auth.login(connector);
    if (auth.provider.value) {
      auth.web3 = new Web3Provider(auth.provider.value, "any");
      await loadProvider();
    }
    state.authLoading = false;
  }

  function logout() {
    auth = getInstance();
    auth.logout();
    state.account = "";
  }

  async function loadProvider() {
    auth = getInstance();
    try {
      if (
        auth.provider.value.removeAllListeners &&
        !auth.provider.value.isTorus
      )
        auth.provider.value.removeAllListeners();
      if (auth.provider.value.on) {
        try {
          auth.provider.value.on("chainChanged", async (chainId: string) => {
            handleChainChanged(formatUnits(chainId, 0));
          });
          auth.provider.value.on(
            "accountsChanged",
            async (accounts: string[]) => {
              if (accounts.length !== 0) {
                await login();
              }
            }
          );
        } catch (e) {
          console.log(`failed to subscribe to events for provider: ${e}`);
        }
      }
      console.log("Provider", auth.provider.value);
      let network, accounts;
      try {
        const connector = auth.provider.value?.connectorName;
        if (connector === "gnosis") {
          const { chainId: safeChainId, safeAddress } = auth.web3.provider.safe;
          network = { chainId: safeChainId };
          accounts = [safeAddress];
        } else {
          [network, accounts] = await Promise.all([
            auth.web3.getNetwork(),
            auth.web3.listAccounts(),
          ]);
        }
      } catch (e) {
        console.log(e);
      }
      console.log("Network", network);
      console.log("Accounts", accounts);
      handleChainChanged(network.chainId);
      const acc = accounts.length > 0 ? accounts[0] : null;

      state.account = acc;
      state.walletConnectType = auth.provider.value?.wc?.peerMeta?.name || null;
    } catch (e) {
      state.account = "";
      return Promise.reject(e);
    }
  }

  function handleChainChanged(chainId: string) {
    if (!networks[chainId as keyof typeof networks])
      state.network = {
        chainId,
        name: "Unknown",
        network: "unknown",
        unknown: true,
      };
    else state.network = networks[chainId as keyof typeof networks];
  }

  return {
    login,
    logout,
    loadProvider,
    handleChainChanged,
    web3: computed(() => state),
    web3Account: computed(() => state.account),
  };
}
