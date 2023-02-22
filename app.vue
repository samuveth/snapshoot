<script setup>
const { init, getSpaceId } = useApp();

getSpaceId();

onMounted(() => {
  init();
});
</script>

<template>
  <div class="text-gray-dark">
    <TheNavbar />
    <NuxtPage />
    <Teleport to="body">
      <ModalConnect />
    </Teleport>
  </div>
</template>
