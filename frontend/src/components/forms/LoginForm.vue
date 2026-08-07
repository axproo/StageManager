<script setup lang="ts">
import { computed, ref } from 'vue'
import { AppButton, AppInput } from '@/components/ui'
import type { LoginCredentials } from '@/types/auth'

const form = ref<LoginCredentials>({
  email: '',
  password: '',
})

const emit = defineEmits<{
  submit: [data: LoginCredentials]
}>()

const isValid = computed(() => {
  return form.value.email.trim() !== '' && form.value.password.trim() !== ''
})

function submitForm() {
  emit('submit', {
    ...form.value,
  })
}
</script>

<template>
  <form class="space-y-6" @submit.prevent="submitForm">
    <AppInput
      v-model="form.email"
      label="Email"
      type="email"
      placeholder="Votre email"
      variant="glass"
      required
    />

    <AppInput
      v-model="form.password"
      label="Mot de passe"
      type="password"
      placeholder="********"
      variant="glass"
      required
    />

    <AppButton
      type="submit"
      class="w-full bg-emerald-500 hover:bg-emerald-600 py-4 rounded-xl text-xl font-bold transition shadow-lg"
      :disabled="!isValid"
    >
      🔐 Se connecter
    </AppButton>
  </form>
</template>
