<script setup lang="ts">
export interface SparkPoint {
  label: string
  value: number
  tone?: 'blue' | 'green' | 'orange' | 'red' | 'grey'
}
defineProps<{ points: SparkPoint[]; max?: number }>()

const toneClasses: Record<string, string> = {
  blue: 'bg-brand-500', green: 'bg-green-500', orange: 'bg-amber-500', red: 'bg-red-500', grey: 'bg-slate-300',
}
</script>
<template>
  <div class="flex h-24 items-end gap-2">
    <div v-for="p in points" :key="p.label" class="flex flex-1 flex-col items-center gap-1.5">
      <div class="flex h-16 w-full items-end overflow-hidden rounded-sm bg-slate-100 dark:bg-slate-800">
        <div
          class="w-full rounded-sm transition-all"
          :class="toneClasses[p.tone ?? 'blue']"
          :style="{ height: `${max ? Math.min(100, (p.value / max) * 100) : 0}%` }"
        />
      </div>
      <span class="text-[10px] text-slate-500">{{ p.label }}</span>
    </div>
  </div>
</template>
