<script setup lang="ts">
import { AppFileUpload } from '@/components/ui'
import type { ProfileFormData } from '@/types/profile'

const props = defineProps<{
  form: ProfileFormData

  errors: Record<string, string>

  isValid: (field: keyof ProfileFormData) => boolean
}>()

// ----------------------------
// Gestion des fichiers
// ----------------------------

function setPhoto(file: File | null) {
  props.form.photo = file
}

function setCv(file: File | null) {
  props.form.cv = file
}

function setLetter(file: File | null) {
  props.form.lettreMotivation = file
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 space-y-5">
    <h2 class="text-xl font-bold text-gray-800">📄 Documents du stagiaire</h2>

    <div class="grid md:grid-cols-2 gap-5">
      <!-- CV -->

      <AppFileUpload label="CV (PDF)" accept=".pdf" @change="setCv" />

      <!-- Lettre motivation -->

      <AppFileUpload label="Lettre de motivation (PDF)" accept=".pdf" @change="setLetter" />
    </div>

    <!-- Photo -->

    <AppFileUpload label="Photo de profil" accept="image/*" @change="setPhoto" />
  </div>
</template>
