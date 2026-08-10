<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../../stores/auth.store";

const router = useRouter();

const authStore = useAuthStore();

const email = ref("");

const password = ref("");

async function handleLogin() {
  const role = await authStore.login({
    email: email.value,

    password: password.value,
  });

  if (!role) {
    return;
  }

  if (role === "ADMIN") {
    router.push("/admin/dashboard");
  }

  if (role === "STAGIAIRE") {
    router.push("/stagiaire/dashboard");
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="bg-white w-full max-w-md p-8 rounded-xl shadow">
      <h1 class="text-3xl font-bold text-center mb-6">Connexion</h1>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <!-- Email -->

        <div>
          <label class="block mb-2 font-medium"> Email </label>

          <input
            v-model="email"
            type="email"
            placeholder="email@example.com"
            class="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <!-- Password -->

        <div>
          <label class="block mb-2 font-medium"> Mot de passe </label>

          <input
            v-model="password"
            type="password"
            placeholder="********"
            class="w-full border rounded-lg px-4 py-2"
            required
          />
        </div>

        <!-- Error -->

        <p v-if="authStore.error" class="text-red-600 text-sm">
          {{ authStore.error }}
        </p>

        <!-- Button -->

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          <span v-if="!authStore.loading"> Se connecter </span>

          <span v-else> Connexion... </span>
        </button>
      </form>

      <!-- Test accounts -->

      <div class="mt-6 text-sm text-gray-500">
        <p class="font-semibold">Comptes test :</p>

        <p>Admin : admin@test.com / password</p>

        <p>Stagiaire : stagiaire@test.com / password</p>
      </div>
    </div>
  </div>
</template>
