<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUsersStore } from '@/stores/users'
import { useStagiairesStore } from '@/stores/stagiaires'
import { usePresencesStore } from '@/stores/presences'
import { useTachesStore } from '@/stores/taches'
import { useCatalogStore } from '@/stores/catalog'
import { useActivityLogStore } from '@/stores/activityLog'
import { useNotificationsStore } from '@/stores/notifications'
import { usePermissions } from '@/composables/usePermissions'
import { useStageProgress } from '@/composables/useStageProgress'
import { useAttendanceStats } from '@/composables/useAttendanceStats'
import { runSmartNotifications } from '@/composables/useSmartNotifications'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import CircularProgress from '@/components/ui/CircularProgress.vue'
import MiniBarChart from '@/components/ui/MiniBarChart.vue'
import SparklineBars from '@/components/ui/SparklineBars.vue'

const auth = useAuthStore()
const router = useRouter()
const users = useUsersStore()
const stagiaires = useStagiairesStore()
const presences = usePresencesStore()
const taches = useTachesStore()
const catalog = useCatalogStore()
const activityLog = useActivityLogStore()
const notificationsStore = useNotificationsStore()
const perms = usePermissions()

onMounted(async () => {
  await Promise.all([users.loadAll(), stagiaires.loadAll(), presences.loadAll(), taches.loadAll(), catalog.loadAll()])
  if (perms.can('activityLog:read')) await activityLog.loadAll()

  if (auth.user) {
    const myStagiaire = stagiaires.byUserId(auth.user.id)
    const today = new Date().toISOString().slice(0, 10)
    const pointeAujourdhui = myStagiaire ? presences.byStagiaire(myStagiaire.id).some((p) => p.date === today) : false
    const myLateTasks = perms.isStagiaire.value
      ? taches.byAssignee(auth.user.id).filter((t) => t.statut !== 'termine' && t.dateEcheance < today)
      : perms.isTuteur.value
        ? taches.items.filter((t) => t.creePar === auth.user!.id && t.statut !== 'termine' && t.dateEcheance < today)
        : []
    await runSmartNotifications({ user: auth.user, myStagiaire, pointeAujourdhui, myLateTasks })
    notificationsStore.reset()
    await notificationsStore.loadForUser(auth.user.id, true)
  }
})

const TODAY = new Date().toISOString().slice(0, 10)

// ---------------------------------------------------------------------------
// Helpers communs (évite toute duplication entre les 4 vues du Dashboard)
// ---------------------------------------------------------------------------
const stagiairesEnCours = computed(() => stagiaires.items.filter((s) => s.statut === 'en_cours'))
const stagiairesBientotFinis = computed(() =>
  stagiairesEnCours.value.filter((s) => {
    const jours = Math.round((new Date(s.dateFin).getTime() - Date.now()) / 86400000)
    return jours >= 0 && jours <= 7
  }),
)
const presencesToday = computed(() => presences.items.filter((p) => p.date === TODAY))
const absencesToday = computed(() => presencesToday.value.filter((p) => p.statut === 'absent'))

function tachesEnRetard(list: typeof taches.items) {
  return list.filter((t) => t.statut !== 'termine' && t.dateEcheance < TODAY)
}

const statutTone: Record<string, 'green' | 'orange' | 'blue' | 'grey' | 'red'> = {
  en_cours: 'blue', a_venir: 'grey', termine: 'green',
  present: 'green', absent: 'red', retard: 'orange', conge: 'grey',
}

const actionLabel: Record<string, string> = { CREATE: 'a créé', UPDATE: 'a modifié', DELETE: 'a supprimé', LOGIN: "s'est connecté", LOGOUT: "s'est déconnecté" }

// ---------------------------------------------------------------------------
// ADMIN
// ---------------------------------------------------------------------------
const usersByRole = computed(() =>
  catalog.roles.map((r) => ({ label: r.nom, value: users.items.filter((u) => u.roleId === r.id).length, tone: 'blue' as const })),
)
const stagiairesByDept = computed(() =>
  catalog.departments.map((d) => ({ label: d.nom, value: stagiaires.items.filter((s) => s.departmentId === d.id).length, tone: 'green' as const })),
)
const recentActivity = computed(() => activityLog.items.slice(0, 6))

// ---------------------------------------------------------------------------
// RESPONSABLE STAGE
// ---------------------------------------------------------------------------
const globalPresenceRate = computed(() => {
  if (presences.items.length === 0) return 0
  return Math.round((presences.items.filter((p) => p.statut === 'present').length / presences.items.length) * 100)
})
const presenceLast7Days = computed(() => {
  const days: { label: string; value: number; tone: 'blue' }[] = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000)
    const key = d.toISOString().slice(0, 10)
    const count = presences.items.filter((p) => p.date === key && p.statut === 'present').length
    days.push({ label: d.toLocaleDateString('fr-FR', { weekday: 'short' }), value: count, tone: 'blue' })
  }
  return days
})
const respLateTasks = computed(() => tachesEnRetard(taches.items))

