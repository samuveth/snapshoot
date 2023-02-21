<script setup lang="ts">
const { web3 } = useWeb3();
const { isConnectOpen } = useModal();
</script>

<template>
  <div class="bg-gray-light">
    <BaseContainer>
      <div class="flex justify-between py-3">
        <div>name</div>
        <BaseButton @click="isConnectOpen = true">
          {{ web3.account ? web3.account : "Connect Wallet" }}
        </BaseButton>
      </div>
    </BaseContainer>
  </div>
</template>
