<script setup lang="ts">
withDefaults(defineProps<{ open?: boolean; title?: string; size?: 'sm' | 'md' | 'lg' }>(), { open: false, size: 'md' })
defineEmits<{ close: [] }>()
const widths: Record<string, string> = { sm: 'max-w-sm', md: 'max-w-lg', lg: 'max-w-2xl' }
</script>
<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-slate-900/50" @click="$emit('close')" />
        <div class="surface relative w-full rounded-xl p-6 shadow-xl sm:p-7" :class="widths[size]" role="dialog" aria-modal="true">
          <div class="mb-5 flex items-start justify-between">
            <h3 v-if="title" class="text-lg font-semibold text-slate-900 dark:text-white">{{ title }}</h3>
            <button class="ml-auto rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800" @click="$emit('close')">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <slot />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
