<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { useTachesStore } from '@/stores/taches'
import { useStagiairesStore } from '@/stores/stagiaires'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'
import { useI18n } from '@/composables/useI18n'
import type { Tache, TachePriorite, TacheStatut } from '@/types'

const taches = useTachesStore()
const stagiaires = useStagiairesStore()
const users = useUsersStore()
const auth = useAuthStore()
const perms = usePermissions()
const { t } = useI18n()

onMounted(() => Promise.all([taches.loadAll(), stagiaires.loadAll(), users.loadAll()]))

const statutFilter = ref('')
const visibleTasks = computed(() => taches.items.filter((tk) => perms.canAccessTache(tk)))
const filtered = computed(() => visibleTasks.value.filter((tk) => !statutFilter.value || tk.statut === statutFilter.value))

const statutTone: Record<TacheStatut, 'grey' | 'blue' | 'green'> = { a_faire: 'grey', en_cours: 'blue', termine: 'green' }
const prioriteTone: Record<TachePriorite, 'grey' | 'orange' | 'red'> = { basse: 'grey', moyenne: 'orange', haute: 'red' }

const columns = [
  { key: 'titre', label: 'Tâche' },
  { key: 'assignee', label: 'Assignée à' },
  { key: 'priorite', label: 'Priorité' },
  { key: 'echeance', label: 'Échéance' },
  { key: 'statut', label: 'Statut' },
  { key: 'actions', label: 'Actions', align: 'right' as const },
]

const modalOpen = ref(false)
const editing = ref<Tache | null>(null)
const saving = ref(false)
const confirmDelete = ref<Tache | null>(null)

const assignableStagiaires = computed(() =>
  stagiaires.items.filter((s) => (perms.isTuteur.value ? s.tuteurId === auth.user?.id : true)),
)

const form = reactive({ titre: '', description: '', assigneA: '', priorite: 'moyenne' as TachePriorite, dateEcheance: '' })

function openCreate() {
  editing.value = null
  form.titre = ''
  form.description = ''
  form.assigneA = assignableStagiaires.value[0]?.userId ?? ''
  form.priorite = 'moyenne'
  form.dateEcheance = ''
  modalOpen.value = true
}

function openEdit(tk: Tache) {
  editing.value = tk
  form.titre = tk.titre
  form.description = tk.description
  form.assigneA = tk.assigneA
  form.priorite = tk.priorite
  form.dateEcheance = tk.dateEcheance
  modalOpen.value = true
}

async function handleSubmit() {
  if (!auth.user) return
  saving.value = true
  if (editing.value) {
    await taches.update(editing.value.id, { titre: form.titre, description: form.description, assigneA: form.assigneA, priorite: form.priorite, dateEcheance: form.dateEcheance }, auth.user.id)
  } else {
    await taches.create({ titre: form.titre, description: form.description, assigneA: form.assigneA, creePar: auth.user.id, statut: 'a_faire', priorite: form.priorite, dateEcheance: form.dateEcheance }, auth.user.id)
  }
  saving.value = false
  modalOpen.value = false
}

async function changeStatus(tk: Tache, statut: TacheStatut) {
  if (!auth.user) return
  await taches.update(tk.id, { statut }, auth.user.id)
}

async function handleDelete() {
  if (!confirmDelete.value || !auth.user) return
  await taches.remove(confirmDelete.value.id, auth.user.id)
  confirmDelete.value = null
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ t('nav.taches') }}</h1>
      <BaseButton v-if="perms.can('taches:create')" @click="openCreate">+ Nouvelle tâche</BaseButton>
    </div>

    <BaseCard class="mb-5">
      <label class="block max-w-xs">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Statut</span>
        <select v-model="statutFilter" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
          <option value="">Tous</option>
          <option value="a_faire">À faire</option>
          <option value="en_cours">En cours</option>
          <option value="termine">Terminé</option>
        </select>
      </label>
    </BaseCard>

    <BaseCard :padded="false">
      <div class="p-5">
        <BaseTable :columns="columns">
          <tr v-for="tk in filtered" :key="tk.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="px-4 py-3">
              <p class="font-medium text-slate-900 dark:text-white">{{ tk.titre }}</p>
              <p class="max-w-xs truncate text-xs text-slate-500">{{ tk.description }}</p>
            </td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ users.byId(tk.assigneA)?.prenom }} {{ users.byId(tk.assigneA)?.nom }}</td>
            <td class="px-4 py-3"><StatusBadge :tone="prioriteTone[tk.priorite]">{{ t(`priorite.${tk.priorite}` as any) }}</StatusBadge></td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ new Date(tk.dateEcheance).toLocaleDateString('fr-FR') }}</td>
            <td class="px-4 py-3">
              <select
                v-if="perms.isStagiaire.value ? tk.assigneA === auth.user?.id : perms.canEditTacheFully(tk)"
                :value="tk.statut"
                class="field-input rounded-lg px-2 py-1.5 text-xs"
                @change="changeStatus(tk, ($event.target as HTMLSelectElement).value as TacheStatut)"
              >
                <option value="a_faire">À faire</option>
                <option value="en_cours">En cours</option>
                <option value="termine">Terminé</option>
              </select>
              <StatusBadge v-else :tone="statutTone[tk.statut]">{{ t(`status.${tk.statut}` as any) }}</StatusBadge>
            </td>
            <td class="px-4 py-3">
              <div v-if="perms.canEditTacheFully(tk)" class="flex justify-end gap-2">
                <BaseButton size="sm" variant="outlined" @click="openEdit(tk)">Modifier</BaseButton>
                <BaseButton v-if="perms.can('taches:delete')" size="sm" variant="danger" @click="confirmDelete = tk">Supprimer</BaseButton>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0"><td colspan="6" class="px-4 py-8 text-center text-sm text-slate-400">Aucune tâche</td></tr>
        </BaseTable>
      </div>
    </BaseCard>

    <BaseModal :open="modalOpen" :title="editing ? 'Modifier la tâche' : 'Nouvelle tâche'" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <BaseInput v-model="form.titre" label="Titre" required />
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Description</span>
          <textarea v-model="form.description" rows="3" class="field-input w-full resize-none rounded-lg px-3.5 py-2.5 text-sm" />
        </label>
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Assignée à</span>
          <select v-model="form.assigneA" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm" required :disabled="!!editing">
            <option v-for="s in assignableStagiaires" :key="s.userId" :value="s.userId">{{ users.byId(s.userId)?.prenom }} {{ users.byId(s.userId)?.nom }}</option>
          </select>
        </label>
        <div class="grid grid-cols-2 gap-4">
          <label class="block">
            <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Priorité</span>
            <select v-model="form.priorite" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
              <option value="basse">Basse</option>
              <option value="moyenne">Moyenne</option>
              <option value="haute">Haute</option>
            </select>
          </label>
          <BaseInput v-model="form.dateEcheance" type="date" label="Échéance" required />
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <BaseButton variant="secondary" type="button" @click="modalOpen = false">Annuler</BaseButton>
          <BaseButton type="submit" :loading="saving">Enregistrer</BaseButton>
        </div>
      </form>
    </BaseModal>

    <BaseModal :open="!!confirmDelete" title="Confirmer la suppression" size="sm" @close="confirmDelete = null">
      <p class="mb-5 text-sm text-slate-600 dark:text-slate-300">Supprimer la tâche <strong>{{ confirmDelete?.titre }}</strong> ?</p>
      <div class="flex justify-end gap-3">
        <BaseButton variant="secondary" @click="confirmDelete = null">Annuler</BaseButton>
        <BaseButton variant="danger" @click="handleDelete">Supprimer</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
