<script setup>
const { init } = useApp();

onMounted(() => {
  init();
});
</script>

<template>
  <TheNavbar />
  <NuxtPage />
</template>
