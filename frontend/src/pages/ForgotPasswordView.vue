<script setup>
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { toast } from "vue3-toastify";
import emailjs from "@emailjs/browser";

const { t } = useI18n();

const { locale } = useI18n();
const isLanguageOpen = ref(false);

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

const switchLanguage = (lang) => {
  locale.value = lang;
  isLanguageOpen.value = false; // ferme après sélection
};
</script>

<template>
  <div class="relative min-h-screen flex bg-gray-900">
    <div
      class="relative w-full flex flex-col justify-center px-6 py-12 lg:px-12"
    >
      <div class="absolute top-4 right-4 z-50">
        <div class="relative">
          <!-- Button -->
          <button
            class="flex items-center justify-center text-white hover:text-gray-600 p-2 rounded-full"
            type="button"
            @click="isLanguageOpen = !isLanguageOpen"
          >
            <!-- Globe icon -->
            <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle
                cx="12"
                cy="12"
                r="9"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M12 3C12 3 8.5 6 8.5 12C8.5 18 12 21 12 21"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                d="M12 3C12 3 15.5 6 15.5 12C15.5 18 12 21 12 21"
                stroke="currentColor"
                stroke-width="2"
              />
              <path d="M3 12H21" stroke="currentColor" stroke-width="2" />
            </svg>

            <svg
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 9-7 7-7-7"
              />
            </svg>
          </button>

          <!-- Dropdown -->
          <div
            v-if="isLanguageOpen"
            class="absolute right-0 mt-2 z-10 w-44 bg-white text-black border border-default-medium rounded-base shadow-lg"
          >
            <ul class="p-2 text-sm font-medium">
              <li>
                <button
                  class="flex items-center w-full p-2 hover:bg-neutral-tertiary-medium rounded"
                  @click="() => switchLanguage('en')"
                >
                  <span class="fi fi-gb fis mr-2" /> En
                </button>
              </li>
              <hr class="border-stone-800 dark:border-white" />

              <li>
                <button
                  class="flex items-center w-full p-2 hover:bg-neutral-tertiary-medium rounded"
                  @click="() => switchLanguage('fr')"
                >
                  <span class="fi fi-fr fis mr-2" />
                  Fr
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

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
          <button
            type="submit"
            class="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
          >
            {{ $t("sendResetLink") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
