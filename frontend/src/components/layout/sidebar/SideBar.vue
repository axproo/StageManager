<template>
  <aside
    class="w-64 min-h-screen inset-0 bg-gradient-to-r from-[#200a83] via-[#15108a] to-[#091586] opacity-84 text-white p-5"
  >
    <h2 class="text-xl font-bold mb-8">Stage Manager</h2>

    <nav>
      <ul class="space-y-2">
        <li v-for="item in menuItems" :key="item.name">
          <RouterLink
            :to="item.path"
            class="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition"
            active-class="bg-blue-600"
          >
            <component :is="item.icon" class="w-5 h-5" />

            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import {
  HomeIcon,
  UsersIcon,
  DocumentTextIcon,
} from "@heroicons/vue/24/outline";

const menuItems = [
  {
    name: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "interns",
    label: "Stagiaires",
    path: "/interns",
    icon: UsersIcon,
  },
  {
    name: "requests",
    label: "Demandes",
    path: "/requests",
    icon: DocumentTextIcon,
  },
];
</script>
