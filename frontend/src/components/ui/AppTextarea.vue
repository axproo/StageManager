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

  rows: {
    type: Number,
    default: 4,
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  maxlength: {
    type: Number,
    default: null,
  },
})
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block mb-2 text-sm font-medium text-gray-700">
      {{ label }}
    </label>

    <!-- Textarea -->
    <textarea
      v-model="model"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :maxlength="maxlength"
      class="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none resize-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
    />

    <!-- Compteur de caractères -->
    <div v-if="maxlength" class="mt-1 text-xs text-gray-500 text-right">
      {{ model?.length || 0 }} / {{ maxlength }}
    </div>
  </div>
</template>
