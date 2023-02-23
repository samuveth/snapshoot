<script setup lang="ts">
import { Space } from "~~/helpers/interfaces";
import DocIcon from "~icons/heroicons/document";
import PenIcon from "~icons/heroicons/pencil";

const props = defineProps<{
  space: Space;
}>();

interface Stat {
  id: number;
  name: string;
  stat: string;
  icon: any;
  change: string;
}

const runtimeConfig = useRuntimeConfig();
const { formatNumber } = useIntl();

const exploreSpaces = ref(null);

const exploreSpace = computed<{
  proposals: number;
  proposals_7d: number;
  votes: number;
  votes_7d: number;
  followers: number;
  followers_7d: number;
} | null>(() =>
  exploreSpaces.value ? exploreSpaces.value[props.space.id] : null
);

const stats = computed(() => {
  if (!exploreSpace.value) return null;
  return [
    {
      name: "Total Proposals",
      stat: formatNumber(exploreSpace.value.proposals || 0),
      icon: DocIcon,
      change: formatNumber(exploreSpace.value.proposals_7d || 0),
    },
    {
      name: "Total Votes",
      stat: formatNumber(exploreSpace.value.votes || 0),
      icon: PenIcon,
      change: formatNumber(exploreSpace.value.votes_7d || 0),
    },
  ];
});

onMounted(async () => {
  const { spaces } = await fetch(
    `${runtimeConfig.public.hubUrl}/api/explore`
  ).then((res) => res.json());
  exploreSpaces.value = spaces;
});
</script>

<template>
  <div class="mb-4">
    <dl class="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-4">
      <div
        v-for="item in stats"
        :key="item.name"
        class="relative overflow-hidden rounded-default border border-gray-light bg-white px-4 pt-6 pb-6 sm:px-6 sm:pt-6"
      >
        <dt>
          <div class="absolute rounded-default bg-secondary p-3">
            <component
              :is="item.icon"
              class="h-6 w-6 text-white"
              Total
              aria-hidden="true"
            />
          </div>
          <p class="ml-16 truncate text-sm font-medium text-gray-dark">
            {{ item.name }}
          </p>
        </dt>
        <dd class="ml-16 flex items-baseline">
          <p class="text-2xl font-semibold text-dark">{{ item.stat }}</p>
          <p
            :class="'ml-2 flex items-baseline text-sm font-semibold text-green-600'"
          >
            <template v-if="item.change">
              <i-heroicons-arrow-up-20-solid
                class="h-5 w-5 flex-shrink-0 self-center text-green-500"
                aria-hidden="true"
              />
              {{ item.change }}
            </template>
          </p>
        </dd>
      </div>
    </dl>
  </div>
</template>
