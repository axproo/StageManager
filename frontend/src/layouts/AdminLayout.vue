<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import AdminSidebar from "@/components/navigation/AdminSidebar.vue";
import { useAuthStore } from "@/stores/auth.store";

const router = useRouter();
const authStore = useAuthStore();

const isDarkMode = ref(false);
const showUserMenu = ref(false);
const searchQuery = ref("");

function toggleDarkMode() {
  isDarkMode.value = !isDarkMode.value;
  document.documentElement.classList.toggle("dark", isDarkMode.value);
}

function toggleUserMenu() {
  showUserMenu.value = !showUserMenu.value;
}

function logout() {
  authStore.logout();
  router.push("/login");
}

const adminName = authStore.user?.name ?? "Admin";
const adminInitials = adminName
  .trim()
  .split(" ")
  .slice(0, 2)
  .map((p) => p[0])
  .join("")
  .toUpperCase();

const icons = {
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
};
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <AdminSidebar />

    <div class="flex-1 ml-64 flex flex-col">
      <!-- TOPBAR -->
      <header class="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex items-center justify-between gap-6">
        <!-- Recherche -->
        <div class="relative flex-1 max-w-md">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.search"></svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm transition-all duration-200 focus:bg-white focus:border-blue-300 focus:ring-2 focus:ring-blue-100 outline-none"
          />
        </div>

        <!-- Actions -->
        <div class="flex items-center gap-2">
          <button class="px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            EN
          </button>

          <button
            @click="toggleDarkMode"
            class="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200"
          >
            <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.moon"></svg>
          </button>

          <button class="relative w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-lg transition-colors duration-200">
            <svg class="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.bell"></svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
          </button>

          <!-- Menu profil -->
          <div class="relative ml-2">
            <button
              @click="toggleUserMenu"
              class="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs transition-transform duration-200 hover:scale-105"
            >
              {{ adminInitials }}
            </button>

            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2 scale-95"
              enter-to-class="opacity-100 translate-y-0 scale-100"
              leave-active-class="transition-all duration-150 ease-in"
              leave-from-class="opacity-100 scale-100"
              leave-to-class="opacity-0 scale-95"
            >
              <div
                v-if="showUserMenu"
                class="absolute right-0 mt-3 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
              >
                <button class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors duration-150">
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.user"></svg>
                  Mon profil
                </button>
                <button
                  @click="logout"
                  class="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                >
                  <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" v-html="icons.logout"></svg>
                  Déconnexion
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </header>

      <!-- Contenu -->
      <main class="flex-1">
        <router-view />
      </main>
    </div>
  </div>
</template>