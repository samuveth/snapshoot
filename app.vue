<script setup>
const { init, spaceEns } = useApp();

onMounted(() => {
  init();
});
</script>

<template>
  <TheNavbar />
  <NuxtPage v-if="spaceEns" />
  <Teleport to="body">
    <ModalConnect />
  </Teleport>
</template>
