<script setup lang="ts">
import { ref } from 'vue'
import EmailForm from '@/components/forms/EmailForm.vue'
import { useCheckAccount } from '@/composables/useCheckAccount'

const email = ref('')
const { checkAccount } = useCheckAccount()
const continueHandler = async () => {
  await checkAccount(email.value)
}
</script>
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-900 via-blue-900 to-blue-700 px-4"
  >
    <EmailForm
      v-model="email"
      title="Bienvenue"
      description="Entrez votre adresse email pour continuer."
      button-text="Continuer"
      @submit="continueHandler"
    />
  </div>
</template>
