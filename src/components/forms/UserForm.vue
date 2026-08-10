<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useCatalogStore } from '@/stores/catalog'
import type { User } from '@/types'

const props = defineProps<{ initial?: User | null; saving?: boolean }>()
const emit = defineEmits<{ submit: [Omit<User, 'id' | 'createdAt' | 'avatarInitials'>]; cancel: [] }>()

const catalog = useCatalogStore()

const form = reactive({
  prenom: '',
  nom: '',
  email: '',
  motDePasse: '',
  roleId: catalog.roles[0]?.id ?? '',
  departmentId: '' as string,
  statut: 'actif' as 'actif' | 'inactif',
})

watch(
  () => props.initial,
  (u) => {
    if (!u) return
    form.prenom = u.prenom
    form.nom = u.nom
    form.email = u.email
    form.motDePasse = ''
    form.roleId = u.roleId
    form.departmentId = u.departmentId ?? ''
    form.statut = u.statut
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', {
    prenom: form.prenom,
    nom: form.nom,
    email: form.email,
    motDePasse: form.motDePasse || props.initial?.motDePasse || 'password',
    roleId: form.roleId,
    departmentId: form.departmentId || null,
    statut: form.statut,
  })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <BaseInput v-model="form.prenom" label="Prénom" required />
      <BaseInput v-model="form.nom" label="Nom" required />
    </div>
    <BaseInput v-model="form.email" type="email" label="Email" required />
    <BaseInput v-model="form.motDePasse" type="password" :label="initial ? 'Nouveau mot de passe (optionnel)' : 'Mot de passe'" :required="!initial" />
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Rôle</span>
        <select v-model="form.roleId" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
          <option v-for="r in catalog.roles" :key="r.id" :value="r.id">{{ r.nom }}</option>
        </select>
      </label>
      <label class="block">
        <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Département</span>
        <select v-model="form.departmentId" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
          <option value="">—</option>
          <option v-for="d in catalog.departments" :key="d.id" :value="d.id">{{ d.nom }}</option>
        </select>
      </label>
    </div>
    <label class="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
      <input v-model="form.statut" type="checkbox" true-value="actif" false-value="inactif" class="h-4 w-4 rounded accent-blue-600" />
      Compte actif
    </label>
    <div class="flex justify-end gap-3 pt-2">
      <BaseButton variant="secondary" type="button" @click="$emit('cancel')">Annuler</BaseButton>
      <BaseButton type="submit" :loading="saving">Enregistrer</BaseButton>
    </div>
  </form>
</template>
