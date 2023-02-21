<script setup>
const { init, spaceEns } = useApp();

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
