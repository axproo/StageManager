<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'
import { useNotificationsStore } from '@/stores/notifications'
import { useGlobalSearch } from '@/composables/useGlobalSearch'
import { useI18n } from '@/composables/useI18n'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const auth = useAuthStore()
const ui = useUiStore()
const notifications = useNotificationsStore()
const router = useRouter()
const { t } = useI18n()
const { query, results } = useGlobalSearch()

const searchOpen = ref(false)
const notifOpen = ref(false)
const userMenuOpen = ref(false)

onMounted(() => {
  if (auth.user) notifications.loadForUser(auth.user.id)
})

function closeSearchDelayed() {
  window.setTimeout(() => {
    searchOpen.value = false
  }, 150)
}

function goTo(path: string) {
  searchOpen.value = false
  query.value = ''
  router.push(path)
}

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}

async function openNotifications() {
  notifOpen.value = !notifOpen.value
  if (notifOpen.value && auth.user) await notifications.loadForUser(auth.user.id, true)
}

async function readAll() {
  if (auth.user) await notifications.markAllAsRead(auth.user.id)
}

const categoryLabel: Record<string, string> = {
  users: 'Utilisateurs',
  stagiaires: 'Stagiaires',
  taches: 'Tâches',
  departments: 'Départements',
}
</script>

<template>
  <header class="surface sticky top-0 z-30 flex items-center gap-4 border-b px-4 py-3 sm:px-6">
    <RouterLink to="/dashboard" class="flex shrink-0 items-center gap-2">
      <img src="/logo-axproo.png" alt="AXPROO" class="h-7 w-7 rounded-md" />
      <span class="hidden font-semibold text-slate-900 sm:block dark:text-white">{{ t('app.name') }}</span>
    </RouterLink>

    <div class="relative ml-2 max-w-sm flex-1">
      <svg xmlns="http://www.w3.org/2000/svg" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="M21 21l-4.35-4.35" /></svg>
      <input
        v-model="query"
        type="search"
        :placeholder="t('app.search')"
        class="field-input w-full rounded-full py-2 pl-9 pr-4 text-sm"
        @focus="searchOpen = true"
        @blur="closeSearchDelayed"
      />
      <div
        v-if="searchOpen && results.length > 0"
        class="surface absolute left-0 right-0 top-full mt-2 max-h-80 overflow-y-auto rounded-lg border shadow-lg"
      >
        <button
          v-for="r in results"
          :key="`${r.category}-${r.id}`"
          class="flex w-full flex-col items-start px-4 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
          @mousedown.prevent="goTo(r.to)"
        >
          <span class="text-xs font-medium uppercase tracking-wide text-brand-600">{{ categoryLabel[r.category] }}</span>
          <span class="text-sm font-medium text-slate-800 dark:text-slate-100">{{ r.label }}</span>
          <span class="truncate text-xs text-slate-500">{{ r.sublabel }}</span>
        </button>
      </div>
    </div>

    <div class="ml-auto flex items-center gap-2">
      <button class="rounded-md px-1.5 py-1 text-sm font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white" @click="ui.setLang(ui.lang === 'fr' ? 'en' : 'fr')">
        {{ ui.lang.toUpperCase() }}
      </button>

      <button class="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white" @click="ui.setTheme(ui.theme === 'light' ? 'dark' : 'light')">
        <svg v-if="ui.theme === 'light'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" /></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" /></svg>
      </button>

      <div class="relative">
        <button class="relative rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:hover:bg-slate-800 dark:hover:text-white" @click="openNotifications">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" /></svg>
          <span v-if="notifications.unreadCount > 0" class="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-semibold text-white">
            {{ notifications.unreadCount }}
          </span>
        </button>
        <div v-if="notifOpen" class="surface absolute right-0 top-full mt-2 w-80 rounded-lg border shadow-lg">
          <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
            <span class="text-sm font-semibold">Notifications</span>
            <button class="text-xs text-brand-600 hover:underline" @click="readAll">Tout marquer lu</button>
          </div>
          <div class="max-h-80 overflow-y-auto">
            <p v-if="notifications.items.length === 0" class="px-4 py-6 text-center text-sm text-slate-400">Aucune notification</p>
            <button
              v-for="n in notifications.items"
              :key="n.id"
              class="flex w-full flex-col items-start gap-0.5 border-b border-slate-50 px-4 py-3 text-left last:border-0 hover:bg-slate-50 dark:border-slate-800/60 dark:hover:bg-slate-800"
              @click="notifications.markAsRead(n.id)"
            >
              <span class="text-sm" :class="n.lu ? 'text-slate-500' : 'font-medium text-slate-800 dark:text-slate-100'">{{ n.message }}</span>
              <span class="text-xs text-slate-400">{{ new Date(n.createdAt).toLocaleString('fr-FR') }}</span>
            </button>
          </div>
        </div>
      </div>

      <div class="relative">
        <button class="flex items-center gap-2" @click="userMenuOpen = !userMenuOpen">
          <UserAvatar v-if="auth.user" :initials="auth.user.avatarInitials" :avatar-url="auth.user.avatarUrl" size="sm" />
        </button>
        <div v-if="userMenuOpen" class="surface absolute right-0 top-full mt-2 w-56 rounded-lg border p-1.5 shadow-lg">
          <p class="px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-100">{{ auth.user?.prenom }} {{ auth.user?.nom }}</p>
          <p class="px-3 pb-2 text-xs text-slate-500">{{ auth.role?.nom }}</p>
          <RouterLink to="/settings" class="block rounded-md px-3 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800" @click="userMenuOpen = false">
            {{ t('nav.settings') }}
          </RouterLink>
          <button class="block w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950" @click="handleLogout">
            {{ t('app.logout') }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
