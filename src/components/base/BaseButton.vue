<script setup lang="ts">
defineProps<{
  text: string;
  type?: "button" | "submit";
  full?: boolean;
}>();

const emit = defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button
    :type="type || 'button'"
    @click="emit('click')"
    :class="[
      'h-12 rounded-2xl bg-indigo-600 text-white font-semibold transition-all duration-300',
      'hover:bg-indigo-700 hover:-translate-y-0.5',
      'active:scale-95',
      full ? 'w-full' : 'px-6'
    ]"
  >
    {{ text }}
  </button>
</template>