<script setup lang="ts">
import BaseSidebar from "./BaseSidebar.vue";

const menus = [
  {
    label: "Dashboard",
    icon: "🏠",
    path: "/stagiaire/dashboard",
  },

  {
    label: "Demande de stage",
    icon: "📝",
    path: "/demande-stage",
  },

  {
    label: "Profil",
    icon: "👤",
    path: "/stagiaire/profile",
  },

  {
    label: "Documents",
    icon: "📂",
    path: "/stagiaire/documents",
  },
];
</script>

<template>
  <BaseSidebar
    title="StageManager"
    subtitle="Espace Stagiaire"
    :menus="menus"
  />
</template>
