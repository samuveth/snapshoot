<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    address: string;
    size?: string;
    previewFile?: File;
  }>(),
  {
    size: "22",
    previewFile: undefined,
  }
);
</script>

<template>
  <BaseAvatar
    :src="`https://cdn.stamp.fyi/avatar/eth:${address}?s=${Number(size) * 2}`"
    :preview-file="previewFile"
    :size="size"
  />
</template>
