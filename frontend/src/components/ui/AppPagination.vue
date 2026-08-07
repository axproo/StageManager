<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    default: 1,
  },

  totalPages: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:currentPage'])

const changePage = (page) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page)
  }
}
</script>

<template>
  <div class="flex items-center justify-center gap-2 mt-6">
    <!-- Previous -->

    <button
      @click="changePage(currentPage - 1)"
      :disabled="currentPage === 1"
      class="px-4 py-2 rounded-xl border text-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      Précédent
    </button>

    <!-- Pages -->

    <button
      v-for="page in totalPages"
      :key="page"
      @click="changePage(page)"
      class="w-10 h-10 rounded-xl text-sm transition"
      :class="page === currentPage ? 'bg-blue-600 text-white' : 'border hover:bg-gray-100'"
    >
      {{ page }}
    </button>

    <!-- Next -->

    <button
      @click="changePage(currentPage + 1)"
      :disabled="currentPage === totalPages"
      class="px-4 py-2 rounded-xl border text-sm transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
    >
      Suivant
    </button>
  </div>
</template>
