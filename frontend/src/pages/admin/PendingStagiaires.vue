<script setup lang="ts">
import { onMounted, ref } from 'vue'

import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppModal from '@/components/ui/AppModal.vue'
import AppToast from '@/components/ui/AppToast.vue'
import { useStagiaireStore } from '@/stores/stagiaire.store'

const stagiaireStore = useStagiaireStore()

// Modal détails
const showDetails = ref(false)

const selectedStagiaire = ref<any>(null)

// Modal confirmation
const showConfirm = ref(false)

const confirmAction = ref<'approve' | 'reject' | null>(null)

const stagiaireToConfirm = ref<any>(null)
const showToast = ref(false)

const toastType = ref('success')

const toastMessage = ref('')

onMounted(() => {
  stagiaireStore.loadStagiaires()
})

function refresh() {
  stagiaireStore.loadStagiaires()
}

function openDetails(stagiaire: any) {
  selectedStagiaire.value = stagiaire

  showDetails.value = true
}

function openConfirm(stagiaire: any, action: 'approve' | 'reject') {
  stagiaireToConfirm.value = stagiaire

  confirmAction.value = action

  showConfirm.value = true
}

function executeConfirm() {

  if (!stagiaireToConfirm.value) return


  if (confirmAction.value === 'approve') {

    stagiaireStore.approveStagiaire(
      stagiaireToConfirm.value.id
    )


    toastType.value = 'success'

    toastMessage.value =
      'Demande acceptée avec succès'


  }



  if (confirmAction.value === 'reject') {

    stagiaireStore.rejectStagiaire(
      stagiaireToConfirm.value.id
    )


    toastType.value = 'error'

    toastMessage.value =
      'Demande refusée avec succès'

  }



  showConfirm.value = false


  showDetails.value = false


  showToast.value = true



  setTimeout(() => {

    showToast.value = false

  }, 3000)



  stagiaireToConfirm.value = null

  confirmAction.value = null

}

