<script setup lang="ts">
import { AppInput } from '@/components/ui'
import type { ProfileFormData } from '@/types/profile'

defineProps<{
  form: ProfileFormData

  errors: Record<string, string>

  isValid: (field: keyof ProfileFormData) => boolean
}>()
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6 space-y-5">
    <h2 class="text-xl font-bold text-gray-800">🔐 Informations du compte</h2>

    <div class="grid md:grid-cols-2 gap-5">
      <!-- Mot de passe -->

      <AppInput
        v-model="form.password"
        label="Mot de passe"
        type="password"
        placeholder="Créer un mot de passe"
        :error="!!errors.password"
        :success="isValid('password')"
        :error-message="errors.password"
      />

      <!-- Confirmation -->

      <AppInput
        v-model="form.confirmPassword"
        label="Confirmer le mot de passe"
        type="password"
        placeholder="Confirmer le mot de passe"
        :error="!!errors.confirmPassword"
        :success="isValid('confirmPassword')"
        :error-message="errors.confirmPassword"
      />
    </div>

    <p class="text-sm text-gray-500">Le mot de passe doit contenir au minimum 6 caractères.</p>
  </div>
</template>
