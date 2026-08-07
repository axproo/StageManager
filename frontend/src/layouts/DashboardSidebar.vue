<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import UserAccount from '@/components/ui/UserAccount.vue'
import { sidebarMenu } from '@/config/sidebarMenu'
import { useAuthStore } from '@/stores/auth.store'
import { useStagiaireStore } from '@/stores/stagiaire.store'

const router = useRouter()
const authStore = useAuthStore()
const stagiaireStore = useStagiaireStore()

// Déconnexion
function logout() {
  authStore.logout()
  router.push('/login')
}

// Menus visibles selon le rôle connecté
const filteredMenus = computed(() => {
  return sidebarMenu.filter((menu) => authStore.role && menu.roles.includes(authStore.role))
})
</script>

<template>
  <aside class="fixed left-0 top-0 flex h-screen w-72 flex-col bg-slate-900 text-white">
    <!-- Logo -->
    <div class="p-6 text-3xl font-bold text-cyan-400">AXPROO</div>

    <!-- Menu -->
    <nav class="flex-1 space-y-2 overflow-y-auto px-4">
      <RouterLink
        v-for="menu in filteredMenus"
        :key="menu.to"
        :to="menu.to"
        class="flex items-center gap-3 rounded-xl px-4 py-3 transition hover:bg-blue-600"
        active-class="bg-blue-600"
      >
        <!-- Icône -->
        <span class="text-xl">
          {{ menu.icon }}
        </span>

        <!-- Nom -->
        <span class="flex-1">
          {{ menu.name }}
        </span>

        <!-- Notification -->
        <Transition
          enter-active-class="transition duration-300"
          enter-from-class="scale-0"
          enter-to-class="scale-100"
        >
          <span
            v-if="menu.notification && stagiaireStore.pendingCount > 0"
            class="rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white"
          >
            {{ stagiaireStore.pendingCount }}
          </span>
        </Transition>
      </RouterLink>
    </nav>

    <!-- Utilisateur -->
    <div class="space-y-3 border-t border-slate-700 p-4">
      <UserAccount />

      <button class="w-full rounded-xl bg-red-500 py-3 transition hover:bg-red-600" @click="logout">
        Déconnexion
      </button>
    </div>
  </aside>
</template>
