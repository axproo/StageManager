<script setup lang="ts">
import { AppButton } from '@/components/ui'
import PersonalSection from '@/components/profile/PersonalSection.vue'
import AcademicSection from '@/components/profile/AcademicSection.vue'
import InternshipSection from '@/components/profile/InternshipSection.vue'
import DocumentsSection from '@/components/profile/DocumentsSection.vue'
import AccountSection from '@/components/profile/AccountSection.vue'
import { useProfileForm } from '@/composables/useProfileForm'
import type { ProfileFormData } from '@/types/profile'

const emit = defineEmits<{
  submit: [data: ProfileFormData]
}>()

function handleSubmit(data: ProfileFormData) {
  emit('submit', data)
}

const { form, errors, isFormValid, isValid, submitForm } = useProfileForm(handleSubmit)
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-6">
    <!-- Informations personnelles -->

    <PersonalSection :form="form" :errors="errors" :is-valid="isValid" />

    <!-- Informations académiques -->

    <AcademicSection :form="form" :errors="errors" :is-valid="isValid" />

    <!-- Informations stage -->

    <InternshipSection
      :form="form"
      :errors="errors"
      :is-valid="isValid"
      @date-error="errors.dateFin = $event"
    />

    <!-- Documents -->

    <DocumentsSection :form="form" :errors="errors" :is-valid="isValid" />

    <!-- Informations compte -->

    <AccountSection :form="form" :errors="errors" :is-valid="isValid" />

    <!-- Validation -->

    <AppButton
      type="submit"
      :disabled="!isFormValid"
      class="w-full bg-cyan-600 hover:bg-cyan-700 py-3 rounded-xl font-bold text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Enregistrer mon profil
    </AppButton>
  </form>
</template>
