<script setup lang="ts">
import Navbar from "@/components/navigation/Navbar.vue";
</script>

<template>
  <div class="min-h-screen bg-white text-gray-900">
    <Navbar />
    <main>
      <router-view />
    </main>
  </div>
</template>