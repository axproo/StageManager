<script setup>
defineProps({
  text: {
    type: String,
    default: 'Chargement...',
  },

  size: {
    type: String,
    default: 'md',
  },
})
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-3">
    <!-- Spinner -->

    <div
      class="animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"
      :class="{
        'w-6 h-6': size === 'sm',

        'w-10 h-10': size === 'md',

        'w-14 h-14': size === 'lg',
      }"
    ></div>

    <!-- Text -->

    <p class="text-sm text-gray-500">
      {{ text }}
    </p>
  </div>
</template>
