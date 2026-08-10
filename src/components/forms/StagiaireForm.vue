<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useUsersStore } from '@/stores/users'
import { useCatalogStore } from '@/stores/catalog'
import type { Stagiaire, StageModalite, StagiaireStatut } from '@/types'

const props = defineProps<{ initial?: Stagiaire | null; saving?: boolean }>()
const emit = defineEmits<{ submit: [Omit<Stagiaire, 'id'>]; cancel: [] }>()

const users = useUsersStore()
const catalog = useCatalogStore()

const stagiaireUsers = users.items.filter((u) => u.roleId === 'role-stagiaire')
const tuteurUsers = users.items.filter((u) => u.roleId === 'role-tuteur')

const form = reactive({
  userId: '',
  departmentId: '',
  tuteurId: '' as string,
  dateDebut: '',
  dateFin: '',
  sujetStage: '',
  statut: 'a_venir' as StagiaireStatut,
  modalite: 'presentiel' as StageModalite,
})

watch(
  () => props.initial,
  (s) => {
    if (!s) return
    form.userId = s.userId
    form.departmentId = s.departmentId
    form.tuteurId = s.tuteurId ?? ''
    form.dateDebut = s.dateDebut
    form.dateFin = s.dateFin
    form.sujetStage = s.sujetStage
    form.statut = s.statut
    form.modalite = s.modalite
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', {
    userId: form.userId,
    departmentId: form.departmentId,
    tuteurId: form.tuteurId || null,
    dateDebut: form.dateDebut,
    dateFin: form.dateFin,
    sujetStage: form.sujetStage,
    statut: form.statut,
    modalite: form.modalite,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Stagiaire (compte utilisateur)</span>
      <select v-model="form.userId" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm" required :disabled="!!initial">
        <option value="" disabled>Sélectionner...</option>
        <option v-for="u in stagiaireUsers" :key="u.id" :value="u.id">{{ u.prenom }} {{ u.nom }} — {{ u.email }}</option>
      </select>
    </label>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Département</span>
        <select v-model="form.departmentId" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm" required>
          <option value="" disabled>Sélectionner...</option>
          <option v-for="d in catalog.departments" :key="d.id" :value="d.id">{{ d.nom }}</option>
        </select>
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Tuteur</span>
        <select v-model="form.tuteurId" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
          <option value="">Non affecté</option>
          <option v-for="t in tuteurUsers" :key="t.id" :value="t.id">{{ t.prenom }} {{ t.nom }}</option>
        </select>
      </label>
    </div>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <BaseInput v-model="form.dateDebut" type="date" label="Date de début" required />
      <BaseInput v-model="form.dateFin" type="date" label="Date de fin" required />
    </div>
    <BaseInput v-model="form.sujetStage" label="Sujet du stage" required />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Statut</span>
        <select v-model="form.statut" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
          <option value="a_venir">À venir</option>
          <option value="en_cours">En cours</option>
          <option value="termine">Terminé</option>
        </select>
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Modalité</span>
        <select v-model="form.modalite" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
          <option value="presentiel">Présentiel</option>
          <option value="distanciel">Distanciel</option>
          <option value="hybride">Hybride</option>
        </select>
      </label>
    </div>
    <div class="flex justify-end gap-3 pt-2">
      <BaseButton variant="secondary" type="button" @click="$emit('cancel')">Annuler</BaseButton>
      <BaseButton type="submit" :loading="saving">Enregistrer</BaseButton>
    </div>
  </form>
</template>
