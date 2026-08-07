<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStagiaireStore } from '@/stores/stagiaire.store'

const router = useRouter()
const stagiaireStore = useStagiaireStore()

onMounted(() => {
  stagiaireStore.loadStagiaires()
})

// Afficher seulement les demandes en attente
// Limitées aux 3 dernières

const recentRequests = computed(() => {
  return stagiaireStore.pendingStagiaires.slice().reverse().slice(0, 3)
})

function goToRequests() {
  router.push('/stagiaires/demandes')
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <!-- HEADER -->

    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-xl font-bold text-gray-800">Nouvelles demandes</h2>

        <p class="text-gray-500 text-sm mt-1">Demandes de stage en attente</p>
      </div>

      <span class="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold">
        {{ stagiaireStore.pendingCount }}
      </span>
    </div>

    <!-- VIDE -->

    <div v-if="recentRequests.length === 0" class="text-center py-8 text-gray-500">
      📄

      <p class="mt-3">Aucune nouvelle demande</p>
    </div>

    <!-- LISTE -->

    <div v-else class="space-y-4">
      <div
        v-for="stagiaire in recentRequests"
        :key="stagiaire.id"
        class="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
      >
        <div class="flex items-center gap-4">
          <div
            class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold"
          >
            {{ stagiaire.nom.charAt(0) }}
          </div>

          <div>
            <h3 class="font-semibold text-gray-800">
              {{ stagiaire.nom }}
              {{ stagiaire.prenom }}
            </h3>

            <p class="text-sm text-gray-500">
              {{ stagiaire.formation }}
            </p>

            <p class="text-xs text-gray-400">
              {{ stagiaire.createdAt }}
            </p>
          </div>
        </div>

        <span class="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
          En attente
        </span>
      </div>
    </div>

    <!-- FOOTER -->

    <button
      @click="goToRequests"
      class="mt-6 w-full py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      Voir toutes les demandes →
    </button>
  </div>
</template>
