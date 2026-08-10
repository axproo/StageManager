<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useI18n } from '@/composables/useI18n'
import BaseButton from '@/components/base/BaseButton.vue'

const router = useRouter()
const auth = useAuthStore()
const { t } = useI18n()

function goHome() {
  router.push(auth.isAuthenticated ? '/dashboard' : '/login')
}
</script>
<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
    <div class="surface w-full max-w-md rounded-xl p-10 text-center shadow-sm">
      <p class="mb-3 text-5xl font-bold text-brand-600">404</p>
      <h1 class="mb-2 text-xl font-semibold text-slate-900 dark:text-white">{{ t('notfound.title') }}</h1>
      <p class="mb-6 text-sm text-slate-500">{{ t('notfound.text') }}</p>
      <BaseButton @click="goHome">{{ t('notfound.back') }}</BaseButton>
    </div>
  </div>
</template>
