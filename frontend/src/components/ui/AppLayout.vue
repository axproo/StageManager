<script setup>
defineProps({
  showSidebar: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside v-if="showSidebar" class="w-72 bg-slate-900 text-white min-h-screen fixed left-0 top-0">
      <slot name="sidebar" />
    </aside>

    <!-- Contenu -->
    <div class="flex-1 flex flex-col" :class="{ 'ml-72': showSidebar }">
      <!-- Page -->
      <main class="flex-1 p-6">
        <slot />
      </main>

      <!-- Footer -->
      <footer class="border-t bg-white py-4 text-center text-sm text-gray-500">
        <slot name="footer"> © 2026 AXPROO - Plateforme de gestion des stagiaires </slot>
      </footer>
    </div>
  </div>
</template>
