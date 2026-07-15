<script setup lang="ts">
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const store = useUserStore();
const router = useRouter();

function logout() {
  store.username = "";
  router.push("/login");
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-900 text-white hidden md:flex flex-col p-6">
      <h1 class="text-2xl font-bold mb-10">🚀 Stage Manager</h1>

      <nav class="space-y-4">
        <a class="block bg-blue-600 rounded-xl px-4 py-3"> Dashboard </a>

        <a class="block hover:bg-gray-800 rounded-xl px-4 py-3"> Stages </a>

        <a class="block hover:bg-gray-800 rounded-xl px-4 py-3"> Students </a>

        <a class="block hover:bg-gray-800 rounded-xl px-4 py-3"> Settings </a>
      </nav>

      <button
        class="mt-auto bg-red-500 hover:bg-red-600 rounded-xl py-3"
        @click="logout"
      >
        Logout
      </button>
    </aside>

    <!-- Main -->
    <main class="flex-1 p-6">
      <!-- Header -->
      <div class="flex justify-between items-center mb-8">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">Dashboard</h2>

          <p class="text-gray-500">Welcome back, {{ store.username }} 👋</p>
        </div>

        <div class="bg-white shadow rounded-full px-5 py-3 font-semibold">
          {{ store.username }}
        </div>
      </div>

      <!-- Cards -->

      <div class="grid md:grid-cols-3 gap-6">
        <div class="bg-white rounded-2xl shadow p-6 border-l-4 border-blue-600">
          <p class="text-gray-500">Total Stages</p>

          <h3 class="text-4xl font-bold mt-3">25</h3>
        </div>

        <div
          class="bg-white rounded-2xl shadow p-6 border-l-4 border-green-500"
        >
          <p class="text-gray-500">Students</p>

          <h3 class="text-4xl font-bold mt-3">120</h3>
        </div>

        <div
          class="bg-white rounded-2xl shadow p-6 border-l-4 border-purple-600"
        >
          <p class="text-gray-500">Pending Requests</p>

          <h3 class="text-4xl font-bold mt-3">8</h3>
        </div>
      </div>

      <!-- Table -->

      <div class="bg-white rounded-2xl shadow mt-8 p-6">
        <h3 class="text-xl font-bold mb-5">Recent Activities</h3>

        <div class="space-y-4">
          <div class="flex justify-between bg-gray-50 p-4 rounded-xl">
            <span> New internship request </span>

            <span class="text-blue-600"> Today </span>
          </div>

          <div class="flex justify-between bg-gray-50 p-4 rounded-xl">
            <span> Student added </span>

            <span class="text-green-600"> Yesterday </span>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
