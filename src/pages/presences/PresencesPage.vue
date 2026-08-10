<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import { usePresencesStore } from '@/stores/presences'
import { useStagiairesStore } from '@/stores/stagiaires'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'
import { useAttendanceStats } from '@/composables/useAttendanceStats'
import { useI18n } from '@/composables/useI18n'
import type { PresenceMode, PresenceStatut } from '@/types'

const presences = usePresencesStore()
const stagiaires = useStagiairesStore()
const users = useUsersStore()
const auth = useAuthStore()
const perms = usePermissions()
const { t } = useI18n()

onMounted(() => Promise.all([presences.loadAll(), stagiaires.loadAll(), users.loadAll()]))

const visibleStagiaireIds = computed(() =>
  new Set(stagiaires.items.filter((s) => perms.canAccessStagiaire(s)).map((s) => s.id)),
)
const stagiaireFilter = ref('')
const rows = computed(() =>
  presences.items
    .filter((p) => visibleStagiaireIds.value.has(p.stagiaireId))
    .filter((p) => !stagiaireFilter.value || p.stagiaireId === stagiaireFilter.value)
    .sort((a, b) => b.date.localeCompare(a.date)),
)

// --- Pointage personnel (stagiaire) ---
const myStagiaireProfile = computed(() => (auth.user ? stagiaires.byUserId(auth.user.id) : undefined))
const myPresences = computed(() => (myStagiaireProfile.value ? presences.byStagiaire(myStagiaireProfile.value.id) : []))
const { stats: myStats } = useAttendanceStats(myPresences)
const pointageMode = ref<PresenceMode>('presentiel')
const pointing = ref(false)

async function handlePointage() {
  if (!myStagiaireProfile.value || !auth.user) return
  pointing.value = true
  const now = new Date()
  await presences.create(
    {
      stagiaireId: myStagiaireProfile.value.id,
      date: now.toISOString().slice(0, 10),
      statut: 'present',
      mode: pointageMode.value,
      heureArrivee: now.toTimeString().slice(0, 5),
      heureDepart: null,
      saisiPar: auth.user.id,
    },
    auth.user.id,
  )
  pointing.value = false
}

const statutTone: Record<PresenceStatut, 'green' | 'red' | 'orange' | 'grey'> = {
  present: 'green', absent: 'red', retard: 'orange', conge: 'grey',
}
const modeLabel: Record<PresenceMode, string> = { presentiel: 'Présentiel', en_ligne: 'En ligne' }

const columns = [
  { key: 'stagiaire', label: 'Stagiaire' },
  { key: 'date', label: 'Date' },
  { key: 'statut', label: 'Statut' },
  { key: 'mode', label: 'Mode' },
  { key: 'horaires', label: 'Horaires' },
]

const modalOpen = ref(false)
const saving = ref(false)
const form = reactive({ stagiaireId: '', date: new Date().toISOString().slice(0, 10), statut: 'present' as PresenceStatut, mode: 'presentiel' as PresenceMode, heureArrivee: '', heureDepart: '' })

const canSaisir = computed(() => perms.can('presences:create'))
const myStagiaires = computed(() =>
  stagiaires.items.filter((s) => (perms.isTuteur.value ? s.tuteurId === auth.user?.id : true)),
)

function openCreate() {
  form.stagiaireId = myStagiaires.value[0]?.id ?? ''
  form.date = new Date().toISOString().slice(0, 10)
  form.statut = 'present'
  form.mode = 'presentiel'
  form.heureArrivee = ''
  form.heureDepart = ''
  modalOpen.value = true
}

