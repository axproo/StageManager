<template>
    <button :class="newClass" :icon="icon">
        {{ title }}
    </button>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const classes = ref<any>({
    blue: "px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200",
    red: "px-4 py-2 bg-red-600 text-white font-medium rounded-lg shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition duration-200"
})

const props = defineProps<{
    title?: string,
    icon?: string,
    class?: string
}>()

const newClass = computed(() => {
    return classes.value[props.class || 'blue']
})


</script>