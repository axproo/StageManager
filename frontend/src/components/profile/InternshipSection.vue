<script setup lang="ts">
import { AppInput, AppSelect } from '@/components/ui'
import type { ProfileFormData } from '@/types/profile'

const props = defineProps<{
  form: ProfileFormData

  errors: Record<string, string>

  isValid: (field: keyof ProfileFormData) => boolean
}>()

const emit = defineEmits<{
  dateError: [message: string]
}>()

// ----------------------------
// Types de stage
// ----------------------------

const typesStage = [
  {
    label: 'Stage d’été',
    value: 'ete',
  },

  {
    label: 'Stage PFE',
    value: 'pfe',
  },

  {
    label: 'Stage ouvrier',
    value: 'ouvrier',
  },

  {
    label: 'Stage technicien',
    value: 'technicien',
  },
]

// ----------------------------
// Vérification période stage
// ----------------------------

function checkDatePeriod() {
  if (!props.form.dateDebut || !props.form.dateFin) {
    emit('dateError', '')
    return
  }

  const debut = new Date(props.form.dateDebut)

  const fin = new Date(props.form.dateFin)

  if (fin <= debut) {
    emit('dateError', 'La date de fin doit être après la date de début')
  } else {
    emit('dateError', '')
  }
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 space-y-5">
    <h2 class="text-xl font-bold text-gray-800">💼 Informations du stage</h2>

    <!-- Type stage -->

    <AppSelect
      v-model="form.typeStage"
      label="Type de stage"
      placeholder="Choisir un type de stage"
      :options="typesStage"
      :error="!!errors.typeStage"
      :success="isValid('typeStage')"
      :error-message="errors.typeStage"
    />

    <div class="grid md:grid-cols-2 gap-5">
      <!-- Date début -->

      <AppInput
        v-model="form.dateDebut"
        label="Date de début"
        type="date"
        :error="!!errors.dateDebut"
        :success="isValid('dateDebut')"
        :error-message="errors.dateDebut"
        @change="checkDatePeriod"
      />

      <!-- Date fin -->

      <AppInput
        v-model="form.dateFin"
        label="Date de fin"
        type="date"
        :error="!!errors.dateFin"
        :success="isValid('dateFin')"
        :error-message="errors.dateFin"
        @change="checkDatePeriod"
      />
    </div>
  </div>
</template>
