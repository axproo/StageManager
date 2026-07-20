<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-blue-900 to-cyan-700 px-6"
  >
    <div
      class="bg-white/10 backdrop-blur-lg rounded-3xl p-10 shadow-2xl border border-white/20 w-full max-w-md text-white"
    >
      <h1 class="text-3xl font-bold text-cyan-300 text-center mb-8">Connexion</h1>

      <form class="space-y-5" @submit.prevent="handleLogin">
        <div>
          <label class="block mb-1 text-sm">Email</label>
          <input
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="votre@email.com"
          />
        </div>

        <div>
          <label class="block mb-1 text-sm">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-300"
            placeholder="••••••••"
          />
        </div>

        <p v-if="errorMessage" class="text-red-400 text-sm text-center">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="w-full mt-4 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-lg shadow-xl hover:scale-105 transition duration-300"
        >
          Se connecter
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')
const errorMessage = ref('')

function handleLogin() {
  // ⚠️ Ici, remplacez par votre vrai appel API (axios/fetch vers votre backend)
  // Exemple temporaire pour tester le flux :
  if (email.value && password.value) {
    localStorage.setItem('token', 'fake-token-de-test')
    router.push('/dashboard').then(() => {
      window.location.reload()
    })
  } else {
    errorMessage.value = 'Veuillez remplir tous les champs.'
  }
}
</script>
