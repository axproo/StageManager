<script setup>
const model = defineModel()

defineProps({
  label: {
    type: String,
    default: '',
  },

  value: {
    type: [String, Number, Boolean],
    default: true,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <label class="flex items-center gap-3 cursor-pointer select-none">
    <input
      v-model="model"
      type="checkbox"
      :value="value"
      :disabled="disabled"
      class="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
    />

    <span class="text-sm text-gray-700">
      {{ label }}
    </span>
  </label>
</template>