// ---------------------------------------------------------------------------
// TUTEUR
// ---------------------------------------------------------------------------
const myStagiaires = computed(() => (auth.user ? stagiaires.byTuteur(auth.user.id) : []))
const myStagiairesIds = computed(() => new Set(myStagiaires.value.map((s) => s.id)))
const myLateTasks = computed(() => (auth.user ? tachesEnRetard(taches.items.filter((t) => t.creePar === auth.user!.id)) : []))
const myAbsencesToday = computed(() => absencesToday.value.filter((p) => myStagiairesIds.value.has(p.stagiaireId)))
const myTasksByStatus = computed(() => {
  if (!auth.user) return []
  const mine = taches.items.filter((t) => t.creePar === auth.user!.id)
  return [
    { label: 'À faire', value: mine.filter((t) => t.statut === 'a_faire').length, tone: 'grey' as const },
    { label: 'En cours', value: mine.filter((t) => t.statut === 'en_cours').length, tone: 'blue' as const },
    { label: 'Terminé', value: mine.filter((t) => t.statut === 'termine').length, tone: 'green' as const },
  ]
})
const myStagiairesBientotFinis = computed(() => myStagiaires.value.filter((s) => stagiairesBientotFinis.value.includes(s)))
const notPointedToday = computed(() =>
  myStagiaires.value.filter((s) => s.statut === 'en_cours' && !presencesToday.value.some((p) => p.stagiaireId === s.id)),
)

