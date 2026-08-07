<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AppTable, AppBadge } from '@/components/ui'
import { dashboardService } from '@/services/dashboard.service'
import type { DashboardStagiaire } from '@/types/dashboard'

const stagiaires = ref<DashboardStagiaire[]>([])

onMounted(() => {
  stagiaires.value = dashboardService.getRecentStagiaires()
})

const columns = [
  {
    label: 'Nom',
    key: 'nom',
  },

  {
    label: 'Département',
    key: 'departement',
  },

  {
    label: 'Date',
    key: 'date',
  },

  {
    label: 'Statut',
    key: 'statut',
  },
]
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-5">Derniers stagiaires</h2>

    <AppTable :columns="columns" :rows="stagiaires">
      <template #statut="{ row }">
        <AppBadge type="success" :text="row.statut" />
      </template>
    </AppTable>
  </div>
</template>
