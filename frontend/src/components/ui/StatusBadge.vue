<script setup lang="ts">
import { computed } from "vue";
import { icons } from "@/constants/icons";
import { STATUS_CONFIG } from "@/constants/status-colors";

const props = defineProps<{
  status: string;
}>();

const config = computed(
  () => STATUS_CONFIG[props.status] ?? STATUS_CONFIG.PENDING
);
</script>

<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold',
      config.bg,
      config.text,
    ]"
  >
    <svg
      class="w-3.5 h-3.5"
      viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
      v-html="icons[config.icon]"
    ></svg>
    {{ config.label }}
  </span>
</template>