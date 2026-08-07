<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import { useStagiaireStore } from '@/stores/stagiaire.store'

const router = useRouter()
const authStore = useAuthStore()
const stagiaireStore = useStagiaireStore()

if (authStore.role !== 'ADMIN') {
  router.push('/dashboard')
}

const activeTab = ref<'ACTIVE' | 'REFUSED' | 'PENDING'>('ACTIVE')

onMounted(() => {
  stagiaireStore.loadStagiaires()
})

// Filtrer selon l'onglet

const displayedStagiaires = computed(() => {
  return stagiaireStore.stagiaires.filter((stagiaire) => stagiaire.status === activeTab.value)
})
</script>

<template>
  <div v-if="authStore.role === 'ADMIN'" class="min-h-screen bg-gray-100 p-8">
    <!-- HEADER -->

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Gestion des stagiaires</h1>

      <p class="text-gray-500 mt-2">Liste des stagiaires selon leur statut</p>
    </div>

    <!-- TABS -->

    <div class="flex gap-4 mb-8">
      <button
        @click="activeTab = 'ACTIVE'"
        class="px-5 py-3 rounded-xl"
        :class="activeTab === 'ACTIVE' ? 'bg-green-600 text-white' : 'bg-white text-gray-700'"
      >
        ✅ Acceptés

        <span> ({{ stagiaireStore.activeCount }}) </span>
      </button>

      <button
        @click="activeTab = 'PENDING'"
        class="px-5 py-3 rounded-xl"
        :class="activeTab === 'PENDING' ? 'bg-yellow-500 text-white' : 'bg-white text-gray-700'"
      >
        ⏳ En attente

        <span> ({{ stagiaireStore.pendingCount }}) </span>
      </button>

      <button
        @click="activeTab = 'REFUSED'"
        class="px-5 py-3 rounded-xl"
        :class="activeTab === 'REFUSED' ? 'bg-red-600 text-white' : 'bg-white text-gray-700'"
      >
        ❌ Refusés

        <span> ({{ stagiaireStore.refusedCount }}) </span>
      </button>
    </div>

    <!-- LISTE VIDE -->

    <div
      v-if="displayedStagiaires.length === 0"
      class="bg-white rounded-2xl shadow p-10 text-center"
    >
      <div class="text-5xl">📄</div>

      <h2 class="text-xl font-semibold mt-4">Aucun stagiaire trouvé</h2>
    </div>

    <!-- TABLE -->

    <div v-else class="bg-white rounded-2xl shadow overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="p-4 text-left">Nom</th>

            <th class="p-4 text-left">Email</th>

            <th class="p-4 text-left">Formation</th>

            <th class="p-4 text-left">Département</th>

            <th class="p-4 text-left">Statut</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="stagiaire in displayedStagiaires" :key="stagiaire.id" class="border-t">
            <td class="p-4 font-semibold">
              {{ stagiaire.nom }}

              {{ stagiaire.prenom }}
            </td>

            <td class="p-4">
              {{ stagiaire.email }}
            </td>

            <td class="p-4">
              {{ stagiaire.formation }}
            </td>

            <td class="p-4">
              {{ stagiaire.departement }}
            </td>

            <td class="p-4">
              <span
                v-if="stagiaire.status === 'ACTIVE'"
                class="px-3 py-1 rounded-full bg-green-100 text-green-700"
              >
                Accepté
              </span>

              <span
                v-else-if="stagiaire.status === 'REFUSED'"
                class="px-3 py-1 rounded-full bg-red-100 text-red-700"
              >
                Refusé
              </span>

              <span v-else class="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700">
                En attente
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div v-else class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white rounded-2xl shadow p-8 text-center">
      <h2 class="text-2xl font-bold text-red-600">Accès refusé</h2>

      <p class="text-gray-500 mt-2">Vous n'avez pas l'autorisation d'accéder à cette page.</p>
    </div>
  </div>
</template>
