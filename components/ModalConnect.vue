<script setup lang="ts">
const { isConnectOpen } = useModal();
const { login } = useWeb3();
</script>

<template>
  <BaseModal
    :is-open="isConnectOpen"
    @close="isConnectOpen = false"
    :title="$t('connectWallet')"
  >
    <template #body>
      <BaseButton @click="login"> Wallet </BaseButton>
    </template>
  </BaseModal>
</template>
