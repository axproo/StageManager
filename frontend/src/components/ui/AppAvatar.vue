<script setup>
defineProps({
  src: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: 'Utilisateur',
  },
  size: {
    type: String,
    default: 'md',
  },
})
const getInitials = (name) => {
  if (!name) return 'U'
const words = name.trim().split(' ')
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }
  return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
}
</script>

<template>
  <div
    class="flex items-center justify-center rounded-full overflow-hidden bg-blue-100 text-blue-700 font-semibold"
    :class="{
      'w-8 h-8 text-xs': size === 'sm',

      'w-12 h-12 text-sm': size === 'md',

      'w-16 h-16 text-lg': size === 'lg',
    }"
  >
    <!-- Image -->
    <img v-if="src" :src="src" :alt="name" class="w-full h-full object-cover" />
    <!-- Initiales -->
    <span v-else>
      {{ getInitials(name) }}
    </span>
  </div>
</template>
