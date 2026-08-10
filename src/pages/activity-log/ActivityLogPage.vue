<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { useActivityLogStore } from '@/stores/activityLog'
import { useUsersStore } from '@/stores/users'
import { useI18n } from '@/composables/useI18n'
import type { ActivityAction } from '@/types'

const log = useActivityLogStore()
const users = useUsersStore()
const { t } = useI18n()

onMounted(() => Promise.all([log.loadAll(), users.loadAll()]))

const actionFilter = ref('')
const filtered = computed(() => log.items.filter((e) => !actionFilter.value || e.action === actionFilter.value))

const actionTone: Record<ActivityAction, 'green' | 'blue' | 'red' | 'grey'> = {
  CREATE: 'green', UPDATE: 'blue', DELETE: 'red', LOGIN: 'grey', LOGOUT: 'grey',
}

const columns = [
  { key: 'user', label: 'Utilisateur' },
  { key: 'action', label: 'Action' },
  { key: 'target', label: 'Cible' },
  { key: 'date', label: 'Date' },
]
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">{{ t('nav.activityLog') }}</h1>

    <BaseCard class="mb-5">
      <label class="block max-w-xs">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Type d'action</span>
        <select v-model="actionFilter" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
          <option value="">Toutes</option>
          <option value="CREATE">Création</option>
          <option value="UPDATE">Modification</option>
          <option value="DELETE">Suppression</option>
          <option value="LOGIN">Connexion</option>
          <option value="LOGOUT">Déconnexion</option>
        </select>
      </label>
    </BaseCard>

    <BaseCard :padded="false">
      <div class="p-5">
        <BaseTable :columns="columns">
          <tr v-for="e in filtered" :key="e.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">{{ users.byId(e.userId)?.prenom }} {{ users.byId(e.userId)?.nom }}</td>
            <td class="px-4 py-3"><StatusBadge :tone="actionTone[e.action]">{{ e.action }}</StatusBadge></td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ e.cibleType }}{{ e.cibleId ? ` #${e.cibleId}` : '' }}</td>
            <td class="px-4 py-3 text-slate-500">{{ new Date(e.date).toLocaleString('fr-FR') }}</td>
          </tr>
          <tr v-if="filtered.length === 0"><td colspan="4" class="px-4 py-8 text-center text-sm text-slate-400">Aucune entrée</td></tr>
        </BaseTable>
      </div>
    </BaseCard>
  </div>
</template>
