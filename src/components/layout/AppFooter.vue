<script setup lang="ts">
import { useI18n } from '@/composables/useI18n'
const { t } = useI18n()
const year = new Date().getFullYear()
</script>
<template>
  <footer class="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-400 dark:border-slate-800">
    © {{ year }} {{ t('app.footer') }} — v0.2.0
  </footer>
</template>
