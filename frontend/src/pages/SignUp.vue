<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { userMocks } from "../mocks/userMock";
import { toast } from "vue3-toastify";
import SwitchLang from "@components/base/SwitchLang.vue";
import UserForm from "@/components/forms/UserForm.vue";

const router = useRouter();
const { t } = useI18n();

function handleSubmit(user) {
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  // Ajouter un utilisateur
  users.push(user);
  console.log(users);
  // Sauvegarder
  localStorage.setItem("users", JSON.stringify(users));

  router.push("/login");
  toast.success(t("signUpSuccess"), {
    autoClose: 10000,
  });
}
</script>

<template>
  <div class="relative min-h-screen flex bg-gray-900">
    <div
      class="relative w-full flex flex-col justify-center px-6 py-12 lg:px-12"
    >
      <SwitchLang />

      <!-- SignUp CONTENT -->
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="../assets/logo.jpg"
          class="mx-auto h-24 w-24 rounded-full object-cover"
          alt="logo"
        />

        <h2
          class="mt-10 text-center text-2xl font-bold tracking-tight text-white"
        >
          {{ $t("createAccount") }}
        </h2>
      </div>

      <UserForm @submit="handleSubmit" />
    </div>
  </div>
</template>
