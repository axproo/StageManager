<script setup>
defineProps({
  title: {
    type: String,
    default: 'Aucune donnée disponible',
  },
  message: {
    type: String,
    default: 'Aucun élément à afficher pour le moment.',
  },
  icon: {
    type: String,
    default: '📭',
  },
  buttonText: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['action'])
</script>

<template>
  <div
    class="flex flex-col items-center justify-center text-center p-10 bg-white rounded-2xl border border-gray-100"
  >
    <!-- Icon -->

    <div class="text-5xl mb-4">
      {{ icon }}
    </div>

    <!-- Title -->

    <h3 class="text-lg font-semibold text-gray-800">
      {{ title }}
    </h3>

    <!-- Message -->

    <p class="mt-2 text-sm text-gray-500 max-w-md">
      {{ message }}
    </p>

    <!-- Action Button -->

    <button
      v-if="buttonText"
      @click="emit('action')"
      class="mt-6 px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      {{ buttonText }}
    </button>
  </div>
</template>
