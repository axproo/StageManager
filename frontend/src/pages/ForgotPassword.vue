<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { toast } from "vue3-toastify";
import emailjs from "@emailjs/browser";
import ButtonUi from "@components/ui/buttons/ButtonUi.vue";
import SwitchLang from "@components/base/SwitchLang.vue";

const { t } = useI18n();

const email = ref("");

const errors = ref({
  email: "",
});

watch(email, () => {
  errors.value.email = "";
});

function validateForm() {
  errors.value.email = "";

  let valid = true;

  // Validation email
  if (!email.value) {
    errors.value.email = t("requiredEmail");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = t("invalidFormat");
    valid = false;
  }

  return valid;
}

async function handleSubmit() {
  if (!validateForm()) {
    return;
  }
  localStorage.setItem("email", email.value);

  try {
    await emailjs.send(
      "service_ewuqarq",
      "template_aukj0ii",
      {
        email: email.value,
        reset_link: "http://localhost:5173/reset-password",
      },
      "D6SiaPBlCCg6RWhc-",
    );

    toast.success(t("resetLinkSuccess"));
  } catch (error) {
    toast.error(error, t("emailSendingFailed"));
  }
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
          {{ $t("forgotPassword") }}
        </h2>
        <p
          class="mt-10 text-center sm:mx-auto sm:w-full sm:max-w-sm tracking-tight text-white"
        >
          {{ $t("resetPasswordMail") }}
        </p>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-medium text-gray-100">
              {{ $t("email") }}
            </label>

            <input
              v-model="email"
              type="email"
              class="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
            <p v-if="errors.email" class="mt-1 text-sm text-red-400">
              {{ errors.email }}
            </p>
          </div>
          <ButtonUi :title="$t('sendResetLink')" variant="primary" />
        </form>
      </div>
    </div>
  </div>
</template>
