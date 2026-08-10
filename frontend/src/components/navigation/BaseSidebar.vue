<script setup lang="ts">
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";

interface MenuItem {
  label: string;

  icon: string;

  path: string;
}

defineProps<{
  title: string;

  subtitle: string;

  menus: MenuItem[];
}>();

const router = useRouter();

const authStore = useAuthStore();

function logout() {
  authStore.logout();

  router.push("/login");
}
</script>

<template>
  <aside class="w-64 min-h-screen bg-gray-900 text-white p-5 flex flex-col">
    <!-- Header -->

    <div class="mb-10">
      <h1 class="text-2xl font-bold">
        {{ title }}
      </h1>

      <p class="text-gray-400 text-sm">
        {{ subtitle }}
      </p>
    </div>

    <!-- Menu -->

    <nav class="space-y-3 flex-1">
      <RouterLink
        v-for="menu in menus"
        :key="menu.path"
        :to="menu.path"
        class="block p-3 rounded hover:bg-gray-700"
      >
        {{ menu.icon }}

        {{ menu.label }}
      </RouterLink>
    </nav>

    <!-- Logout -->

    <button @click="logout" class="bg-red-600 hover:bg-red-700 rounded p-3">
      🚪 Déconnexion
    </button>
  </aside>
</template>
