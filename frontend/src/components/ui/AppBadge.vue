<script setup>
defineProps({
  text: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'default',
  },
})
</script>

<template>
  <span
    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
    :class="{
      'bg-gray-100 text-gray-700': type === 'default',

      'bg-green-100 text-green-700': type === 'success',

      'bg-red-100 text-red-700': type === 'danger',

      'bg-yellow-100 text-yellow-700': type === 'warning',

      'bg-blue-100 text-blue-700': type === 'info',
    }"
  >
    {{ text }}
  </span>
</template>
