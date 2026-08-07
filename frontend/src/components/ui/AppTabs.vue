<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    default: () => [],
  },

  modelValue: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue', 'change'])

const selectTab = (tab) => {
  emit('update:modelValue', tab.value)

  emit('change', tab)
}
</script>

<template>
  <div class="w-full">
    <!-- Tabs Header -->

    <div class="flex gap-2 border-b border-gray-200">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        @click="selectTab(tab)"
        class="px-5 py-3 text-sm font-medium transition"
        :class="
          modelValue === tab.value
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-500 hover:text-gray-700'
        "
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Content -->

    <div class="mt-6">
      <slot />
    </div>
  </div>
</template>
