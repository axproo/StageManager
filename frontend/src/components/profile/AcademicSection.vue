<script setup lang="ts">
import { AppInput, AppSelect } from '@/components/ui'
import type { ProfileFormData } from '@/types/profile'

defineProps<{
  form: ProfileFormData

  errors: Record<string, string>

  isValid: (field: keyof ProfileFormData) => boolean
}>()

// ----------------------------
// Options formation
// ----------------------------

const formations = [
  {
    label: 'Informatique',
    value: 'informatique',
  },

  {
    label: 'Réseaux',
    value: 'reseaux',
  },

  {
    label: 'Cybersécurité',
    value: 'cybersecurite',
  },

  {
    label: 'Développement Web',
    value: 'developpement',
  },
]

// ----------------------------
// Options département
// ----------------------------

const departements = [
  {
    label: 'Développement',
    value: 'dev',
  },

  {
    label: 'Sécurité',
    value: 'security',
  },

  {
    label: 'Réseaux',
    value: 'network',
  },
]
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 space-y-5">
    <h2 class="text-xl font-bold text-gray-800">🎓 Informations académiques</h2>

    <div class="grid md:grid-cols-2 gap-5">
      <!-- Université -->

      <AppInput
        v-model="form.universite"
        label="Université"
        placeholder="Votre université"
        :error="!!errors.universite"
        :success="isValid('universite')"
        :error-message="errors.universite"
      />

      <!-- Formation -->

      <AppSelect
        v-model="form.formation"
        label="Formation"
        placeholder="Choisir une formation"
        :options="formations"
        :error="!!errors.formation"
        :success="isValid('formation')"
        :error-message="errors.formation"
      />
    </div>

    <!-- Département -->

    <AppSelect
      v-model="form.departement"
      label="Département"
      placeholder="Choisir un département"
      :options="departements"
      :error="!!errors.departement"
      :success="isValid('departement')"
      :error-message="errors.departement"
    />
  </div>
</template>
