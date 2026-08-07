```vue
<script setup lang="ts">
withDefaults(
  defineProps<{
    text: string
    position?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  {
    position: 'top',
  }
)
</script>

<template>
  <div class="relative inline-block group">
    <!-- Élément principal -->
    <slot />

    <!-- Tooltip -->
    <div
      class="absolute z-50 hidden group-hover:block whitespace-nowrap px-3 py-2 text-xs text-white bg-gray-800 rounded-lg shadow-lg"
      :class="{
        'bottom-full left-1/2 -translate-x-1/2 mb-2': position === 'top',
        'top-full left-1/2 -translate-x-1/2 mt-2': position === 'bottom',
        'right-full top-1/2 -translate-y-1/2 mr-2': position === 'left',
        'left-full top-1/2 -translate-y-1/2 ml-2': position === 'right',
      }"
    >
      {{ text }}
    </div>
  </div>
</template>
```
