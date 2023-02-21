<script setup lang="ts">
const { web3, login } = useWeb3();
</script>

<template>
  <div class="bg-gray-light">
    <BaseContainer>
      <div class="flex justify-between py-3">
        <div>snapshot</div>
        <div @click="login('injected')">
          {{ web3.account ? web3.account : "Connect Wallet" }}
        </div>
      </div>
    </BaseContainer>
  </div>
</template>