function cancelConfirm() {
  showConfirm.value = false

  stagiaireToConfirm.value = null

  confirmAction.value = null
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- HEADER -->

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Demandes des stagiaires</h1>

      <p class="mt-2 text-gray-500">Validation des nouvelles inscriptions</p>
    </div>

    <!-- STATISTIQUES -->

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <!-- EN ATTENTE -->

      <div class="bg-white rounded-2xl shadow-md p-6 border-l-4 border-yellow-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">En attente</p>

            <h2 class="text-3xl font-bold text-yellow-600 mt-2">
              {{ stagiaireStore.pendingCount }}
            </h2>
          </div>

          <div
            class="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-2xl"
          >
            ⏳
          </div>
        </div>
      </div>

      <!-- ACCEPTEES -->

      <div class="bg-white rounded-2xl shadow-md p-6 border-l-4 border-green-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">Acceptées</p>

            <h2 class="text-3xl font-bold text-green-600 mt-2">
              {{ stagiaireStore.activeCount }}
            </h2>
          </div>

          <div
            class="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl"
          >
            ✅
          </div>
        </div>
      </div>

      <!-- REFUSEES -->

      <div class="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500">
        <div class="flex justify-between items-center">
          <div>
            <p class="text-gray-500 text-sm">Refusées</p>

            <h2 class="text-3xl font-bold text-red-600 mt-2">
              {{ stagiaireStore.refusedCount }}
            </h2>
          </div>

          <div class="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl">
            ❌
          </div>
        </div>
      </div>
    </div>

    <!-- RECHERCHE -->

    <div class="bg-white rounded-2xl shadow p-5 mb-6">
      <AppInput
        v-model="stagiaireStore.search"
        label="Recherche"
        placeholder="Nom, prénom, email, formation..."
      />
    </div>

    <!-- ACTIONS -->

    <div class="flex justify-between items-center mb-6">
      <p class="text-sm text-gray-500">
        {{ stagiaireStore.filteredPendingStagiaires.length }}

        demande(s) affichée(s)
      </p>

      <AppButton @click="refresh"> Actualiser </AppButton>
    </div>
    <!-- ETAT VIDE -->

    <div
      v-if="stagiaireStore.filteredPendingStagiaires.length === 0"
      class="bg-white rounded-2xl shadow-lg py-16 text-center"
    >
      <div class="text-6xl">📄</div>

      <h2 class="mt-5 text-2xl font-semibold text-gray-700">Aucune demande trouvée</h2>

      <p class="mt-2 text-gray-500">Essayez un autre mot-clé ou attendez de nouvelles demandes.</p>
    </div>

    <!-- LISTE -->

    <div v-else class="space-y-6">
      <div
        v-for="stagiaire in stagiaireStore.filteredPendingStagiaires"
        :key="stagiaire.id"
        class="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition duration-300"
      >
        <div class="p-6">
          <!-- ENTETE -->

          <div class="flex justify-between items-start">
            <div class="flex items-center gap-4">
              <!-- AVATAR -->

              <div
                class="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600"
              >
                {{ stagiaire.nom.charAt(0) }}
                {{ stagiaire.prenom.charAt(0) }}
              </div>

              <div>
                <h2 class="text-xl font-bold text-gray-800">
                  {{ stagiaire.nom }}

                  {{ stagiaire.prenom }}
                </h2>

                <p class="text-gray-500">
                  {{ stagiaire.email }}
                </p>

                <p class="text-sm text-gray-400 mt-1">
                  Demande envoyée le {{ stagiaire.createdAt }}
                </p>
              </div>
            </div>

            <!-- STATUT -->

            <span class="px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
              En attente
            </span>
          </div>

          <!-- INFORMATIONS -->

          <div class="grid md:grid-cols-2 gap-5 mt-8">
            <div>
              <p class="text-sm text-gray-400">Formation</p>

              <p class="font-semibold text-gray-800">
                {{ stagiaire.formation }}
              </p>
            </div>

            <div>
              <p class="text-sm text-gray-400">Département</p>

              <p class="font-semibold text-gray-800">
                {{ stagiaire.departement }}
              </p>
            </div>
          </div>

          <!-- ACTION -->

          <div class="flex justify-end mt-8">
            <AppButton variant="secondary" @click="openDetails(stagiaire)">
              Voir les détails
            </AppButton>
          </div>
        </div>
      </div>
    </div>
    <!-- MODAL DETAILS -->

    <AppModal v-model="showDetails" title="Informations du stagiaire" width="max-w-3xl">
      <div v-if="selectedStagiaire" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p class="text-sm text-gray-500">Nom</p>

            <p class="font-semibold">
              {{ selectedStagiaire.nom }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Prénom</p>

            <p class="font-semibold">
              {{ selectedStagiaire.prenom }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Email</p>

            <p class="font-semibold">
              {{ selectedStagiaire.email }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Téléphone</p>

            <p class="font-semibold">
              {{ selectedStagiaire.telephone }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Date de naissance</p>

            <p class="font-semibold">
              {{ selectedStagiaire.dateNaissance }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Adresse</p>

            <p class="font-semibold">
              {{ selectedStagiaire.adresse }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Université</p>

            <p class="font-semibold">
              {{ selectedStagiaire.universite }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Formation</p>

            <p class="font-semibold">
              {{ selectedStagiaire.formation }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Département</p>

            <p class="font-semibold">
              {{ selectedStagiaire.departement }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Type de stage</p>

            <p class="font-semibold">
              {{ selectedStagiaire.typeStage }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Date début</p>

            <p class="font-semibold">
              {{ selectedStagiaire.dateDebut }}
            </p>
          </div>

          <div>
            <p class="text-sm text-gray-500">Date fin</p>

            <p class="font-semibold">
              {{ selectedStagiaire.dateFin }}
            </p>
          </div>
        </div>
      </div>

      <!-- FOOTER DETAILS -->

      <template #footer>
        <button
          class="px-5 py-2 rounded-xl border border-red-500 text-red-600 hover:bg-red-50 transition"
          @click="openConfirm(selectedStagiaire, 'reject')"
        >
          Refuser
        </button>

        <button
          class="px-5 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 transition"
          @click="openConfirm(selectedStagiaire, 'approve')"
        >
          Accepter
        </button>
      </template>
    </AppModal>

    <!-- MODAL CONFIRMATION -->

    <AppModal v-model="showConfirm" title="Confirmation" width="max-w-md">
      <div class="text-center">
        <div class="text-5xl mb-4">⚠️</div>

        <p class="text-gray-700 text-lg">
          {{
            confirmAction === 'approve'
              ? 'Êtes-vous sûr de vouloir accepter cette demande ?'
              : 'Êtes-vous sûr de vouloir refuser cette demande ?'
          }}
        </p>
      </div>

      <template #footer>
        <button
          class="px-5 py-2 rounded-xl border text-gray-600 hover:bg-gray-100"
          @click="cancelConfirm"
        >
          Annuler
        </button>

        <button
          class="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
          @click="executeConfirm"
        >
          Confirmer
        </button>
      </template>
    </AppModal>
    <AppToast

:show="showToast"

:type="toastType"

:message="toastMessage"

/>
  </div>
</template>
