<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
  },
  size: {
    type: String,
    default: 'md',
  },
  type: {
    type: String,
    default: 'button',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const variantClasses = computed(
  () =>
    ({
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      success: 'bg-green-600 hover:bg-green-700 text-white',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
    })[props.variant]
)
const sizeClasses = computed(
  () =>
    ({
      sm: 'px-3 py-2 text-sm',
      md: 'px-5 py-2.5 text-base',
      lg: 'px-6 py-3 text-lg',
    })[props.size]
)
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="rounded-xl font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    :class="[variantClasses, sizeClasses]"
  >
    <slot />
  </button>
</template>
