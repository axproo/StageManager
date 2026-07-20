<template>
  <header class="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg text-white">
    <nav class="flex justify-between items-center px-6 md:px-10 py-4">
      <a
        href="/"
        class="text-2xl font-bold text-cyan-300 flex-shrink-0 cursor-pointer"
        @click.prevent="goHome"
      >
        AXPROO
      </a>
      <div class="flex items-center space-x-8 text-lg">
        <a href="/" class="hover:text-cyan-300 transition cursor-pointer" @click.prevent="goHome">
          Accueil
        </a>
        <a href="#fonctionnalites" class="hover:text-cyan-300 transition"> Fonctionnalités </a>
        <RouterLink to="/login" class="hover:text-cyan-300 transition"> Connexion </RouterLink>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

function goHome() {
  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    router.push('/').then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
}
</script>
