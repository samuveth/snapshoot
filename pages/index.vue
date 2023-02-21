<script setup lang="ts">
import { SPACES_QUERY } from "@/helpers/queries";
import { Space } from "@/helpers/interfaces";

const { spaceEns } = useApp();

const { data } = useAsyncQuery<{
  spaces: Space[];
}>(SPACES_QUERY, {
  id_in: [spaceEns.value],
});
</script>

<template>
  <BaseContainer>{{ data?.spaces[0] }}</BaseContainer>
</template>
