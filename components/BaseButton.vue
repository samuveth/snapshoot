<script setup lang="ts">
defineProps<{
  variant?: "primary" | "secondary";
  textLight?: boolean;
}>();
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center rounded-button border px-2.5 py-1.5 text-xs font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2"
    :class="[
      variant === 'primary'
        ? 'bg-primary text-white border-transparent'
        : 'border-gray-medium text-gray-dark hover:border-gray-dark',
      textLight ? '!text-gray-light' : '',
    ]"
  >
    <slot />
  </button>
</template>
