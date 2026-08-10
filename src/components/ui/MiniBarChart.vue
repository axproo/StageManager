<script setup lang="ts">
export interface BarDatum {
  label: string
  value: number
  tone?: 'blue' | 'green' | 'orange' | 'red' | 'grey'
}
defineProps<{ data: BarDatum[]; max?: number }>()

const toneClasses: Record<string, string> = {
  blue: 'bg-brand-500',
  green: 'bg-green-500',
  orange: 'bg-amber-500',
  red: 'bg-red-500',
  grey: 'bg-slate-400',
}
</script>
<template>
  <div class="space-y-2.5">
    <div v-for="d in data" :key="d.label">
      <div class="mb-1 flex items-center justify-between text-xs">
        <span class="text-slate-600 dark:text-slate-300">{{ d.label }}</span>
        <span class="font-medium text-slate-800 dark:text-slate-100">{{ d.value }}</span>
      </div>
      <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
        <div
          class="h-full rounded-full transition-all"
          :class="toneClasses[d.tone ?? 'blue']"
          :style="{ width: `${max ? Math.min(100, (d.value / max) * 100) : 0}%` }"
        />
      </div>
    </div>
  </div>
</template>
