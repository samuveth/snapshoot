<script setup lang="ts">
import { PROPOSALS_QUERY } from "@/helpers/queries";
import { Proposal } from "@/helpers/interfaces";
import { useMediaQuery } from "@vueuse/core";

const { spaceEns } = useApp();
const { getRelativeProposalPeriod } = useIntl();
const { d } = useI18n();
const { profiles, loadProfiles } = useProfiles();
const isSmallScreen = useMediaQuery("(max-width: 640px)");

const { result, loading } = useQuery<{
  proposals: Proposal[];
}>(PROPOSALS_QUERY, {
  space_in: [spaceEns.value],
  first: 20,
  skip: 0,
  state: "all",
});

const proposals = computed(() => result.value?.proposals || []);

watch(proposals, () => {
  loadProfiles(proposals.value.map((proposal) => proposal.author));
});
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <template v-else>
      <!-- Create a table with, Proposal, Creator, Votes -->
      <div class="rounded-default border border-gray-light bg-white">
        <!-- <h2 class="border-b border-gray-light px-4 py-4 text-2xl font-bold">
          Proposals
        </h2> -->
        <table class="w-full">
          <thead>
            <tr class="text-left">
              <th class="w-2/3 px-4 py-2">Proposal</th>
              <th class="px-4 py-2">Author</th>
              <th class="px-4 py-2">Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="last:border-b- cursor-pointer border-b border-gray-light first:border-t"
              v-for="proposal in proposals"
              @click="$router.push(`/p/${proposal.id}`)"
            >
              <td class="w-2/3 px-4 py-2">
                <span class="text-2xl line-clamp-1">
                  {{ proposal.title }}
                </span>
                <div class="flex items-center gap-1">
                  <i-heroicons-clock-solid
                    class="text-sm"
                    :class="[
                      proposal.state === 'active'
                        ? 'text-success'
                        : proposal.state === 'closed'
                        ? 'text-warning'
                        : 'text-gray-medium',
                    ]"
                  />
                  <span class="text-sm">
                    {{
                      getRelativeProposalPeriod(
                        proposal.state,
                        proposal.start,
                        proposal.end
                      )
                    }}
                  </span>
                </div>
              </td>
              <td class="px-4 py-2">
                <BaseUser
                  :address="proposal.author"
                  :profile="profiles[proposal.author]"
                  :hide-username="isSmallScreen"
                />
              </td>
              <td class="px-4 py-2">100</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
