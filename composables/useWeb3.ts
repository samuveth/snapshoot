import { computed, reactive } from "vue";
import { Web3Provider } from "@ethersproject/providers";
import networks from "@snapshot-labs/snapshot.js/src/networks.json";
import { formatUnits } from "@ethersproject/units";
import connectors from "@/helpers/connectors.json";

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
  let web3: any;

  const { connect, disconnect, provider, getConnector } = useLock({
    connectors,
  });

  const runtimeConfig = useRuntimeConfig();

  const defaultNetwork: string =
    runtimeConfig.public.defaultNetwork || Object.keys(networks)[0];

  state.network = networks[defaultNetwork as keyof typeof networks];

  async function login(connector = "injected") {
    state.authLoading = true;
    await connect(connector);
    if (provider.value) {
      web3 = new Web3Provider(provider.value, "any");
      await loadProvider();
    }
    state.authLoading = false;
  }

  function logout() {
    disconnect();
    state.account = "";
  }

  async function loadProvider() {
    try {
      if (provider.value?.removeAllListeners)
        provider.value.removeAllListeners();
      if (provider.value?.on) {
        try {
          provider.value.on("chainChanged", async (chainId: string) => {
            handleChainChanged(formatUnits(chainId, 0));
          });
          provider.value.on("accountsChanged", async (accounts: string[]) => {
            if (accounts.length !== 0) {
              await login();
            }
          });
        } catch (e) {
          console.log(`failed to subscribe to events for provider: ${e}`);
        }
      }
      console.log("Provider", provider.value);
      let network, accounts;
      try {
        const connector = provider.value?.connectorName;
        if (connector === "gnosis") {
          const { chainId: safeChainId, safeAddress } = web3.provider.safe;
          network = { chainId: safeChainId };
          accounts = [safeAddress];
        } else {
          [network, accounts] = await Promise.all([
            web3.getNetwork(),
            web3.listAccounts(),
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
      state.walletConnectType = provider.value?.wc?.peerMeta?.name || null;
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
    getConnector,
    web3: computed(() => state),
  };
}
