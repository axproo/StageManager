<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store'

import DashboardHeader from '@/components/dashboard/DashboardHeader.vue'
import DashboardStats from '@/components/dashboard/DashboardStats.vue'
import RecentStagiaireRequests from '@/components/dashboard/RecentStagiaireRequests.vue'
import RecentStagiairesTable from '@/components/dashboard/RecentStagiairesTable.vue'
import RecentActivities from '@/components/dashboard/RecentActivities.vue'
import PresenceSection from '@/components/dashboard/PresenceSection.vue'

const authStore = useAuthStore()
</script>

<template>
  <div class="bg-gray-100 min-h-full px-10 py-6">
    <!-- Demandes stagiaires uniquement ADMIN -->

    <RecentStagiaireRequests v-if="authStore.role === 'ADMIN'" class="mb-8" />

    <DashboardHeader />

    <DashboardStats />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
      <RecentStagiairesTable class="lg:col-span-2" />

      <RecentActivities />
    </div>

    <PresenceSection />
  </div>
</template>
