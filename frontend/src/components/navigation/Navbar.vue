<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import logoAxproo from "@/assets/Axproologo.png";

const router = useRouter();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

function goToLogin() {
  router.push("/login");
  isMobileMenuOpen.value = false;
}

function goToInternship() {
  router.push("/demande-stage");
  isMobileMenuOpen.value = false;
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <nav
    class="fixed top-0 w-full z-50 transition-all duration-300"
    :class="isScrolled
      ? 'bg-white/90 backdrop-blur-md shadow-md py-3'
      : 'bg-white/70 backdrop-blur-sm py-5'"
  >
    <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">
      <!-- Logo + nom produit -->
      <router-link
        to="/"
        class="flex items-center gap-3 transition-transform duration-300 hover:scale-105"
      >
        <img
  :src="logoAxproo"
  alt="AXPROO"
  class="h-10 w-10 rounded-full object-cover border border-gray-100 shadow-sm"
/>
        <div class="flex flex-col leading-none border-l border-gray-200 pl-3">
          <span class="text-xl font-bold text-blue-600">StageManager</span>
          <span class="text-[11px] font-medium text-gray-400 tracking-wide">
            Gestion des stagiaires
          </span>
        </div>
      </router-link>

      <!-- Menu desktop -->
      <div class="hidden md:flex items-center gap-8 text-gray-700 font-medium">
        <router-link to="/" class="relative group py-1">
          Accueil
          <span class="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </router-link>

        <a href="#departements" class="relative group py-1">
          Départements
          <span class="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>

        <a href="#about" class="relative group py-1">
          À propos
          <span class="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>

        <a href="#contact" class="relative group py-1">
          Contact
          <span class="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      <!-- Actions desktop -->
      <div class="hidden md:flex gap-3">
        <button
          @click="goToInternship"
          class="bg-blue-600 text-white px-5 py-2 rounded-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-300 hover:-translate-y-0.5"
        >
          Demande de stage
        </button>

        <button
          @click="goToLogin"
          class="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg transition-all duration-300 hover:bg-blue-50 hover:-translate-y-0.5"
        >
          Connexion
        </button>
      </div>

      <!-- Burger mobile -->
      <button
        class="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <span class="w-6 h-0.5 bg-blue-600 transition-all duration-300" :class="isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''"></span>
        <span class="w-6 h-0.5 bg-blue-600 transition-all duration-300" :class="isMobileMenuOpen ? 'opacity-0' : 'opacity-100'"></span>
        <span class="w-6 h-0.5 bg-blue-600 transition-all duration-300" :class="isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''"></span>
      </button>
    </div>

    <!-- Menu mobile -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="md:hidden bg-white shadow-lg px-6 py-4 flex flex-col gap-4">
        <router-link to="/" @click="isMobileMenuOpen = false">Accueil</router-link>
        <a href="#departements" @click="isMobileMenuOpen = false">Départements</a>
        <a href="#about" @click="isMobileMenuOpen = false">À propos</a>
        <a href="#contact" @click="isMobileMenuOpen = false">Contact</a>

        <button @click="goToInternship" class="bg-blue-600 text-white px-5 py-2 rounded-lg w-full">
          Demande de stage
        </button>
        <button @click="goToLogin" class="border border-blue-600 text-blue-600 px-5 py-2 rounded-lg w-full">
          Connexion
        </button>
      </div>
    </Transition>
  </nav>
</template>