async function handleSubmit() {
  if (!auth.user) return
  saving.value = true
  await presences.create(
    {
      stagiaireId: form.stagiaireId,
      date: form.date,
      statut: form.statut,
      mode: form.mode,
      heureArrivee: form.heureArrivee || null,
      heureDepart: form.heureDepart || null,
      saisiPar: auth.user.id,
    },
    auth.user.id,
  )
  saving.value = false
  modalOpen.value = false
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">{{ t('nav.presences') }}</h1>
      <BaseButton v-if="canSaisir" @click="openCreate">+ Saisir une présence</BaseButton>
    </div>

    <!-- Pointage & stats personnelles (Stagiaire uniquement) -->
    <BaseCard v-if="perms.isStagiaire.value" class="mb-5">
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 class="font-semibold text-slate-900 dark:text-white">Pointage du jour</h3>
          <p v-if="myStats.pointeAujourdhui" class="text-sm text-green-600">Vous avez déjà pointé aujourd'hui ✓</p>
          <p v-else class="text-sm text-slate-500">Vous n'avez pas encore pointé aujourd'hui.</p>
        </div>
        <div v-if="!myStats.pointeAujourdhui" class="flex items-center gap-2">
          <select v-model="pointageMode" class="field-input rounded-lg px-3 py-2 text-sm">
            <option value="presentiel">Présentiel</option>
            <option value="en_ligne">En ligne</option>
          </select>
          <BaseButton :loading="pointing" @click="handlePointage">Pointer ma présence</BaseButton>
        </div>
      </div>
      <div class="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-5 sm:grid-cols-4 dark:border-slate-800">
        <div><p class="text-xs text-slate-500">Taux de présence</p><p class="text-xl font-semibold text-slate-900 dark:text-white">{{ myStats.tauxPresence }}%</p></div>
        <div><p class="text-xs text-slate-500">Absences</p><p class="text-xl font-semibold text-red-600">{{ myStats.absences }}</p></div>
        <div><p class="text-xs text-slate-500">Retards</p><p class="text-xl font-semibold text-amber-600">{{ myStats.retards }}</p></div>
        <div><p class="text-xs text-slate-500">Congés</p><p class="text-xl font-semibold text-slate-700 dark:text-slate-200">{{ myStats.conges }}</p></div>
      </div>
    </BaseCard>

    <BaseCard class="mb-5">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Filtrer par stagiaire</span>
        <select v-model="stagiaireFilter" class="field-input w-full max-w-xs rounded-lg px-3.5 py-2.5 text-sm">
          <option value="">Tous</option>
          <option v-for="s in stagiaires.items.filter((s) => visibleStagiaireIds.has(s.id))" :key="s.id" :value="s.id">
            {{ users.byId(s.userId)?.prenom }} {{ users.byId(s.userId)?.nom }}
          </option>
        </select>
      </label>
    </BaseCard>

    <BaseCard :padded="false">
      <div class="p-5">
        <BaseTable :columns="columns">
          <tr v-for="p in rows" :key="p.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">
              {{ users.byId(stagiaires.byId(p.stagiaireId)?.userId ?? '')?.prenom }}
              {{ users.byId(stagiaires.byId(p.stagiaireId)?.userId ?? '')?.nom }}
            </td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ new Date(p.date).toLocaleDateString('fr-FR') }}</td>
            <td class="px-4 py-3"><StatusBadge :tone="statutTone[p.statut]">{{ t(`status.${p.statut}` as any) }}</StatusBadge></td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ modeLabel[p.mode] }}</td>
            <td class="px-4 py-3 text-slate-500">{{ p.heureArrivee ?? '—' }} → {{ p.heureDepart ?? '—' }}</td>
          </tr>
          <tr v-if="rows.length === 0"><td colspan="5" class="px-4 py-8 text-center text-sm text-slate-400">Aucune présence</td></tr>
        </BaseTable>
      </div>
    </BaseCard>

    <BaseModal :open="modalOpen" title="Saisir une présence" @close="modalOpen = false">
      <form class="space-y-4" @submit.prevent="handleSubmit">
        <label class="block">
          <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Stagiaire</span>
          <select v-model="form.stagiaireId" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm" required>
            <option v-for="s in myStagiaires" :key="s.id" :value="s.id">{{ users.byId(s.userId)?.prenom }} {{ users.byId(s.userId)?.nom }}</option>
          </select>
        </label>
        <BaseInput v-model="form.date" type="date" label="Date" required />
        <div class="grid grid-cols-2 gap-4">
          <label class="block">
            <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Statut</span>
            <select v-model="form.statut" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
              <option value="present">Présent</option>
              <option value="absent">Absent</option>
              <option value="retard">Retard</option>
              <option value="conge">Congé</option>
            </select>
          </label>
          <label class="block">
            <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Mode</span>
            <select v-model="form.mode" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
              <option value="presentiel">Présentiel</option>
              <option value="en_ligne">En ligne</option>
            </select>
          </label>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <BaseInput v-model="form.heureArrivee" type="time" label="Heure d'arrivée" />
          <BaseInput v-model="form.heureDepart" type="time" label="Heure de départ" />
        </div>
        <div class="flex justify-end gap-3 pt-2">
          <BaseButton variant="secondary" type="button" @click="modalOpen = false">Annuler</BaseButton>
          <BaseButton type="submit" :loading="saving">Enregistrer</BaseButton>
        </div>
      </form>
    </BaseModal>
  </div>
</template>
