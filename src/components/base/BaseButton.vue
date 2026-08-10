<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger' | 'outlined'
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    loading?: boolean
    fullWidth?: boolean
    size?: 'sm' | 'md'
  }>(),
  { variant: 'primary', type: 'button', disabled: false, loading: false, fullWidth: false, size: 'md' },
)
defineEmits<{ click: [MouseEvent] }>()

const base =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap'
const sizes: Record<string, string> = { sm: 'px-3 py-1.5 text-xs', md: 'px-4 py-2.5 text-sm' }
const variants: Record<string, string> = {
  primary: 'bg-brand-600 text-white hover:bg-brand-700',
  secondary: 'bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700',
  danger: 'bg-red-600 text-white hover:bg-red-700',
  outlined: 'bg-transparent border border-brand-300 text-brand-700 hover:bg-brand-50 dark:text-brand-300 dark:border-brand-700 dark:hover:bg-brand-950',
}
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[base, sizes[size], variants[variant], fullWidth ? 'w-full' : '']"
    @click="(e) => $emit('click', e)"
  >
    <svg v-if="loading" class="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <slot />
  </button>
</template>
