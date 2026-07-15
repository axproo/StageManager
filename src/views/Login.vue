<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const name = ref("");

const router = useRouter();
const store = useUserStore();

function login() {
  if (!name.value.trim()) return;

  store.login(name.value);
  router.push("/dashboard");
}
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-6"
  >
    <div class="w-full max-w-md">
      <div class="bg-white rounded-3xl shadow-2xl p-8">
        <!-- Logo -->

        <div class="text-center mb-8">
          <div
            class="w-24 h-24 mx-auto bg-blue-600 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-lg"
          >
            SM
          </div>

          <h1 class="text-3xl font-bold text-gray-800 mt-6">Stage Manager</h1>

          <p class="text-gray-500 mt-2">Manage your internships easily</p>
        </div>

        <!-- Form -->

        <div class="space-y-5">
          <div>
            <label class="block text-gray-700 font-semibold mb-2">
              Username
            </label>

            <input
              v-model="name"
              type="text"
              placeholder="Enter your username"
              class="w-full px-5 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              @keyup.enter="login"
            />
          </div>

          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition duration-300 shadow-lg"
            @click="login"
          >
            Login
          </button>
        </div>

        <p class="text-center text-gray-400 text-sm mt-8">
          © 2026 Stage Manager
        </p>
      </div>
    </div>
  </div>
</template>
