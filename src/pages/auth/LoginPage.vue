<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from '@/composables/useI18n'

const auth = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const email = ref('sana.bensalah@stagemanager.tn')
const password = ref('password')
const remember = ref(false)
const submitting = ref(false)
const error = ref('')

async function handleSubmit() {
  submitting.value = true
  error.value = ''
  const result = await auth.login(email.value.trim(), password.value)
  submitting.value = false
  if (result.ok) router.push('/dashboard')
  else error.value = result.error ?? 'Erreur de connexion.'
}
</script>

<template>
  <div class="w-full max-w-3xl overflow-hidden rounded-2xl shadow-xl">
    <div class="grid grid-cols-1 md:grid-cols-2">
      <!-- Colonne formulaire -->
      <div class="surface flex flex-col justify-center p-8 sm:p-10">
        <h1 class="mb-6 text-xl font-semibold text-slate-900 dark:text-white">{{ t('login.title') }}</h1>

        <form class="space-y-4" @submit.prevent="handleSubmit">
          <BaseInput v-model="email" type="email" :label="t('login.email')" autocomplete="username" required />
          <BaseInput v-model="password" type="password" :label="t('login.password')" autocomplete="current-password" required />

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <input v-model="remember" type="checkbox" class="h-4 w-4 rounded border-slate-300 accent-[var(--color-brand-600)]" />
              Se souvenir de moi
            </label>
            <a href="#" class="text-brand-600 hover:underline" @click.prevent>Mot de passe oublié ?</a>
          </div>

          <p v-if="error" class="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
            {{ error }}
          </p>

          <BaseButton type="submit" full-width :loading="submitting">{{ t('login.submit') }}</BaseButton>
        </form>

        <div class="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900">
          <p class="mb-1 font-medium text-slate-600 dark:text-slate-300">Comptes de démonstration (mot de passe : password)</p>
          <ul class="space-y-0.5">
            <li>Admin : sana.bensalah@stagemanager.tn</li>
            <li>Responsable Stage : mehdi.gharbi@stagemanager.tn</li>
            <li>Tuteur : ahmed.benali@stagemanager.tn</li>
            <li>Stagiaire : jean.dupont@stagemanager.tn</li>
          </ul>
        </div>
      </div>

      <!-- Colonne branding -->
      <div class="brand-panel relative hidden flex-col justify-center gap-6 p-10 text-white md:flex">
        <div class="flex items-center gap-3">
          <img src="/logo-axproo.png" alt="AXPROO" class="h-11 w-11 rounded-lg bg-white/95 p-1.5 shadow-sm" />
          <div>
            <p class="text-lg font-semibold leading-tight">StageManager</p>
            <p class="text-xs text-white/70">by AXPROO</p>
          </div>
        </div>

        <div>
          <h2 class="mb-2 text-2xl font-semibold leading-snug">Pilotez vos stages en toute simplicité</h2>
          <p class="text-sm text-white/80">Une plateforme unique pour vos équipes, adaptée automatiquement à chaque rôle.</p>
        </div>

        <ul class="space-y-3 text-sm text-white/90">
          <li class="flex items-center gap-2.5">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </span>
            Suivi des stagiaires en temps réel
          </li>
          <li class="flex items-center gap-2.5">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </span>
            Présences, tâches et notifications centralisées
          </li>
          <li class="flex items-center gap-2.5">
            <span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
            </span>
            Accès sécurisé selon votre rôle
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
