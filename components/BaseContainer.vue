<script setup lang="ts">
defineProps<{
  slim?: boolean;
}>();
</script>

<template>
  <div class="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8">
    <slot />
  </div>
</template>
