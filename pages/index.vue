<script setup lang="ts">
import { SPACES_QUERY } from "@/helpers/queries";
import { Space } from "@/helpers/interfaces";

const { spaceEns } = useApp();

const { data } = await useAsyncQuery<{
  spaces: Space[];
}>(SPACES_QUERY, {
  id_in: [spaceEns.value],
});

const space = computed(() => data.value?.spaces[0]);

useSeoMeta({
  title: () => space.value?.name ?? "",
  description: () => space.value?.about ?? "",
  ogTitle: () => space.value?.name ?? "",
  ogDescription: () => space.value?.about ?? "",
});
</script>

<template>
  <BaseContainer class="py-8">
    <HomeStats v-if="space" :space="space" />
    <HomeProposals />
  </BaseContainer>
</template>
