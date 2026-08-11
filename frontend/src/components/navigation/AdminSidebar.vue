<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/auth.store";
import logoAxproo from "@/assets/Axproologo.png";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

interface NavItem {
  label: string;
  path: string;
  icon: string;
  matchPaths?: string[]; // routes additionnelles qui activent ce lien
}

const navItems: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard", icon: "grid" },
  {
    label: "Demandes",
    path: "/admin/requests",
    icon: "inbox",
    matchPaths: ["/admin/accepted", "/admin/rejected"],
  },
  { label: "Users", path: "/admin/users", icon: "users" },
  { label: "Roles", path: "/admin/roles", icon: "shield" },
  { label: "Departments", path: "/admin/departments", icon: "building" },
  { label: "Interns", path: "/admin/interns", icon: "user-check" },
  { label: "Attendance", path: "/admin/attendance", icon: "check-circle" },
  { label: "Tasks", path: "/admin/tasks", icon: "list" },
  { label: "Activity log", path: "/admin/activity-log", icon: "clock" },
  { label: "Settings", path: "/admin/settings", icon: "settings" },
];

function isActive(item: NavItem) {
  const paths = [item.path, ...(item.matchPaths ?? [])];
  return paths.some((p) => route.path === p || route.path.startsWith(p + "/"));
}
const adminName = computed(() => authStore.user?.name ?? "Admin");
const adminRole = computed(() => authStore.user?.role ?? "Administrateur");
const adminInitials = computed(() => {
  const parts = adminName.value.trim().split(" ");
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : adminName.value.slice(0, 2).toUpperCase();
});

function goTo(path: string) {
  router.push(path);
}

import { icons } from "@/constants/icons";
</script>

<template>
  <aside class="w-64 h-screen bg-white border-r border-gray-100 flex flex-col fixed left-0 top-0">
    <!-- Logo -->
    <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
      <img :src="logoAxproo" alt="AXPROO" class="h-9 w-9 rounded-full object-cover border border-gray-100" />
      <span class="text-lg font-bold text-blue-600">StageManager</span>
    </div>

    <!-- Profil admin -->
    <div class="flex items-center gap-3 px-6 py-5 border-b border-gray-100">
      <div class="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
        {{ adminInitials }}
      </div>
      <div class="min-w-0">
        <p class="font-semibold text-gray-900 text-sm truncate">{{ adminName }}</p>
        <p class="text-xs text-gray-400">{{ adminRole }}</p>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
      <button
        v-for="item in navItems"
        :key="item.path"
        @click="goTo(item.path)"
        class="group w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
        :class="isActive(item)
          ? 'bg-blue-50 text-blue-600'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'"
      >
        <svg
          class="w-[18px] h-[18px] flex-shrink-0 transition-colors duration-200"
          :class="isActive(item) ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
          stroke-linecap="round" stroke-linejoin="round"
          v-html="icons[item.icon]"
        ></svg>
        {{ item.label }}

        <span
          v-if="isActive(item)"
          class="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600"
        ></span>
      </button>
    </nav>

    <!-- Footer sidebar -->
    <div class="px-6 py-4 border-t border-gray-100">
      <p class="text-xs text-gray-400">© 2026 StageManager</p>
      <p class="text-xs text-gray-300 mt-0.5">v0.2.0</p>
    </div>
  </aside>
</template>