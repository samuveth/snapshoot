<script setup lang="ts">
import { SPACES_QUERY } from "@/helpers/queries";
import { Space } from "@/helpers/interfaces";

const { spaceEns } = useApp();

const { data } = useAsyncQuery<{
  spaces: Space[];
}>(SPACES_QUERY, {
  id_in: [spaceEns.value],
});

const space = computed(() => data.value?.spaces[0]);
</script>

<template>
  <Head>
    <Title>testing CCC</Title>
    <Meta name="description" :content="space?.about" />
  </Head>
  <BaseContainer>{{ space }}</BaseContainer>
</template>
