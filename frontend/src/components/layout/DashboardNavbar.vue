<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg text-white">
    <nav class="flex justify-between items-center px-6 md:px-10 py-4">
      <!-- Logo à gauche -->
      <a href="/" class="text-2xl font-bold text-cyan-300 flex-shrink-0"> AXPROO </a>

      <!-- Menu à droite -->
      <div class="flex items-center space-x-8 text-lg">
        <RouterLink to="/dashboard" class="hover:text-cyan-300 transition"> Dashboard </RouterLink>

        <RouterLink to="/users" class="hover:text-cyan-300 transition"> Users </RouterLink>

        <RouterLink to="/settings" class="hover:text-cyan-300 transition"> Settings </RouterLink>

        <button class="hover:text-cyan-300 transition cursor-pointer" @click="handleLogout">
          Déconnexion
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function handleLogout() {
  localStorage.removeItem('token')
  router.push('/login').then(() => {
    window.location.reload()
  })
}
</script>
