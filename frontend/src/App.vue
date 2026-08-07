<script setup>
import { useAuthStore } from '@/stores/auth.store'
import PublicNavbar from '@/layouts/PublicNavbar.vue'
import DashboardSidebar from '@/layouts/DashboardSidebar.vue'
import AppLayout from '@/components/ui/AppLayout.vue'

const authStore = useAuthStore()
</script>

<template>
  <!-- Partie publique -->
  <template v-if="!authStore.token">
    <PublicNavbar />

    <RouterView />
  </template>

  <!-- Partie connectée -->
  <AppLayout v-else>
    <template #sidebar>
      <DashboardSidebar />
    </template>

    <RouterView />
  </AppLayout>
</template>
