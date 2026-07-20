<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";

const store = useUserStore();
</script>


<template>

  <header
    class="h-16 bg-white rounded-2xl shadow-lg flex items-center justify-between px-6 mb-8"
  >

    <!-- Search -->
    <div
      class="flex items-center bg-slate-100 rounded-xl px-4 py-2 w-72"
    >

      <span class="mr-3">
        🔍
      </span>

      <input
        type="text"
        placeholder="Search..."
        class="bg-transparent outline-none w-full text-sm"
      />

    </div>



    <!-- User -->
    <div class="flex items-center gap-4">

      <button
        class="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition"
      >
        🔔
      </button>


      <div class="flex items-center gap-3">

        <div
          class="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold"
        >
          {{ store.username.charAt(0).toUpperCase() }}
        </div>


        <div>

          <p class="font-semibold text-slate-800">
            {{ store.username }}
          </p>

          <p class="text-xs text-slate-500">
            Admin
          </p>

        </div>

      </div>


    </div>


  </header>

</template>