<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import StagiaireForm from '@/components/forms/StagiaireForm.vue'
import { useStagiairesStore } from '@/stores/stagiaires'
import { useUsersStore } from '@/stores/users'
import { useCatalogStore } from '@/stores/catalog'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'
import { useI18n } from '@/composables/useI18n'
import type { Stagiaire } from '@/types'

const stagiaires = useStagiairesStore()
const users = useUsersStore()
const catalog = useCatalogStore()
const auth = useAuthStore()
const perms = usePermissions()
const router = useRouter()
const { t } = useI18n()

onMounted(() => Promise.all([stagiaires.loadAll(), users.loadAll(), catalog.loadAll()]))

const departmentFilter = ref('')
const statutFilter = ref('')

const visibleStagiaires = computed(() => stagiaires.items.filter((s) => perms.canAccessStagiaire(s)))
const filtered = computed(() =>
  visibleStagiaires.value.filter((s) => {
    if (departmentFilter.value && s.departmentId !== departmentFilter.value) return false
    if (statutFilter.value && s.statut !== statutFilter.value) return false
    return true
  }),
)

const statutTone: Record<string, 'green' | 'orange' | 'blue' | 'grey'> = { en_cours: 'blue', a_venir: 'grey', termine: 'green' }
const modaliteLabel: Record<string, string> = { presentiel: 'Présentiel', distanciel: 'Distanciel', hybride: 'Hybride' }

const columns = [
  { key: 'stagiaire', label: 'Stagiaire' },
  { key: 'department', label: 'Département' },
  { key: 'tuteur', label: 'Tuteur' },
  { key: 'modalite', label: 'Modalité' },
  { key: 'statut', label: 'Statut' },
  { key: 'actions', label: 'Actions', align: 'right' as const },
]

const modalOpen = ref(false)
const editing = ref<Stagiaire | null>(null)
const saving = ref(false)
const confirmDelete = ref<Stagiaire | null>(null)

function openCreate() {
  editing.value = null
  modalOpen.value = true
}
function openEdit(s: Stagiaire) {
  editing.value = s
  modalOpen.value = true
}

async function handleSubmit(data: Omit<Stagiaire, 'id'>) {
  if (!auth.user) return
  saving.value = true
  if (editing.value) await stagiaires.update(editing.value.id, data, auth.user.id)
  else await stagiaires.create(data, auth.user.id)
  saving.value = false
  modalOpen.value = false
}

async function handleDelete() {
  if (!confirmDelete.value || !auth.user) return
  await stagiaires.remove(confirmDelete.value.id, auth.user.id)
  confirmDelete.value = null
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ t('nav.stagiaires') }}</h1>
      <BaseButton v-if="perms.can('stagiaires:create')" @click="openCreate">+ Nouveau stagiaire</BaseButton>
    </div>

    <BaseCard class="mb-5">
      <div class="flex flex-col gap-4 sm:flex-row">
        <label class="flex-1">
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Département</span>
          <select v-model="departmentFilter" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
            <option value="">Tous</option>
            <option v-for="d in catalog.departments" :key="d.id" :value="d.id">{{ d.nom }}</option>
          </select>
        </label>
        <label class="flex-1">
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Statut</span>
          <select v-model="statutFilter" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
            <option value="">Tous</option>
            <option value="a_venir">À venir</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
          </select>
        </label>
      </div>
    </BaseCard>

    <BaseCard :padded="false">
      <div class="p-5">
        <BaseTable :columns="columns">
          <tr v-for="s in filtered" :key="s.id" class="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/40" @click="router.push(`/stagiaires/${s.id}`)">
            <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">{{ users.byId(s.userId)?.prenom }} {{ users.byId(s.userId)?.nom }}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ catalog.departmentById(s.departmentId)?.nom }}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ s.tuteurId ? `${users.byId(s.tuteurId)?.prenom} ${users.byId(s.tuteurId)?.nom}` : '—' }}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ modaliteLabel[s.modalite] }}</td>
            <td class="px-4 py-3"><StatusBadge :tone="statutTone[s.statut]">{{ t(`status.${s.statut}` as any) }}</StatusBadge></td>
            <td class="px-4 py-3" @click.stop>
              <div class="flex justify-end gap-2">
                <BaseButton v-if="perms.can('stagiaires:update')" size="sm" variant="outlined" @click="openEdit(s)">Modifier</BaseButton>
                <BaseButton v-if="perms.can('stagiaires:delete')" size="sm" variant="danger" @click="confirmDelete = s">Supprimer</BaseButton>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0"><td colspan="6" class="px-4 py-8 text-center text-sm text-slate-400">Aucun stagiaire</td></tr>
        </BaseTable>
      </div>
    </BaseCard>

    <BaseModal :open="modalOpen" :title="editing ? 'Modifier le stagiaire' : 'Nouveau stagiaire'" size="lg" @close="modalOpen = false">
      <StagiaireForm :initial="editing" :saving="saving" @submit="handleSubmit" @cancel="modalOpen = false" />
    </BaseModal>

    <BaseModal :open="!!confirmDelete" title="Confirmer la suppression" size="sm" @close="confirmDelete = null">
      <p class="mb-5 text-sm text-slate-600 dark:text-slate-300">Supprimer ce dossier stagiaire ? Cette action est irréversible.</p>
      <div class="flex justify-end gap-3">
        <BaseButton variant="secondary" @click="confirmDelete = null">Annuler</BaseButton>
        <BaseButton variant="danger" @click="handleDelete">Supprimer</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
