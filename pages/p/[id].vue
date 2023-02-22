<script setup lang="ts">
import { PROPOSAL_QUERY } from "@/helpers/queries";

const route = useRoute();

const { data } = await useAsyncQuery(PROPOSAL_QUERY, {
  id: route.params.id,
});
</script>

<template>
  <BaseContainer>
    <div>{{ data }}</div>
  </BaseContainer>
</template>
