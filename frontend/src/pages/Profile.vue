<script setup>
import UserForm from "@/components/forms/UserForm.vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

function updateUser(data) {
  localStorage.setItem("currentUser", JSON.stringify(data));
  toast.success(t("operationSuccess"), {
    autoClose: 10000,
  });
  router.push("/dashboard");
}
</script>

<template>
  <div class="relative min-h-screen flex bg-[#200a83]">
    <div
      class="relative w-full flex flex-col justify-center px-6 py-12 lg:px-12"
    >
      <SwitchLang :scrolled="true" />

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
          {{ $t("updateAccount") }}
        </h2>
      </div>
      <UserForm :user="currentUser" :is-edit="true" @submit="updateUser" />
    </div>
  </div>
</template>
