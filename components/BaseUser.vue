<script setup lang="ts">
import { toRefs } from "vue";
import { Profile } from "@/helpers/interfaces";

const props = defineProps<{
  address: string;
  profile?: Profile;
  hideAvatar?: boolean;
  hideUsername?: boolean;
  widthClass?: string;
}>();

const { profile, address } = toRefs(props);
const { username } = useUsername(address, profile);
</script>

<template>
  <div :class="[widthClass, 'flex flex-nowrap items-center space-x-1']">
    <AvatarUser v-if="!hideAvatar" :address="address" size="18" />
    <span v-if="!hideUsername" class="text-skin-link w-full truncate">
      {{ username }}
    </span>
  </div>
</template>
