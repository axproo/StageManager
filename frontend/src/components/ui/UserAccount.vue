<script setup>
import { useAuthStore } from '@/stores/auth.store'

const authStore = useAuthStore()
</script>

<template>
  <div
    class="bg-slate-800 rounded-xl p-4 flex items-center gap-3"
  >

    <!-- Avatar -->
    <div
      class="w-12 h-12 rounded-full bg-cyan-400 text-slate-900 flex items-center justify-center font-bold text-lg"
    >
      {{ authStore.user?.name?.charAt(0) || 'U' }}
    </div>


    <!-- Informations utilisateur -->
    <div class="flex-1 min-w-0">

      <p class="font-semibold truncate">
        {{ authStore.user?.name || 'Utilisateur' }}
      </p>


      <p class="text-xs text-slate-400 truncate">
        {{ authStore.user?.email || 'email@example.com' }}
      </p>


      <span
        class="inline-block mt-2 px-2 py-1 rounded-lg text-xs bg-blue-600"
      >
        {{ authStore.role || 'ROLE' }}
      </span>

    </div>

  </div>
</template>