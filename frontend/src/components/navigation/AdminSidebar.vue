<script setup lang="ts">
import BaseSidebar from "./BaseSidebar.vue";

const menus = [
  {
    label: "Dashboard",
    icon: "📊",
    path: "/admin/dashboard",
  },

  {
    label: "Demandes",
    icon: "📄",
    path: "/admin/requests",
  },
    {
        label:"Acceptées",
        icon:"✅",
        path:"/admin/accepted"
    },


    {
        label:"Refusées",
        icon:"❌",
        path:"/admin/rejected"
    },
  {
    label: "Stagiaires",
    icon: "👨‍🎓",
    path: "/admin/students",
  },

  {
    label: "Paramètres",
    icon: "⚙️",
    path: "/admin/settings",
  },
];
</script>

<template>
  <BaseSidebar title="StageManager" subtitle="Administration" :menus="menus" />
</template>
