<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { useStagiairesStore } from '@/stores/stagiaires'
import { useUsersStore } from '@/stores/users'
import { useCatalogStore } from '@/stores/catalog'
import { usePresencesStore } from '@/stores/presences'
import { useTachesStore } from '@/stores/taches'
import { usePermissions } from '@/composables/usePermissions'
import { useI18n } from '@/composables/useI18n'

const route = useRoute()
const router = useRouter()
const stagiaires = useStagiairesStore()
const users = useUsersStore()
const catalog = useCatalogStore()
const presences = usePresencesStore()
const taches = useTachesStore()
const perms = usePermissions()
const { t } = useI18n()

onMounted(async () => {
  await Promise.all([stagiaires.loadAll(), users.loadAll(), catalog.loadAll(), presences.loadAll(), taches.loadAll()])
  if (stagiaire.value && !perms.canAccessStagiaire(stagiaire.value)) {
    router.replace('/stagiaires')
  }
})

const stagiaire = computed(() => stagiaires.byId(route.params.id as string))
const owner = computed(() => (stagiaire.value ? users.byId(stagiaire.value.userId) : undefined))
const tuteur = computed(() => (stagiaire.value?.tuteurId ? users.byId(stagiaire.value.tuteurId) : undefined))
const department = computed(() => (stagiaire.value ? catalog.departmentById(stagiaire.value.departmentId) : undefined))
const recentPresences = computed(() => (stagiaire.value ? presences.byStagiaire(stagiaire.value.id).slice(0, 5) : []))
const relatedTasks = computed(() => (owner.value ? taches.byAssignee(owner.value.id) : []))

const statutTone: Record<string, 'green' | 'orange' | 'blue' | 'grey' | 'red'> = {
  en_cours: 'blue', a_venir: 'grey', termine: 'green',
  present: 'green', absent: 'red', retard: 'orange', conge: 'grey',
}
const modaliteLabel: Record<string, string> = { presentiel: 'Présentiel', distanciel: 'Distanciel', hybride: 'Hybride' }
</script>

<template>
  <div v-if="stagiaire">
    <button class="mb-4 text-sm text-brand-600 hover:underline" @click="router.push('/stagiaires')">← Retour à la liste</button>

    <BaseCard class="mb-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:text-left">
      <UserAvatar v-if="owner" :initials="owner.avatarInitials" :avatar-url="owner.avatarUrl" size="lg" />
      <div class="flex-1">
        <h1 class="text-xl font-semibold text-slate-900 dark:text-white">{{ owner?.prenom }} {{ owner?.nom }}</h1>
        <p class="text-sm text-slate-500">{{ owner?.email }}</p>
      </div>
      <StatusBadge :tone="statutTone[stagiaire.statut]">{{ t(`status.${stagiaire.statut}` as any) }}</StatusBadge>
      <BaseButton v-if="stagiaire.statut === 'termine'" size="sm" variant="outlined" @click="router.push(`/stagiaires/${stagiaire.id}/attestation`)">
        Générer l'attestation
      </BaseButton>
    </BaseCard>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <BaseCard>
        <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Informations du stage</h3>
        <dl class="space-y-2 text-sm">
          <div class="flex justify-between"><dt class="text-slate-500">Département</dt><dd class="font-medium text-slate-800 dark:text-slate-200">{{ department?.nom }}</dd></div>
          <div class="flex justify-between"><dt class="text-slate-500">Modalité</dt><dd class="font-medium text-slate-800 dark:text-slate-200">{{ modaliteLabel[stagiaire.modalite] }}</dd></div>
          <div class="flex justify-between"><dt class="text-slate-500">Tuteur</dt><dd class="font-medium text-slate-800 dark:text-slate-200">{{ tuteur ? `${tuteur.prenom} ${tuteur.nom}` : 'Non affecté' }}</dd></div>
          <div class="flex justify-between"><dt class="text-slate-500">Date de début</dt><dd class="font-medium text-slate-800 dark:text-slate-200">{{ new Date(stagiaire.dateDebut).toLocaleDateString('fr-FR') }}</dd></div>
          <div class="flex justify-between"><dt class="text-slate-500">Date de fin</dt><dd class="font-medium text-slate-800 dark:text-slate-200">{{ new Date(stagiaire.dateFin).toLocaleDateString('fr-FR') }}</dd></div>
        </dl>
        <p class="mt-4 text-sm text-slate-500">Sujet du stage</p>
        <p class="text-sm text-slate-800 dark:text-slate-200">{{ stagiaire.sujetStage }}</p>
      </BaseCard>

      <BaseCard>
        <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Présences récentes</h3>
        <div class="space-y-2">
          <div v-for="p in recentPresences" :key="p.id" class="flex items-center justify-between text-sm">
            <span class="text-slate-600 dark:text-slate-300">{{ new Date(p.date).toLocaleDateString('fr-FR') }}</span>
            <StatusBadge :tone="statutTone[p.statut]">{{ t(`status.${p.statut}` as any) }}</StatusBadge>
          </div>
          <p v-if="recentPresences.length === 0" class="text-sm text-slate-400">Aucune présence enregistrée</p>
        </div>
      </BaseCard>

      <BaseCard class="lg:col-span-2">
        <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Tâches assignées</h3>
        <div class="space-y-2">
          <div v-for="tk in relatedTasks" :key="tk.id" class="flex items-center justify-between border-b border-slate-100 pb-2 text-sm last:border-0 dark:border-slate-800">
            <span class="text-slate-700 dark:text-slate-200">{{ tk.titre }}</span>
            <StatusBadge :tone="tk.statut === 'termine' ? 'green' : tk.statut === 'en_cours' ? 'blue' : 'grey'">{{ t(`status.${tk.statut}` as any) }}</StatusBadge>
          </div>
          <p v-if="relatedTasks.length === 0" class="text-sm text-slate-400">Aucune tâche assignée</p>
        </div>
      </BaseCard>
    </div>
  </div>
</template>
