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

const metaDescription = computed(() => {
  const body = proposal.value?.body;
  if (!body) return "";
  return body.length > 200 ? body.slice(0, 225) + "..." : body;
});

const metaTitle = computed(() => {
  const title = proposal.value?.title;
  if (!title) return "";
  return title;
});

useSeoMeta({
  description: () => metaDescription.value,
  ogDescription: () => metaDescription.value,
});

useHead({
  titleTemplate: `%s - ${proposal.value?.space.name}`,
  title: metaTitle.value,
});
</script>

<template>
  <BaseContainer class="py-8">
    <div class="rounded-default border bg-white py-10 px-8">
      <template v-if="proposal">
        <h1 class="text-xl">
          {{ proposal.title }}
        </h1>
        <ProposalNav />
        <div class="mt-3">
          <div v-if="route.hash === '#results'">
            <!-- <ProposalResults :proposal="proposal" /> -->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
            earum suscipit odio voluptates sed sint exercitationem debitis eaque
            nobis eos consequuntur beatae alias, unde dolor, quidem, voluptate
            error consectetur deserunt.
          </div>
          <div v-else-if="route.hash === '#discussion'">
            <!-- <ProposalDiscussion :proposal="proposal" /> -->
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Voluptatibus doloremque possimus porro obcaecati pariatur quidem
            eius ipsum illo voluptatum facilis, velit recusandae. Aliquam
            cupiditate autem recusandae neque quos ipsum? Vitae!
          </div>
          <div v-else>
            <!-- <ProposalResults :proposal="proposal" /> -->
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
            nostrum ratione obcaecati? Voluptatibus tempore ex itaque doloribus
            omnis veniam autem earum sit, reiciendis cum commodi laborum ipsa
            assumenda dignissimos? Eligendi?
          </div>
        </div>
      </template>
      <div v-else>Laoding...</div>
    </div>
  </BaseContainer>
</template>
