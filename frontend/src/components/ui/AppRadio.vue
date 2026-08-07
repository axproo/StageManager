<script setup>
const model = defineModel()

defineProps({
  label: {
    type: String,
    default: '',
  },

  value: {
    type: [String, Number, Boolean],
    required: true,
  },

  name: {
    type: String,
    default: 'radio-group',
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
      type="radio"
      :name="name"
      :value="value"
      :disabled="disabled"
      class="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500 disabled:cursor-not-allowed"
    />

    <span class="text-sm text-gray-700">
      {{ label }}
    </span>
  </label>
</template>
