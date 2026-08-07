<script setup lang="ts">
import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'],

  datasets: [
    {
      label: 'Présences',
      data: [80, 95, 70, 100, 90],
    },
  ],
}

const chartOptions = {
  responsive: true,

  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: true,
    },

    title: {
      display: false,
    },
  },
}
</script>

<template>
  <div class="h-64 w-full">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
