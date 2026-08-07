<script setup>
defineProps({
  title: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
    <div v-if="title" class="mb-4">
      <h3 class="text-lg font-bold text-gray-800">
        {{ title }}
      </h3>
    </div>

    <slot />
  </div>
</template>
