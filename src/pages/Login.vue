<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

import BaseButton from "@/components/base/BaseButton.vue";
import BaseInput from "@/components/base/BaseInput.vue";

const username = ref("");
const password = ref("");

const router = useRouter();
const store = useUserStore();

function login() {
  if (username.value && password.value) {
    store.login(username.value);
    router.push("/dashboard");
  }
}
</script>

<template>
  <div class="min-h-screen bg-slate-50 flex items-center justify-center p-6">

    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <div class="flex justify-center mb-6">
        <div class="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
          SM
        </div>
      </div>

      <h1 class="text-3xl font-bold text-center text-slate-800">
        StageManager
      </h1>

      <p class="text-center text-slate-500 mt-2 mb-8">
        Internship Management Platform
      </p>

      <div class="space-y-5">

        <BaseInput
          v-model="username"
          placeholder="Username"
        />

        <BaseInput
          v-model="password"
          type="password"
          placeholder="Password"
        />

        <BaseButton
          text="Sign In"
          :full="true"
          @click="login"
        />

      </div>

    </div>

  </div>
</template>