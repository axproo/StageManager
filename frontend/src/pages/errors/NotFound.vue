<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goHome() {
  router.push("/");
}
</script>
<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white p-10 rounded-xl shadow text-center">
      <h1 class="text-6xl font-bold text-red-600">404</h1>

      <h2 class="text-2xl font-bold mt-4">Page introuvable</h2>

      <p class="text-gray-600 mt-3">La page demandée n'existe pas.</p>

      <button
        @click="goHome"
        class="mt-6 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Retour accueil
      </button>
    </div>
  </div>
</template>
