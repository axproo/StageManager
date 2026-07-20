<script setup lang="ts">
const model = defineModel<string>();

defineProps<{
  type?: string;
  placeholder?: string;
}>();
</script>

<template>
  <input
    v-model="model"
    :type="type || 'text'"
    :placeholder="placeholder"
    class="w-full h-12 px-4 rounded-2xl border border-slate-300 bg-white outline-none transition-all duration-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-100"
  />
</template>