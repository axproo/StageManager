<script setup>
const model = defineModel()

defineProps({
  label: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <label class="flex items-center gap-3 cursor-pointer select-none">
    <!-- Switch -->

    <div class="relative inline-flex items-center">
      <input v-model="model" type="checkbox" :disabled="disabled" class="sr-only" />

      <div
        class="w-12 h-6 rounded-full transition"
        :class="model ? 'bg-blue-600' : 'bg-gray-300'"
      ></div>

      <div
        class="absolute w-5 h-5 bg-white rounded-full shadow transition left-0.5"
        :class="model ? 'translate-x-6' : 'translate-x-0'"
      ></div>
    </div>

    <!-- Label -->

    <span class="text-sm text-gray-700">
      {{ label }}
    </span>
  </label>
</template>
