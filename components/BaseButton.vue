<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: "border" | "primary" | "secondary";
    size?: "sm" | "md" | "lg";
    textLight?: boolean;
  }>(),
  {
    variant: "border",
    size: "md",
    textLight: false,
  }
);

const buttonSize = computed(() => {
  switch (props.size) {
    case "sm":
      return "px-2.5 py-1.5 text-xs";
    case "md":
      return "px-3 py-2 text-sm";
    case "lg":
      return "px-4 py-2.5 text-base";
  }
});
</script>

<template>
  <button
    type="button"
    class="inline-flex items-center rounded-button border font-medium shadow-sm focus:outline-none focus:ring-primary/30 focus:ring-offset-2 focus-visible:ring-2"
    :class="[
      variant === 'primary'
        ? 'border-transparent bg-primary text-white hover:bg-primary/95'
        : 'border-gray-medium text-gray-dark hover:border-gray-dark',
      textLight ? '!text-gray-light' : '',
      buttonSize,
    ]"
  >
    <slot />
  </button>
</template>
