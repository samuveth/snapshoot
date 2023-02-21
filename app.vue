<script setup>
const { init, getSpaceId } = useApp();

getSpaceId();

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
