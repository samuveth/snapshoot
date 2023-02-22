import { computed, Ref } from "vue";
import { shorten } from "@/helpers/utils";
import { Profile } from "@/helpers/interfaces";

export function useUsername(
  address: Ref<string>,
  profile?: Ref<Profile | undefined>
) {
  const { web3 } = useWeb3();

  const username = computed(() => {
    if (
      web3.value.account &&
      address.value.toLowerCase() === web3.value.account.toLowerCase()
    ) {
      return "You";
    }

    if (profile?.value?.name) return profile.value.name;
    if (profile?.value?.ens) return profile.value.ens;
    return shorten(address.value);
  });

  return {
    username,
  };
}
