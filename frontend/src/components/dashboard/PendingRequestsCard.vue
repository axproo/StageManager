<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppConfirm from '@/components/ui/AppConfirm.vue'
import AppModal from '@/components/ui/AppModal.vue'
import { useStagiaireStore } from '@/stores/stagiaire.store'
import type { Stagiaire } from '@/types/stagiaire'

const stagiaireStore = useStagiaireStore()

// ----------------------
// Chargement
// ----------------------

onMounted(() => {
  stagiaireStore.loadStagiaires()
})

// ----------------------
// Modale détail
// ----------------------

const selectedStagiaire = ref<Stagiaire | null>(null)
const showDetailsModal = ref(false)

function viewDetails(id: number) {
  const stagiaire = stagiaireStore.pendingStagiaires.find((s) => s.id === id)

  if (!stagiaire) return

  selectedStagiaire.value = stagiaire
  showDetailsModal.value = true
}

// ----------------------
// Confirmation
// ----------------------

const showConfirmModal = ref(false)
const confirmTitle = ref('')
const confirmMessage = ref('')

const selectedAction = ref<'approve' | 'reject' | null>(null)
const selectedId = ref<number | null>(null)

function approve(id: number) {
  selectedId.value = id
  selectedAction.value = 'approve'

  confirmTitle.value = 'Accepter le stagiaire'
  confirmMessage.value = 'Voulez-vous vraiment accepter cette demande de stage ?'

  showConfirmModal.value = true
}

function reject(id: number) {
  selectedId.value = id
  selectedAction.value = 'reject'

  confirmTitle.value = 'Refuser le stagiaire'
  confirmMessage.value = 'Voulez-vous vraiment refuser cette demande de stage ?'

  showConfirmModal.value = true
}

function confirmAction() {
  if (selectedId.value === null) return

  if (selectedAction.value === 'approve') {
    stagiaireStore.approveStagiaire(selectedId.value)
  }

  if (selectedAction.value === 'reject') {
    stagiaireStore.rejectStagiaire(selectedId.value)
  }

  selectedId.value = null
  selectedAction.value = null
}
</script>

<template>
  <div class="bg-white rounded-2xl shadow-lg p-6">
    <!-- Header -->

    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Validation des nouvelles inscriptions</h2>

        <p class="text-gray-500 text-sm mt-1">Gérez les demandes des nouveaux stagiaires.</p>
      </div>

      <span
        v-if="stagiaireStore.pendingCount"
        class="bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold"
      >
        {{ stagiaireStore.pendingCount }} demande(s)
      </span>
    </div>

    <!-- Aucune demande -->

    <div v-if="stagiaireStore.pendingCount === 0" class="py-16 text-center text-gray-500">
      <div class="text-6xl mb-4">📭</div>

      <h3 class="text-lg font-semibold">Aucune demande en attente</h3>

      <p class="text-sm mt-2">Tous les stagiaires ont été traités.</p>
    </div>

    <!-- Liste -->

    <div
      v-for="stagiaire in stagiaireStore.pendingStagiaires"
      :key="stagiaire.id"
      class="border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition p-6 mb-6"
    >
      <div class="flex flex-col lg:flex-row justify-between gap-6">
        <!-- Informations -->

        <div class="flex-1">
          <div class="flex items-center gap-3 mb-4">
            <div
              class="w-14 h-14 rounded-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xl"
            >
              {{ stagiaire.nom.charAt(0).toUpperCase() }}
            </div>

            <div>
              <h3 class="text-xl font-bold text-gray-800">
                {{ stagiaire.nom }}
                {{ stagiaire.prenom }}
              </h3>

              <p class="text-sm text-gray-500">Nouvelle candidature</p>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-3 text-sm">
            <p>
              <strong>📧 Email :</strong>
              {{ stagiaire.email }}
            </p>

            <p>
              <strong>📞 Téléphone :</strong>
              {{ stagiaire.telephone }}
            </p>

            <p>
              <strong>🎓 Formation :</strong>
              {{ stagiaire.formation }}
            </p>

            <p>
              <strong>🏢 Département :</strong>
              {{ stagiaire.departement }}
            </p>

            <p v-if="stagiaire.universite">
              <strong>🏫 Université :</strong>
              {{ stagiaire.universite }}
            </p>

            <p v-if="stagiaire.dateDebut && stagiaire.dateFin">
              <strong>📅 Stage :</strong>
              {{ stagiaire.dateDebut }}
              →
              {{ stagiaire.dateFin }}
            </p>
          </div>

          <p class="mt-4 text-xs text-gray-400">
            Demande envoyée le
            {{ new Date(stagiaire.createdAt).toLocaleDateString('fr-FR') }}
          </p>
        </div>

        <!-- Statut -->

        <div class="flex flex-col items-end justify-between">
          <span class="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-semibold">
            🟡 En attente
          </span>
        </div>
      </div>

      <!-- Actions -->

      <div class="flex flex-wrap gap-3 mt-6">
        <button
          class="px-5 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
          @click="viewDetails(stagiaire.id)"
        >
          👁️ Voir dossier
        </button>

        <button
          class="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          @click="approve(stagiaire.id)"
        >
          ✅ Accepter
        </button>

        <button
          class="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
          @click="reject(stagiaire.id)"
        >
          ❌ Refuser
        </button>
      </div>
    </div>
  </div>

  <!-- Modale détail -->

  <AppModal v-model="showDetailsModal" title="Dossier du stagiaire" width="max-w-3xl">
    <div v-if="selectedStagiaire" class="grid md:grid-cols-2 gap-4 text-sm">
      <p><strong>Nom :</strong> {{ selectedStagiaire.nom }}</p>

      <p><strong>Prénom :</strong> {{ selectedStagiaire.prenom }}</p>

      <p><strong>Email :</strong> {{ selectedStagiaire.email }}</p>

      <p><strong>Téléphone :</strong> {{ selectedStagiaire.telephone }}</p>

      <p><strong>Université :</strong> {{ selectedStagiaire.universite }}</p>

      <p><strong>Formation :</strong> {{ selectedStagiaire.formation }}</p>

      <p><strong>Département :</strong> {{ selectedStagiaire.departement }}</p>

      <p><strong>Date début :</strong> {{ selectedStagiaire.dateDebut }}</p>

      <p><strong>Date fin :</strong> {{ selectedStagiaire.dateFin }}</p>

      <p class="md:col-span-2">
        <strong>Date de création :</strong>

        {{ new Date(selectedStagiaire.createdAt).toLocaleString('fr-FR') }}
      </p>
    </div>
  </AppModal>

  <!-- Confirmation -->

  <AppConfirm
    v-model="showConfirmModal"
    :title="confirmTitle"
    :message="confirmMessage"
    confirm-text="Confirmer"
    cancel-text="Annuler"
    @confirm="confirmAction"
  />
</template>
