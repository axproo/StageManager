<script setup lang="ts">
withDefaults(defineProps<{ initials: string; avatarUrl?: string; size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
const sizes: Record<string, string> = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-14 w-14 text-base' }
</script>
<template>
  <img
    v-if="avatarUrl"
    :src="avatarUrl"
    alt=""
    class="shrink-0 rounded-full object-cover"
    :class="sizes[size]"
  />
  <span v-else class="flex shrink-0 items-center justify-center rounded-full bg-brand-600 font-semibold text-white" :class="sizes[size]">
    {{ initials }}
  </span>
</template>
