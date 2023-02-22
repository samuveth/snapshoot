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

useSeoMeta({
  title: () => proposal.value?.title ?? "",
  description: () => proposal.value?.body ?? "",
  ogTitle: () => proposal.value?.title ?? "",
  ogDescription: () => proposal.value?.body ?? "",
});
</script>

<template>
  <BaseContainer>
    <div>{{ proposal }}</div>
  </BaseContainer>
</template>
