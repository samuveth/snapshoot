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
    <BaseButton @click="login">
      {{ login }}
    </BaseButton>
  </BaseModal>
</template>
