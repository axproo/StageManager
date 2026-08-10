<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import type { Permission, Role } from '@/types'

const props = defineProps<{ initial?: Role | null; saving?: boolean }>()
const emit = defineEmits<{ submit: [Omit<Role, 'id' | 'systeme'>]; cancel: [] }>()

const PERMISSION_GROUPS: { module: string; permissions: { value: Permission; label: string }[] }[] = [
  { module: 'Utilisateurs', permissions: [
    { value: 'users:read', label: 'Consulter' }, { value: 'users:create', label: 'Créer' },
    { value: 'users:update', label: 'Modifier' }, { value: 'users:delete', label: 'Supprimer' },
  ] },
  { module: 'Rôles', permissions: [
    { value: 'roles:read', label: 'Consulter' }, { value: 'roles:create', label: 'Créer' },
    { value: 'roles:update', label: 'Modifier' }, { value: 'roles:delete', label: 'Supprimer' },
  ] },
  { module: 'Départements', permissions: [
    { value: 'departments:read', label: 'Consulter' }, { value: 'departments:create', label: 'Créer' },
    { value: 'departments:update', label: 'Modifier' }, { value: 'departments:delete', label: 'Supprimer' },
  ] },
  { module: 'Stagiaires', permissions: [
    { value: 'stagiaires:read', label: 'Consulter' }, { value: 'stagiaires:create', label: 'Créer' },
    { value: 'stagiaires:update', label: 'Modifier' }, { value: 'stagiaires:delete', label: 'Supprimer' },
  ] },
  { module: 'Présences', permissions: [
    { value: 'presences:read', label: 'Consulter' }, { value: 'presences:create', label: 'Saisir' },
    { value: 'presences:update', label: 'Modifier' },
  ] },
  { module: 'Tâches', permissions: [
    { value: 'taches:read', label: 'Consulter' }, { value: 'taches:create', label: 'Créer' },
    { value: 'taches:update', label: 'Modifier' }, { value: 'taches:delete', label: 'Supprimer' },
  ] },
  { module: "Journal d'activité", permissions: [{ value: 'activityLog:read', label: 'Consulter' }] },
  { module: 'Paramètres globaux', permissions: [{ value: 'settings:global', label: 'Administrer' }] },
]

const form = reactive({ nom: '', description: '', permissions: [] as Permission[] })

watch(
  () => props.initial,
  (r) => {
    if (!r) return
    form.nom = r.nom
    form.description = r.description
    form.permissions = [...r.permissions]
  },
  { immediate: true },
)

function toggle(p: Permission) {
  form.permissions = form.permissions.includes(p) ? form.permissions.filter((x) => x !== p) : [...form.permissions, p]
}

function handleSubmit() {
  emit('submit', { nom: form.nom, description: form.description, permissions: form.permissions })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <BaseInput v-model="form.nom" label="Nom du rôle" required :disabled="!!initial?.systeme" />
    <BaseInput v-model="form.description" label="Description" />

    <div>
      <span class="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Permissions</span>
      <div class="max-h-72 space-y-4 overflow-y-auto rounded-lg border border-slate-200 p-4 dark:border-slate-700">
        <div v-for="group in PERMISSION_GROUPS" :key="group.module">
          <p class="mb-1.5 text-xs font-semibold uppercase tracking-wide text-slate-400">{{ group.module }}</p>
          <div class="flex flex-wrap gap-x-4 gap-y-1.5">
            <label v-for="p in group.permissions" :key="p.value" class="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
              <input
                type="checkbox"
                :checked="form.permissions.includes(p.value)"
                class="h-4 w-4 rounded accent-blue-600"
                @change="toggle(p.value)"
              />
              {{ p.label }}
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-end gap-3 pt-2">
      <BaseButton variant="secondary" type="button" @click="$emit('cancel')">Annuler</BaseButton>
      <BaseButton type="submit" :loading="saving">Enregistrer</BaseButton>
    </div>
  </form>
</template>
