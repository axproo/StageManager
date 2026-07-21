<script setup>
import { useAppStore } from "@stores/user.store";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { userMocks } from "../mocks/userMock";
import { toast } from "vue3-toastify";

const router = useRouter();
const store = useAppStore();
const { t } = useI18n();

const { locale } = useI18n();
const isLanguageOpen = ref(false);

const email = ref("");
const name = ref("");
const lastName = ref("");
const password = ref("");
const confirmPassword = ref("");

const errors = ref({
  email: "",
  password: "",
  name: "",
  lastName: "",
  confirmPassword: "",
});

function validateForm() {
  errors.value.email = "";
  errors.value.password = "";
  errors.value.name = "";
  errors.value.lastName = "";
  errors.value.confirmPassword = "";

  let valid = true;

  // Validation email
  if (!email.value) {
    errors.value.email = t("requiredEmail");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errors.value.email = t("invalidFormat");
    valid = false;
  }

  // Validation name
  if (!name.value) {
    errors.value.name = t("requiredName");
    valid = false;
  }

  // Validation last name
  if (!lastName.value) {
    errors.value.lastName = t("requiredLastName");
    valid = false;
  }

  // Validation password
  if (!password.value) {
    errors.value.password = t("requiredPassword");
    valid = false;
  } else if (password.value.length < 6) {
    errors.value.password = t("passwordLength");
    valid = false;
  }

  // Validation confirm password
  if (!confirmPassword.value) {
    errors.value.confirmPassword = t("requiredConfirmPassword");
    valid = false;
  } else if (password.value !== confirmPassword.value) {
    errors.value.confirmPassword = t("passwordsDoNotMatch");
    valid = false;
  }

  return valid;
}

function handleSubmit() {
  if (!validateForm()) {
    return;
  }
  const user = {
    email: email.value,
    password: password.value,
    name: name.value,
    lastName: lastName.value,
  };
  userMocks.push(user);
  console.log(userMocks);
  router.push("/login");
  toast.success(t("signUpSuccess"), {
    autoClose: 1000,
  });
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
          {{ $t("createAccount") }}
        </h2>
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
          <div>
            <label class="block text-sm font-medium text-gray-100">
              {{ $t("name") }}
            </label>

            <input
              v-model="name"
              type="text"
              class="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
            <p v-if="errors.name" class="mt-1 text-sm text-red-400">
              {{ errors.name }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-100">
              {{ $t("lastName") }}
            </label>

            <input
              v-model="lastName"
              type="text"
              class="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
            <p v-if="errors.lastName" class="mt-1 text-sm text-red-400">
              {{ errors.lastName }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-100">
              {{ $t("password") }}
            </label>

            <input
              v-model="password"
              type="password"
              class="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-400">
              {{ errors.password }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-100">
              {{ $t("confirmPassword") }}
            </label>

            <input
              v-model="confirmPassword"
              type="password"
              class="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
            />
            <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-400">
              {{ errors.confirmPassword }}
            </p>
          </div>
          <button
            type="submit"
            class="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
          >
            {{ $t("createAccount") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