// ---------------------------------------------------------------------------
// STAGIAIRE
// ---------------------------------------------------------------------------
const myStagiaireProfile = computed(() => (auth.user ? stagiaires.byUserId(auth.user.id) : undefined))
const { progress: myProgress } = useStageProgress(myStagiaireProfile)
const myPresencesList = computed(() => (myStagiaireProfile.value ? presences.byStagiaire(myStagiaireProfile.value.id) : []))
const { stats: myAttendance } = useAttendanceStats(myPresencesList)
const myTasksActive = computed(() => (auth.user ? taches.byAssignee(auth.user.id).filter((t) => t.statut !== 'termine') : []))
const myLateOwnTasks = computed(() => (auth.user ? tachesEnRetard(taches.byAssignee(auth.user.id)) : []))
const myDepartment = computed(() => (myStagiaireProfile.value ? catalog.departmentById(myStagiaireProfile.value.departmentId) : undefined))
const myTuteur = computed(() => (myStagiaireProfile.value?.tuteurId ? users.byId(myStagiaireProfile.value.tuteurId) : undefined))
const modaliteLabel: Record<string, string> = { presentiel: 'Présentiel', distanciel: 'Distanciel', hybride: 'Hybride' }
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">Tableau de bord</h1>

    <!-- ========================= ADMIN ========================= -->
    <template v-if="perms.isAdmin.value">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <BaseCard><p class="text-xs text-slate-500">Utilisateurs</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ users.items.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Départements</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ catalog.departments.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Stagiaires</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stagiaires.items.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Stages actifs</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stagiairesEnCours.length }}</p></BaseCard>
      </div>

      <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BaseCard>
          <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Répartition par rôle</h3>
          <MiniBarChart :data="usersByRole" :max="Math.max(1, ...usersByRole.map((r) => r.value))" />
        </BaseCard>
        <BaseCard>
          <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Stagiaires par département</h3>
          <MiniBarChart :data="stagiairesByDept" :max="Math.max(1, ...stagiairesByDept.map((r) => r.value))" />
        </BaseCard>
      </div>

      <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BaseCard v-if="stagiairesBientotFinis.length > 0 || respLateTasks.length > 0">
          <h3 class="mb-3 font-semibold text-slate-900 dark:text-white">Alertes</h3>
          <div class="space-y-2 text-sm">
            <p v-if="stagiairesBientotFinis.length > 0" class="flex items-center gap-2 text-amber-700 dark:text-amber-400">⚠ {{ stagiairesBientotFinis.length }} stage(s) se terminent dans ≤ 7 jours</p>
            <p v-if="respLateTasks.length > 0" class="flex items-center gap-2 text-red-600">⚠ {{ respLateTasks.length }} tâche(s) en retard</p>
          </div>
        </BaseCard>
        <BaseCard :padded="false">
          <h3 class="p-5 pb-3 font-semibold text-slate-900 dark:text-white">Activité récente</h3>
          <div class="divide-y divide-slate-100 px-5 pb-4 dark:divide-slate-800">
            <div v-for="e in recentActivity" :key="e.id" class="py-2.5 text-sm">
              <span class="font-medium text-slate-800 dark:text-slate-100">{{ users.byId(e.userId)?.prenom }} {{ users.byId(e.userId)?.nom }}</span>
              <span class="text-slate-500"> {{ actionLabel[e.action] }} {{ e.cibleType }}</span>
              <span class="block text-xs text-slate-400">{{ new Date(e.date).toLocaleString('fr-FR') }}</span>
            </div>
            <p v-if="recentActivity.length === 0" class="py-4 text-center text-sm text-slate-400">Aucune activité récente</p>
          </div>
        </BaseCard>
      </div>
    </template>

    <!-- ========================= RESPONSABLE STAGE ========================= -->
    <template v-else-if="perms.isResponsable.value">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <BaseCard><p class="text-xs text-slate-500">Stagiaires actifs</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ stagiairesEnCours.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Taux de présence</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ globalPresenceRate }}%</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Absences aujourd'hui</p><p class="text-2xl font-semibold text-red-600">{{ absencesToday.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Stages bientôt finis</p><p class="text-2xl font-semibold text-amber-600">{{ stagiairesBientotFinis.length }}</p></BaseCard>
      </div>

      <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BaseCard>
          <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Présences — 7 derniers jours</h3>
          <SparklineBars :points="presenceLast7Days" :max="Math.max(1, ...presenceLast7Days.map((p) => p.value))" />
        </BaseCard>
        <BaseCard>
          <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Stagiaires par département</h3>
          <MiniBarChart :data="stagiairesByDept" :max="Math.max(1, ...stagiairesByDept.map((r) => r.value))" />
        </BaseCard>
      </div>

      <BaseCard v-if="stagiairesBientotFinis.length > 0 || respLateTasks.length > 0" class="mt-5">
        <h3 class="mb-3 font-semibold text-slate-900 dark:text-white">Alertes</h3>
        <div class="space-y-2 text-sm">
          <p v-if="stagiairesBientotFinis.length > 0" class="text-amber-700 dark:text-amber-400">⚠ {{ stagiairesBientotFinis.length }} stage(s) se terminent bientôt</p>
          <p v-if="respLateTasks.length > 0" class="text-red-600">⚠ {{ respLateTasks.length }} tâche(s) en retard, tous départements</p>
        </div>
      </BaseCard>
    </template>

    <!-- ========================= TUTEUR ========================= -->
    <template v-else-if="perms.isTuteur.value">
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <BaseCard><p class="text-xs text-slate-500">Mes stagiaires</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ myStagiaires.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Absences aujourd'hui</p><p class="text-2xl font-semibold text-red-600">{{ myAbsencesToday.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Tâches en retard</p><p class="text-2xl font-semibold" :class="myLateTasks.length > 0 ? 'text-red-600' : 'text-slate-900 dark:text-white'">{{ myLateTasks.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Stages bientôt finis</p><p class="text-2xl font-semibold text-amber-600">{{ myStagiairesBientotFinis.length }}</p></BaseCard>
      </div>

      <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <BaseCard :padded="false">
          <h3 class="p-5 pb-3 font-semibold text-slate-900 dark:text-white">Mes stagiaires</h3>
          <div class="divide-y divide-slate-100 px-5 pb-4 dark:divide-slate-800">
            <div v-for="s in myStagiaires" :key="s.id" class="flex cursor-pointer items-center justify-between py-2.5 text-sm" @click="router.push(`/stagiaires/${s.id}`)">
              <span class="text-slate-700 dark:text-slate-200">{{ users.byId(s.userId)?.prenom }} {{ users.byId(s.userId)?.nom }}</span>
              <StatusBadge :tone="statutTone[s.statut]">{{ s.statut }}</StatusBadge>
            </div>
          </div>
        </BaseCard>
        <BaseCard>
          <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Mes tâches par statut</h3>
          <MiniBarChart :data="myTasksByStatus" :max="Math.max(1, ...myTasksByStatus.map((t) => t.value))" />
        </BaseCard>
      </div>

      <BaseCard v-if="notPointedToday.length > 0 || myStagiairesBientotFinis.length > 0" class="mt-5">
        <h3 class="mb-3 font-semibold text-slate-900 dark:text-white">Alertes</h3>
        <div class="space-y-2 text-sm">
          <p v-if="notPointedToday.length > 0" class="text-amber-700 dark:text-amber-400">⚠ {{ notPointedToday.length }} stagiaire(s) n'ont pas encore pointé aujourd'hui</p>
          <p v-if="myStagiairesBientotFinis.length > 0" class="text-amber-700 dark:text-amber-400">⚠ {{ myStagiairesBientotFinis.length }} stage(s) parmi les vôtres se terminent bientôt</p>
        </div>
      </BaseCard>
    </template>

    <!-- ========================= STAGIAIRE ========================= -->
    <template v-else>
      <BaseCard v-if="myStagiaireProfile && myProgress" class="mb-5">
        <div class="flex flex-col items-center gap-6 sm:flex-row">
          <div class="relative shrink-0">
            <CircularProgress :percentage="myProgress.pourcentage" :size="130" />
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-2xl font-bold text-slate-900 dark:text-white">{{ myProgress.pourcentage }}%</span>
              <span class="text-[11px] text-slate-500">terminé</span>
            </div>
          </div>
          <div class="flex-1">
            <h3 class="mb-3 font-semibold text-slate-900 dark:text-white">Mon stage — {{ myStagiaireProfile.sujetStage }}</h3>
            <div class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <div><p class="text-xs text-slate-500">Département</p><p class="font-medium text-slate-800 dark:text-slate-100">{{ myDepartment?.nom }}</p></div>
              <div><p class="text-xs text-slate-500">Tuteur</p><p class="font-medium text-slate-800 dark:text-slate-100">{{ myTuteur ? `${myTuteur.prenom} ${myTuteur.nom}` : 'Non affecté' }}</p></div>
              <div><p class="text-xs text-slate-500">Modalité</p><p class="font-medium text-slate-800 dark:text-slate-100">{{ modaliteLabel[myStagiaireProfile.modalite] }}</p></div>
              <div><p class="text-xs text-slate-500">Début</p><p class="font-medium text-slate-800 dark:text-slate-100">{{ new Date(myStagiaireProfile.dateDebut).toLocaleDateString('fr-FR') }}</p></div>
              <div><p class="text-xs text-slate-500">Fin</p><p class="font-medium text-slate-800 dark:text-slate-100">{{ new Date(myStagiaireProfile.dateFin).toLocaleDateString('fr-FR') }}</p></div>
              <div><p class="text-xs text-slate-500">Jours restants</p><p class="font-medium text-slate-800 dark:text-slate-100">{{ myProgress.joursRestants }} j</p></div>
            </div>
            <BaseButton v-if="myStagiaireProfile.statut === 'termine'" size="sm" class="mt-4" @click="router.push(`/stagiaires/${myStagiaireProfile.id}/attestation`)">
              Générer mon attestation
            </BaseButton>
          </div>
        </div>
      </BaseCard>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <BaseCard><p class="text-xs text-slate-500">Tâches en cours</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ myTasksActive.length }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Taux de présence</p><p class="text-2xl font-semibold text-slate-900 dark:text-white">{{ myAttendance.tauxPresence }}%</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Mes absences</p><p class="text-2xl font-semibold text-red-600">{{ myAttendance.absences }}</p></BaseCard>
        <BaseCard><p class="text-xs text-slate-500">Mes retards</p><p class="text-2xl font-semibold text-amber-600">{{ myAttendance.retards }}</p></BaseCard>
      </div>

      <BaseCard v-if="!myAttendance.pointeAujourdhui || myLateOwnTasks.length > 0 || myProgress?.estBientotTermine" class="mt-5">
        <h3 class="mb-3 font-semibold text-slate-900 dark:text-white">Alertes</h3>
        <div class="space-y-2 text-sm">
          <p v-if="!myAttendance.pointeAujourdhui" class="text-amber-700 dark:text-amber-400">⚠ Vous n'avez pas encore pointé aujourd'hui — <RouterLink to="/presences" class="underline">pointer maintenant</RouterLink></p>
          <p v-if="myLateOwnTasks.length > 0" class="text-red-600">⚠ {{ myLateOwnTasks.length }} tâche(s) en retard</p>
          <p v-if="myProgress?.estBientotTermine" class="text-amber-700 dark:text-amber-400">⚠ Votre stage se termine dans {{ myProgress.joursRestants }} jour(s)</p>
        </div>
      </BaseCard>

      <BaseCard :padded="false" class="mt-5">
        <h3 class="p-5 pb-3 font-semibold text-slate-900 dark:text-white">Mes tâches</h3>
        <div class="divide-y divide-slate-100 px-5 pb-4 dark:divide-slate-800">
          <div v-for="t in myTasksActive" :key="t.id" class="flex items-center justify-between py-2.5 text-sm">
            <span class="text-slate-700 dark:text-slate-200">{{ t.titre }}</span>
            <span class="text-xs text-slate-500">Échéance : {{ new Date(t.dateEcheance).toLocaleDateString('fr-FR') }}</span>
          </div>
          <p v-if="myTasksActive.length === 0" class="py-4 text-center text-sm text-slate-400">Aucune tâche en cours 🎉</p>
        </div>
      </BaseCard>
    </template>
  </div>
</template>
