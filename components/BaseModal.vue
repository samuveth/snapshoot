<script setup lang="ts">
/**
 * Read before changing anything: https://headlessui.dev/vue/dialog
 */

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";

defineEmits(["close"]);

defineProps<{ isOpen: boolean; title: string }>();
</script>

<template>
  <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" @close="$emit('close')">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-dark/40" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-default bg-gray-light p-6 text-left align-middle text-base-content shadow-xl transition-all"
            >
              <div class="absolute top-2 right-2">
                <BaseButtonCircle @click="$emit('close')">
                  <span class="sr-only">Close</span>
                  <i-heroicons-x-mark class="text-md" aria-hidden="true" />
                </BaseButtonCircle>
              </div>
              <DialogTitle as="h3" class="text-lg font-medium leading-6">
                {{ title }}
              </DialogTitle>
              <div class="mt-6"><slot name="body" /></div>

              <div v-if="$slots.footer" class="mt-4">
                <slot name="footer" />
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
>
