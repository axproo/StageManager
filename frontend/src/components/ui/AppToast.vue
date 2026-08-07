<script setup lang="ts">
defineProps({
  show: {
    type: Boolean,
    default: false,
  },

  type: {
    type: String,
    default: 'success',
  },

  message: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-300"
    enter-from-class="opacity-0 translate-y-5"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="show"
      class="fixed top-6 right-6 z-[100] px-6 py-4 rounded-xl shadow-xl text-white flex items-center gap-3"
      :class="type === 'success' ? 'bg-green-600' : 'bg-red-600'"
    >
      <span class="text-xl">
        {{ type === 'success' ? '✅' : '❌' }}
      </span>

      <p>
        {{ message }}
      </p>
    </div>
  </Transition>
</template>
