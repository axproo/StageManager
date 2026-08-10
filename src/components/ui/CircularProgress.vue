<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{ percentage: number; size?: number; strokeWidth?: number; color?: string }>(),
  { size: 140, strokeWidth: 12, color: 'var(--color-brand-600)' },
)

const radius = computed(() => (props.size - props.strokeWidth) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circumference.value * (1 - Math.min(100, Math.max(0, props.percentage)) / 100))
</script>

<template>
  <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90">
    <circle
      :cx="size / 2" :cy="size / 2" :r="radius"
      fill="none" stroke="currentColor" class="text-slate-100 dark:text-slate-800"
      :stroke-width="strokeWidth"
    />
    <circle
      :cx="size / 2" :cy="size / 2" :r="radius"
      fill="none" :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      :stroke-dasharray="circumference"
      :stroke-dashoffset="offset"
      style="transition: stroke-dashoffset 0.5s ease"
    />
  </svg>
</template>
