<script setup>
import { ref } from 'vue'

import PublicNavbar from '@/components/layout/PublicNavbar.vue'
import DashboardNavbar from '@/components/layout/DashboardNavbar.vue'

const isLogged = ref(localStorage.getItem('token') !== null)
</script>

<template>
  <DashboardNavbar v-if="isLogged" />

  <PublicNavbar v-else />

  <main>
    <RouterView />
  </main>
</template>
