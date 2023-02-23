<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const tabs = ref([
  { name: "Results", href: "#results", current: false },
  { name: "Details", href: "#details", current: false },
  { name: "Discussion", href: "#discussion", current: false },
]);

watch(
  () => route.hash,
  () => {
    nextTick(() => {
      if (route.hash == "#details") {
        tabs.value = [
          { name: "Results", href: "#results", current: false },
          { name: "Details", href: "#details", current: true },
          { name: "Discussion", href: "#discussion", current: false },
        ];
      } else if (route.hash == "#discussion") {
        tabs.value = [
          { name: "Results", href: "#results", current: false },
          { name: "Details", href: "#details", current: false },
          { name: "Discussion", href: "#discussion", current: true },
        ];
      } else {
        tabs.value = [
          { name: "Results", href: "#results", current: true },
          { name: "Details", href: "#details", current: false },
          { name: "Discussion", href: "#discussion", current: false },
        ];
      }
    });
  },
  { immediate: true }
);
</script>

<template>
  <div class="py-5">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-default border-gray-medium focus:border-primary focus:ring-primary"
        @change="
          router.push({
            hash: tabs.find(
              (t) => t.name === ($event.target as HTMLSelectElement)?.value
            )?.href,
          })
        "
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="flex space-x-4" aria-label="Tabs">
        <a
          v-for="tab in tabs"
          :key="tab.name"
          :href="tab.href"
          :class="[
            tab.current ? 'bg-primary/10' : 'text-gray-dark ',
            'rounded-default px-5 py-2 text-sm font-medium',
          ]"
          >{{ tab.name }}</a
        >
      </nav>
    </div>
  </div>
</template>
