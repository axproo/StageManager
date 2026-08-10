<script setup lang="ts">
import AdminSidebar from "../components/navigation/AdminSidebar.vue";
</script>

<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->

    <AdminSidebar />

    <!-- Content -->

    <main class="flex-1 bg-gray-100">
      <RouterView />
    </main>
  </div>
</template>
