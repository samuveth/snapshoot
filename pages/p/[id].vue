<script setup lang="ts">
import { PROPOSAL_QUERY } from "@/helpers/queries";
import { Proposal } from "@/helpers/interfaces";

const route = useRoute();

const { data } = await useAsyncQuery<{
  proposal: Proposal;
}>(PROPOSAL_QUERY, {
  id: route.params.id,
});

const proposal = computed(() => data.value?.proposal);

const description = computed(() => {
  const body = proposal.value?.body;
  if (!body) return "";
  return body.length > 200 ? body.slice(0, 225) + "..." : body;
});

const title = computed(() => {
  const title = proposal.value?.title;
  if (!title) return "";
  return title;
});

useSeoMeta({
  description: () => description.value,
  ogDescription: () => description.value,
});

useHead({
  titleTemplate: `%s - ${proposal.value?.space.name}`,
  title: title.value,
});
</script>

<template>
  <BaseContainer>
    <div>{{ proposal }}</div>
  </BaseContainer>
</template>
