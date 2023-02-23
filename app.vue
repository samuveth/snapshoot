<script setup>
const { init, getSpaceId } = useApp();

getSpaceId();

onMounted(() => {
  init();
});
</script>

<template>
  <div class="min-h-screen bg-light text-dark">
    <TheNavbar />
    <NuxtPage />
    <Teleport to="body">
      <ModalConnect />
    </Teleport>
  </div>
</template>
