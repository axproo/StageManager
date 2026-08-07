<script setup lang="ts">
import { AppInput } from '@/components/ui'
import type { ProfileFormData } from '@/types/profile'

const props = defineProps<{
  form: ProfileFormData

  errors: Record<string, string>

  isValid: (field: keyof ProfileFormData) => boolean
}>()

// ----------------------------
// Nettoyage des champs
// ----------------------------

function onlyLetters(field: 'nom' | 'prenom') {
  props.form[field] = props.form[field].replace(/[^a-zA-ZÀ-ÿ\s]/g, '')
}

function onlyNumbers() {
  props.form.telephone = props.form.telephone.replace(/\D/g, '')
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 space-y-5">
    <h2 class="text-xl font-bold text-gray-800">👤 Informations personnelles</h2>

    <div class="grid md:grid-cols-2 gap-5">
      <!-- Nom -->

      <AppInput
        v-model="form.nom"
        label="Nom"
        placeholder="Votre nom"
        :error="!!errors.nom"
        :success="isValid('nom')"
        :error-message="errors.nom"
        @input="onlyLetters('nom')"
      />

      <!-- Prénom -->

      <AppInput
        v-model="form.prenom"
        label="Prénom"
        placeholder="Votre prénom"
        :error="!!errors.prenom"
        :success="isValid('prenom')"
        :error-message="errors.prenom"
        @input="onlyLetters('prenom')"
      />

      <!-- Email -->

      <AppInput
        v-model="form.email"
        label="Email"
        type="email"
        placeholder="exemple@email.com"
        :error="!!errors.email"
        :success="isValid('email')"
        :error-message="errors.email"
      />

      <!-- Téléphone -->

      <AppInput
        v-model="form.telephone"
        label="Téléphone"
        type="tel"
        placeholder="Votre numéro"
        :error="!!errors.telephone"
        :success="isValid('telephone')"
        :error-message="errors.telephone"
        @input="onlyNumbers"
      />

      <!-- Date de naissance -->

      <AppInput
        v-model="form.dateNaissance"
        label="Date de naissance"
        type="date"
        :error="!!errors.dateNaissance"
        :success="isValid('dateNaissance')"
        :error-message="errors.dateNaissance"
      />
    </div>

    <!-- Adresse -->

    <AppInput
      v-model="form.adresse"
      label="Adresse"
      placeholder="Votre adresse"
      :error="!!errors.adresse"
      :success="isValid('adresse')"
      :error-message="errors.adresse"
    />
  </div>
</template>
