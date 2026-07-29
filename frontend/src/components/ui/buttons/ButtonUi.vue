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
});

const buttonClass = computed(() => {
  return props.variant === "danger"
    ? "bg-red-500 hover:bg-red-400"
    : "bg-indigo-500 hover:bg-indigo-400";
});
</script>

<template>
  <button
    type="submit"
    :class="[
      'w-full rounded-md py-2 font-semibold text-white transition-colors',
      buttonClass,
    ]"
  >
    {{ title }}
  </button>
</template>
