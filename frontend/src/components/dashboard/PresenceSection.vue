<script setup lang="ts">
import PresenceChart from '@/components/dashboard/PresenceChart.vue'
</script>

<template>
  <div class="mt-8 bg-white rounded-2xl shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-5">Statistiques des présences</h2>

    <div class="h-72">
      <PresenceChart />
    </div>
  </div>
</template>
