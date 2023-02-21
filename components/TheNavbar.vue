<script setup lang="ts">
const { spaceId } = useApp();
const { web3 } = useWeb3();
const { isConnectOpen } = useModal();
</script>

<template>
  <div class="bg-gray-light">
    <BaseContainer>
      <div class="flex justify-between py-3">
        <div class="font-semibold text-xl">{{ spaceId }}</div>
        <BaseButton @click="isConnectOpen = true">
          {{ web3.account ? web3.account : $t("connectWallet") }}
        </BaseButton>
      </div>
    </BaseContainer>
  </div>
</template>
