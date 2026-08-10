<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import BaseButton from '@/components/base/BaseButton.vue'
import { useStagiairesStore } from '@/stores/stagiaires'
import { useUsersStore } from '@/stores/users'
import { useCatalogStore } from '@/stores/catalog'
import { useAuthStore } from '@/stores/auth'
import { useActivityLogStore } from '@/stores/activityLog'
import { usePermissions } from '@/composables/usePermissions'

const route = useRoute()
const router = useRouter()
const stagiaires = useStagiairesStore()
const users = useUsersStore()
const catalog = useCatalogStore()
const auth = useAuthStore()
const activityLog = useActivityLogStore()
const perms = usePermissions()

const stagiaire = computed(() => stagiaires.byId(route.params.id as string))
const owner = computed(() => (stagiaire.value ? users.byId(stagiaire.value.userId) : undefined))
const tuteur = computed(() => (stagiaire.value?.tuteurId ? users.byId(stagiaire.value.tuteurId) : undefined))
const department = computed(() => (stagiaire.value ? catalog.departmentById(stagiaire.value.departmentId) : undefined))

onMounted(async () => {
  await Promise.all([stagiaires.loadAll(), users.loadAll(), catalog.loadAll()])
  if (!stagiaire.value || stagiaire.value.statut !== 'termine' || (stagiaire.value && !perms.canAccessStagiaire(stagiaire.value))) {
    router.replace('/stagiaires')
    return
  }
  if (auth.user) await activityLog.record(auth.user.id, 'CREATE', 'attestation', stagiaire.value.id)
})

function handlePrint() {
  window.print()
}
</script>

<template>
  <div v-if="stagiaire && owner" class="mx-auto max-w-2xl">
    <div class="mb-4 flex items-center justify-between print:hidden">
      <button class="text-sm text-brand-600 hover:underline" @click="router.push(`/stagiaires/${stagiaire.id}`)">← Retour</button>
      <BaseButton @click="handlePrint">Imprimer / Exporter</BaseButton>
    </div>

    <div class="surface rounded-xl border-2 border-brand-600 p-10 print:border-none print:shadow-none">
      <div class="mb-8 flex items-center justify-between border-b border-slate-200 pb-6 dark:border-slate-700">
        <div class="flex items-center gap-3">
          <img src="/logo-axproo.png" alt="AXPROO" class="h-10 w-10" />
          <div>
            <p class="font-semibold text-slate-900 dark:text-white">StageManager</p>
            <p class="text-xs text-slate-500">by AXPROO</p>
          </div>
        </div>
        <p class="text-xs text-slate-400">Généré le {{ new Date().toLocaleDateString('fr-FR') }}</p>
      </div>

      <h1 class="mb-6 text-center text-xl font-semibold uppercase tracking-wide text-slate-900 dark:text-white">Attestation de stage</h1>

      <p class="mb-6 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        Nous soussignons attester que <strong>{{ owner.prenom }} {{ owner.nom }}</strong>
        a effectué un stage au sein du département <strong>{{ department?.nom }}</strong>,
        du <strong>{{ new Date(stagiaire.dateDebut).toLocaleDateString('fr-FR') }}</strong>
        au <strong>{{ new Date(stagiaire.dateFin).toLocaleDateString('fr-FR') }}</strong>,
        sur le sujet : « {{ stagiaire.sujetStage }} ».
      </p>

      <p v-if="tuteur" class="mb-8 text-sm text-slate-700 dark:text-slate-300">
        Ce stage a été encadré par <strong>{{ tuteur.prenom }} {{ tuteur.nom }}</strong>.
      </p>

      <p class="mb-10 text-sm text-slate-700 dark:text-slate-300">
        Cette attestation est délivrée pour servir et valoir ce que de droit.
      </p>

      <div class="flex justify-end">
        <div class="text-center text-sm text-slate-600 dark:text-slate-300">
          <p class="mb-10">Le Responsable Stage</p>
          <p class="border-t border-slate-300 pt-2 text-xs text-slate-400">Signature</p>
        </div>
      </div>
    </div>
  </div>
</template>
