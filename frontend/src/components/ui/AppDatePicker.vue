<script setup>
const model = defineModel()

defineProps({
  label: {
    type: String,
    default: '',
  },

  placeholder: {
    type: String,
    default: '',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  min: {
    type: String,
    default: '',
  },

  max: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="w-full">
    <!-- Label -->

    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Date Input -->

    <div class="relative">
      <input
        v-model="model"
        type="date"
        :placeholder="placeholder"
        :disabled="disabled"
        :min="min"
        :max="max"
        class="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
      />
    </div>
  </div>
</template>
