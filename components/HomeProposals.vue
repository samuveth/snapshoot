<script setup lang="ts">
import { PROPOSALS_QUERY } from "@/helpers/queries";
import { Proposal } from "@/helpers/interfaces";
import { useMediaQuery } from "@vueuse/core";

const { spaceEns } = useApp();
const { getRelativeProposalPeriod, formatCompactNumber } = useIntl();
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

const columns = ["Proposal", "Author", "Votes"];
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <template v-else>
      <div
        class="rounded-default border border-gray-light bg-white py-10 px-6 lg:px-8"
      >
        <div class="justify-between sm:flex sm:items-center">
          <h3 class="text-2xl font-semibold">Proposals</h3>
          <BaseButton variant="primary" size="lg" class="mt-6 sm:mt-0">
            Create Proposal
          </BaseButton>
        </div>
        <div class="mt-8 flow-root">
          <div class="-my-2 -mx-6 overflow-x-auto lg:-mx-8">
            <div
              class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
            >
              <table class="min-w-full divide-y divide-gray-medium">
                <thead>
                  <tr class="text-left text-sm">
                    <th
                      v-for="c in columns"
                      class="py-3.5 pl-6 pr-3 first:sm:pl-0 last:sm:pr-0"
                    >
                      {{ c }}
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-light">
                  <tr class="" v-for="proposal in proposals">
                    <td class="py-3.5 pl-6 pr-3 sm:pl-0">
                      <NuxtLink
                        :to="`/p/${proposal.id}`"
                        class="text-lg line-clamp-1 hover:underline"
                      >
                        {{ proposal.title }}
                      </NuxtLink>
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
                    <td class="py-3.5 pl-6 pr-3">
                      <BaseUser
                        :address="proposal.author"
                        :profile="profiles[proposal.author]"
                        :hide-username="isSmallScreen"
                      />
                    </td>
                    <td class="py-3.5 pl-6 pr-3 sm:pr-0">
                      {{ formatCompactNumber(proposal.votes) }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
