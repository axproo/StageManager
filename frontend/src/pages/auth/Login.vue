<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.store'

import { AppAlert } from '@/components/ui'

import LoginForm from '@/components/forms/LoginForm.vue'

const router = useRouter()

const authStore = useAuthStore()

const errorMessage = ref('')

function login(data: { email: string; password: string }) {
  errorMessage.value = ''

  const users = [
    {
      id: 1,
      name: 'Administrateur',
      email: 'admin@axproo.com',
      password: '123456',
      role: 'ADMIN' as const,
    },

    {
      id: 2,
      name: 'Responsable RH',
      email: 'rh@axproo.com',
      password: '123456',
      role: 'RESPONSABLE RH' as const,
    },

    {
      id: 3,
      name: 'Encadrant',
      email: 'encadrant@axproo.com',
      password: '123456',
      role: 'ENCADRANT' as const,
    },

    {
      id: 4,
      name: 'Stagiaire',
      email: 'stagiaire@axproo.com',
      password: '123456',
      role: 'STAGIAIRE' as const,
    },
  ]

  const user = users.find((u) => u.email === data.email && u.password === data.password)

  if (!user) {
    errorMessage.value = 'Email ou mot de passe incorrect.'

    return
  }

  authStore.login(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },

    'axproo-token'
  )

  const profileCompleted = localStorage.getItem('profileCompleted')

  if (user.role === 'STAGIAIRE' && !profileCompleted) {
    router.push('/complete-profile')
  } else {
    router.push('/dashboard')
  }
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-800 flex items-center justify-center px-6 py-10"
  >
    <!-- Carte Glass -->

    <div
      class="w-full max-w-md bg-cyan-900/20 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-cyan-300/30 p-10"
    >
      <!-- Logo AXPROO -->

      <div class="flex justify-center mb-6">
        <div
          class="w-28 h-28 rounded-full flex items-center justify-center border-4 border-cyan-300 bg-white/10 shadow-lg overflow-hidden"
        >
          <img src="/axproo-logo.jpeg" alt="AXPROO" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Titre -->

      <h1 class="text-3xl font-extrabold tracking-wide text-center mb-3">
        <span class="text-cyan-300"> Connexion </span>

        <span class="text-white"> AXPROO </span>
      </h1>

      <!-- Description -->

      <p class="text-center text-white/70 mb-8">
        Bienvenue dans votre espace de gestion des stagiaires
      </p>

      <!-- Message erreur -->

      <AppAlert v-if="errorMessage" type="error" :text="errorMessage" />

      <!-- Formulaire -->

      <LoginForm @submit="login" />

      <!-- Retour accueil -->

      <div class="text-center mt-8">
        <RouterLink to="/" class="text-cyan-300 hover:text-cyan-200 transition">
          ← Retour à l'accueil
        </RouterLink>
      </div>
    </div>
  </div>
</template>
