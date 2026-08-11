<script setup lang="ts">
import { icons } from "@/constants/icons";

defineProps<{
  label: string;
  value: number | string;
  icon: string;
  color?: "blue" | "green" | "red" | "amber";
}>();
</script>

<template>
  <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
    <div class="flex items-center justify-between mb-4">
      <div
        :class="[
          'w-11 h-11 rounded-xl flex items-center justify-center ring-1',
          `bg-${color ?? 'blue'}-50`,
          `ring-${color ?? 'blue'}-100`,
        ]"
      >
        <svg
          :class="['w-5 h-5', `text-${color ?? 'blue'}-600`]"
          viewBox="0 0 24 24" fill="none" stroke="currentColor"
          stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
          v-html="icons[icon]"
        ></svg>
      </div>
    </div>
    <p :class="['text-3xl font-extrabold tabular-nums', `text-${color ?? 'blue'}-600`]">
      {{ value }}
    </p>
    <p class="text-sm text-gray-500 mt-1">{{ label }}</p>
  </div>
</template>