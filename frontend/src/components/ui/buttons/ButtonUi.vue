<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "danger"].includes(value),
  },
  size: {
    type: String,
    default: "md",
  },
});

const buttonClass = computed(() => {
  return props.variant === "danger"
    ? "bg-red-500 hover:bg-red-400"
    : "bg-indigo-500 hover:bg-indigo-400";
});
const sizeClass = computed(() => {
  return props.size === "sm"
    ? "px-4 py-2 text-sm"
    : "w-full px-6 py-3 text-base";
});
</script>

<template>
  <button
    type="submit"
    :class="[
      'rounded-md font-semibold text-white transition-colors',
      buttonClass,
      sizeClass,
    ]"
  >
    {{ title }}
  </button>
</template>
