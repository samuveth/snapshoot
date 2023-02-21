<script setup lang="ts">
import { SPACES_QUERY } from "@/helpers/queries";
import { Space } from "@/helpers/interfaces";

const { spaceEns } = useApp();

const { result } = useQuery<{
  spaces: Space[];
}>(
  SPACES_QUERY,
  {
    id_in: ["testsnap.eth"],
  },
  { prefetch: true }
);

const space = computed(() => result.value?.spaces[0]);

useSeoMeta({
  title: () => space.value?.name ?? "",
  description: () => space.value?.about ?? "",
  ogTitle: () => space.value?.name ?? "",
  ogDescription: () => space.value?.about ?? "",
});
</script>

<template>
  <BaseContainer>{{ space }}</BaseContainer>
</template>
