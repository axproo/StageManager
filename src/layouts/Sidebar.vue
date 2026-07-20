<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const route = useRoute();

const store = useUserStore();

function logout() {
  store.username = "";
  router.push("/login");
}

function isActive(path: string) {
  return route.path === path;
}
</script>


<template>

  <aside
    class="w-64 min-h-screen bg-slate-900 text-white p-6 flex flex-col"
  >

    <!-- Logo -->
    <div class="flex items-center gap-3 mb-10">

      <div
        class="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-xl"
      >
        SM
      </div>


      <div>
        <h1 class="font-bold text-lg">
          StageManager
        </h1>

        <p class="text-xs text-slate-400">
          Platform
        </p>
      </div>

    </div>


    <!-- Menu -->
    <nav class="space-y-3 flex-1">


      <RouterLink
  to="/dashboard"
  :class="[
    'flex items-center gap-3 p-3 rounded-xl transition',
    isActive('/dashboard')
      ? 'bg-indigo-600'
      : 'hover:bg-white/10'
  ]"
>
  🏠 Dashboard
</RouterLink>


      <RouterLink
  to="/students"
  :class="[
    'flex items-center gap-3 p-3 rounded-xl transition',
    isActive('/students')
      ? 'bg-indigo-600'
      : 'hover:bg-white/10'
  ]"
>
  👨‍🎓 Students
</RouterLink>


      <RouterLink
  to="/companies"
  :class="[
    'flex items-center gap-3 p-3 rounded-xl transition',
    isActive('/companies')
      ? 'bg-indigo-600'
      : 'hover:bg-white/10'
  ]"
>
  🏢 Companies
</RouterLink>


      <RouterLink
  to="/internships"
  :class="[
    'flex items-center gap-3 p-3 rounded-xl transition',
    isActive('/internships')
      ? 'bg-indigo-600'
      : 'hover:bg-white/10'
  ]"
>
  📄 Internships
</RouterLink>


      <RouterLink
  to="/settings"
  :class="[
    'flex items-center gap-3 p-3 rounded-xl transition',
    isActive('/settings')
      ? 'bg-indigo-600'
      : 'hover:bg-white/10'
  ]"
>
  ⚙️ Settings
</RouterLink>


    </nav>


    <!-- User -->
    <div class="border-t border-white/10 pt-5">

      <p class="text-sm text-slate-400 mb-3">
        {{ store.username }}
      </p>


      <button
        @click="logout"
        class="w-full bg-red-500 hover:bg-red-600 p-3 rounded-xl transition"
      >
        Logout
      </button>


    </div>


  </aside>

</template>