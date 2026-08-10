<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { useActivityLogStore } from '@/stores/activityLog'
import { usePermissions } from '@/composables/usePermissions'
import { useI18n } from '@/composables/useI18n'
import type { Lang, Theme } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const activityLog = useActivityLogStore()
const perms = usePermissions()
const { t } = useI18n()

const personal = reactive({ prenom: '', nom: '', email: '' })
const passwords = reactive({ newPassword: '', confirmPassword: '' })
const saving = ref(false)
const success = ref('')
const error = ref('')

const fileInput = ref<HTMLInputElement | null>(null)
const photoPreview = ref<string | null>(null)
const photoSaving = ref(false)

watch(
  () => auth.user,
  (u) => {
    if (!u) return
    personal.prenom = u.prenom
    personal.nom = u.nom
    personal.email = u.email
  },
  { immediate: true },
)

function triggerFileSelect() {
  fileInput.value?.click()
}

function handleFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (!file.type.startsWith('image/')) {
    error.value = "Le fichier sélectionné n'est pas une image."
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    photoPreview.value = reader.result as string
  }
  reader.readAsDataURL(file)
}

async function confirmPhoto() {
  if (!photoPreview.value || !auth.user) return
  photoSaving.value = true
  await auth.updateProfile({ avatarUrl: photoPreview.value })
  await activityLog.record(auth.user.id, 'UPDATE', 'avatar', auth.user.id)
  photoSaving.value = false
  photoPreview.value = null
}

function cancelPhoto() {
  photoPreview.value = null
  if (fileInput.value) fileInput.value.value = ''
}

async function handleSave() {
  error.value = ''
  if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
    error.value = 'Les mots de passe ne correspondent pas.'
    return
  }
  saving.value = true
  await auth.updateProfile({
    prenom: personal.prenom,
    nom: personal.nom,
    email: personal.email,
    ...(passwords.newPassword ? { motDePasse: passwords.newPassword } : {}),
  })
  saving.value = false
  passwords.newPassword = ''
  passwords.confirmPassword = ''
  success.value = 'Profil mis à jour avec succès.'
  window.setTimeout(() => (success.value = ''), 3000)
}
</script>

<template>
  <div>
    <h1 class="mb-6 text-2xl font-semibold text-slate-900 dark:text-white">{{ t('nav.settings') }}</h1>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <BaseCard>
        <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Photo de profil</h3>
        <div class="flex items-center gap-5">
          <UserAvatar
            v-if="auth.user"
            :initials="auth.user.avatarInitials"
            :avatar-url="photoPreview ?? auth.user.avatarUrl"
            size="lg"
          />
          <div class="flex flex-col gap-2">
            <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleFileChange" />
            <BaseButton size="sm" variant="secondary" @click="triggerFileSelect">Modifier la photo</BaseButton>
            <div v-if="photoPreview" class="flex gap-2">
              <BaseButton size="sm" :loading="photoSaving" @click="confirmPhoto">Valider</BaseButton>
              <BaseButton size="sm" variant="outlined" @click="cancelPhoto">Annuler</BaseButton>
            </div>
            <p v-else class="text-xs text-slate-400">JPG, PNG — aperçu avant validation</p>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Préférences</h3>
        <div class="space-y-4">
          <div>
            <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Langue</span>
            <div class="inline-flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                v-for="l in ['fr', 'en'] as Lang[]"
                :key="l"
                class="px-4 py-1.5 text-sm font-medium transition-colors"
                :class="ui.lang === l ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'"
                @click="ui.setLang(l)"
              >
                {{ l.toUpperCase() }}
              </button>
            </div>
          </div>
          <div>
            <span class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Thème</span>
            <div class="inline-flex overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <button
                v-for="mode in ['light', 'dark'] as Theme[]"
                :key="mode"
                class="px-4 py-1.5 text-sm font-medium transition-colors"
                :class="ui.theme === mode ? 'bg-brand-600 text-white' : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'"
                @click="ui.setTheme(mode)"
              >
                {{ mode === 'light' ? 'Clair' : 'Sombre' }}
              </button>
            </div>
          </div>
        </div>
      </BaseCard>

      <BaseCard>
        <h3 class="mb-4 font-semibold text-slate-900 dark:text-white">Informations personnelles</h3>
        <div class="space-y-4">
          <BaseInput v-model="personal.prenom" label="Prénom" />
          <BaseInput v-model="personal.nom" label="Nom" />
          <BaseInput v-model="personal.email" type="email" label="Email" />
          <BaseInput v-model="passwords.newPassword" type="password" label="Nouveau mot de passe (optionnel)" />
          <BaseInput v-model="passwords.confirmPassword" type="password" label="Confirmer le mot de passe" />
        </div>
      </BaseCard>

      <BaseCard v-if="perms.can('settings:global')">
        <h3 class="mb-1 font-semibold text-slate-900 dark:text-white">Paramètres globaux</h3>
        <p class="mb-4 text-sm text-slate-500">Réservé à l'Administrateur.</p>
        <BaseInput model-value="StageManager" label="Nom de la plateforme" disabled />
      </BaseCard>
    </div>

    <StatusBadge v-if="success" tone="green" class="mt-5 block w-fit">{{ success }}</StatusBadge>
    <StatusBadge v-if="error" tone="red" class="mt-5 block w-fit">{{ error }}</StatusBadge>

    <div class="mt-6 flex justify-end">
      <BaseButton :loading="saving" @click="handleSave">{{ t('app.save') }}</BaseButton>
    </div>
  </div>
</template>
