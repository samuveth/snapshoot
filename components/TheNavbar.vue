<script setup lang="ts">
import { shorten } from "~~/helpers/utils";

const { spaceId } = useApp();
const { web3 } = useWeb3();
const { isConnectOpen } = useModal();
</script>

<template>
  <div class="sticky top-0 w-full border-b border-gray-medium bg-light">
    <BaseContainer>
      <div class="flex justify-between py-3">
        <NuxtLink to="/" class="text-xl font-semibold">{{ spaceId }}</NuxtLink>
        <BaseButton @click="isConnectOpen = true">
          {{ web3.account ? shorten(web3.account) : $t("connectWallet") }}
        </BaseButton>
      </div>
    </BaseContainer>
  </div>
</template>
