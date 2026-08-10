<script setup lang="ts">
import { reactive, watch } from 'vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useUsersStore } from '@/stores/users'
import type { Department } from '@/types'

const props = defineProps<{ initial?: Department | null; saving?: boolean }>()
const emit = defineEmits<{ submit: [Omit<Department, 'id'>]; cancel: [] }>()

const users = useUsersStore()

const form = reactive({ nom: '', description: '', responsableId: '' as string })

watch(
  () => props.initial,
  (d) => {
    if (!d) return
    form.nom = d.nom
    form.description = d.description
    form.responsableId = d.responsableId ?? ''
  },
  { immediate: true },
)

function handleSubmit() {
  emit('submit', { nom: form.nom, description: form.description, responsableId: form.responsableId || null })
}
</script>

<template>
  <form class="space-y-4" @submit.prevent="handleSubmit">
    <BaseInput v-model="form.nom" label="Nom du département" required />
    <BaseInput v-model="form.description" label="Description" />
    <label class="block">
      <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Responsable (optionnel)</span>
      <select v-model="form.responsableId" class="field-input w-full rounded-lg px-3.5 py-2.5 text-sm">
        <option value="">—</option>
        <option v-for="u in users.items" :key="u.id" :value="u.id">{{ u.prenom }} {{ u.nom }}</option>
      </select>
    </label>
    <div class="flex justify-end gap-3 pt-2">
      <BaseButton variant="secondary" type="button" @click="$emit('cancel')">Annuler</BaseButton>
      <BaseButton type="submit" :loading="saving">Enregistrer</BaseButton>
    </div>
  </form>
</template>
