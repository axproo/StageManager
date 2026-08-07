<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ProfileForm from '@/components/forms/ProfileForm.vue'
import { useStagiaireStore } from '@/stores/stagiaire.store'
import { useNotificationStore } from '@/stores/notification.store'

const notificationStore = useNotificationStore()
const router = useRouter()

const stagiaireStore = useStagiaireStore()

// Message affiché après enregistrement

const successMessage = ref('')

// Contrôle affichage formulaire

const profileSaved = ref(false)

function saveProfile(data: any) {
  console.log('Profil stagiaire :', data)

  // Création de la demande stagiaire
  // Statut PENDING = attente validation ADMIN

  stagiaireStore.addStagiaire({
    ...data,

    status: 'PENDING',
  })
  notificationStore.addNotification({

  title: 'Nouvelle demande stagiaire',

  message:
  `${data.nom} ${data.prenom} a envoyé une demande de stage.`,

  type:'STAGIAIRE_REQUEST',

})
  // Affichage notification

  successMessage.value =
    '✅ Votre profil a été enregistré avec succès. Votre demande est en attente de validation par un administrateur.'

  // Cache le formulaire

  profileSaved.value = true

  // Sauvegarde locale

  localStorage.setItem('profileCompleted', 'true')

  // Redirection après affichage du message

  setTimeout(() => {
    router.push('/login')
  }, 5000)
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-800"
  >
    <!-- Carte Glass -->

    <div
      class="w-full max-w-5xl bg-cyan-900/20 backdrop-blur-2xl rounded-3xl border border-cyan-300/30 shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-10"
    >
      <!-- Logo -->

      <div class="flex justify-center mb-6">
        <div
          class="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-300 bg-white/10 shadow-lg"
        >
          <img src="/axproo-logo.jpeg" alt="AXPROO" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Titre -->

      <h1 class="text-4xl font-extrabold text-center tracking-wide mb-2">
        <span class="text-cyan-300"> AXPROO </span>
      </h1>

      <p class="text-center text-white/70 mb-8">Complétez votre profil stagiaire</p>

      <!-- Notification succès -->

      <div
        v-if="successMessage"
        class="mb-6 rounded-xl bg-green-500/20 border border-green-400/40 text-green-200 px-5 py-4 text-center font-medium"
      >
        {{ successMessage }}
      </div>

      <!-- Informations personnelles -->

      <h2 v-if="!profileSaved" class="text-2xl font-bold text-center text-white mb-8">
        Informations personnelles
      </h2>

      <!-- Formulaire -->

      <ProfileForm v-if="!profileSaved" @submit="saveProfile" />
    </div>
  </div>
</template>
