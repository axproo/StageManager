<script setup lang="ts">

defineProps<{
  title: string;
  value: string | number;
  color?: string;
}>();

</script>


<template>

  <div
    class="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition"
  >

    <p class="text-slate-500">
      {{ title }}
    </p>


    <h2
      class="text-4xl font-bold mt-3"
      :class="color || 'text-indigo-600'"
    >
      {{ value }}
    </h2>


  </div>

</template>