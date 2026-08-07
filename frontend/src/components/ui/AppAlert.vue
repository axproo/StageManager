<script setup>
defineProps({
  type: {
    type: String,
    default: 'info',
  },

  title: {
    type: String,
    default: '',
  },

  message: {
    type: String,
    default: '',
  },

  closable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close'])
</script>

<template>
  <div
    class="w-full flex items-start gap-4 p-4 rounded-xl border"
    :class="{
      'bg-green-50 border-green-200 text-green-700': type === 'success',

      'bg-red-50 border-red-200 text-red-700': type === 'error',

      'bg-yellow-50 border-yellow-200 text-yellow-700': type === 'warning',

      'bg-blue-50 border-blue-200 text-blue-700': type === 'info',
    }"
  >
    <!-- Icon -->

    <div class="text-xl">
      <span v-if="type === 'success'"> ✓ </span>

      <span v-else-if="type === 'error'"> ✕ </span>

      <span v-else-if="type === 'warning'"> ⚠ </span>

      <span v-else> ℹ </span>
    </div>

    <!-- Content -->

    <div class="flex-1">
      <h3 v-if="title" class="font-semibold">
        {{ title }}
      </h3>

      <p v-if="message" class="text-sm mt-1">
        {{ message }}
      </p>
    </div>

    <!-- Close -->

    <button v-if="closable" @click="emit('close')" class="text-lg opacity-70 hover:opacity-100">
      ×
    </button>
  </div>
</template>
