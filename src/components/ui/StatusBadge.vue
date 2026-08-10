<script setup lang="ts">
withDefaults(defineProps<{ tone?: 'green' | 'red' | 'orange' | 'blue' | 'grey' }>(), { tone: 'grey' })
const tones: Record<string, string> = {
  green: 'bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-400 dark:border-green-900',
  red: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-900',
  orange: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900',
  blue: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900',
  grey: 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
}
</script>
<template>
  <span class="inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium" :class="tones[tone]">
    <slot />
  </span>
</template>
