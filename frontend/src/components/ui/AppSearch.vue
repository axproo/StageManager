<script setup>
const model = defineModel()

defineProps({
  placeholder: {
    type: String,
    default: 'Rechercher...',
  },

  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', model.value)
}
</script>

<template>
  <div class="relative w-full">
    <!-- Icon -->

    <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"> 🔍 </span>

    <!-- Input -->

    <input
      v-model="model"
      @keyup.enter="handleSearch"
      :placeholder="placeholder"
      :disabled="disabled"
      class="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl outline-none transition focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
    />
  </div>
</template>
