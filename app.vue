<script setup>
const { init } = useApp();

onMounted(() => {
  init();
});
</script>

<template>
  <TheNavbar />
  <NuxtPage />
  <Teleport to="body">
    <ModalConnect />
  </Teleport>
</template>
