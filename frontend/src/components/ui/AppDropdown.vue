<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps({
  label: {
    type: String,
    default: 'Options',
  },
  items: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['select'])
const open = ref(false)
const toggle = () => {
  open.value = !open.value
}
const selectItem = (item) => {
  emit('select', item)

  open.value = false
}
// Fermer le menu en cliquant dehors
const closeOutside = () => {
  open.value = false
}
onMounted(() => {
  document.addEventListener('click', closeOutside)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', closeOutside)
})
</script>

<template>
  <div class="relative inline-block" @click.stop>
    <!-- Button -->

    <button
      @click="toggle"
      class="px-4 py-2 rounded-xl border bg-white text-gray-700 hover:bg-gray-100 transition"
    >
      {{ label }}
      
      <span class="ml-2"> ▾ </span>
    </button>

    <!-- Menu -->

    <div
      v-if="open"
      class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border overflow-hidden z-50"
    >
      <button
        v-for="item in items"
        :key="item.value"
        @click="selectItem(item)"
        class="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
      >
        {{ item.label }}
      </button>
    </div>
  </div>
</template>
