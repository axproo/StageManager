<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { ref, watch } from "vue";
import { userMocks } from "../mocks/userMock";
import { toast } from "vue3-toastify";

const router = useRouter();
const { t } = useI18n();

const { locale } = useI18n();
const isLanguageOpen = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const password = ref("");
const confirmPassword = ref("");

const errors = ref({
  password: "",
  confirmPassword: "",
});

function validateForm() {
  errors.value.password = "";
  errors.value.confirmPassword = "";
  let valid = true;

  // Validation password
  if (!password.value) {
    errors.value.password = t("requiredPassword");
    valid = false;
  } else if (password.value.length < 6) {
    errors.value.password = t("passwordLength");
    valid = false;
  }
  const users = JSON.parse(localStorage.getItem("users") || "[]");
  const email = localStorage.getItem("email");

  const user = users.find((u) => u.email === email);
  console.log(user);

  if (password.value === user.password) {
    errors.value.password = t("passwordMatchesOldPassword");
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
watch(password, () => {
  errors.value.password = "";
});
watch(confirmPassword, () => {
  errors.value.confirmPassword = "";
});
function handleSubmit() {
  const email = localStorage.getItem("email");
  if (!validateForm()) {
    return;
  }
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find((u) => u.email === email);
  if (!user) {
    toast.error(t("userNotFound"));
    return;
  }
  user.password = password.value;
  // Sauvegarder les modifications
  localStorage.setItem("users", JSON.stringify(users));

  toast.success(t("passwordUpdated"));
  router.push("/login");
}

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

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

      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="../assets/logo.jpg"
          class="mx-auto h-24 w-24 rounded-full object-cover"
          alt="logo"
        />

        <h2
          class="mt-10 text-center text-2xl font-bold tracking-tight text-white"
        >
          {{ $t("resetPassword") }}
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-sm font-medium text-gray-100">
              {{ $t("password") }}
            </label>

            <div class="relative mt-2">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                class="block w-full rounded-md bg-white/5 px-3 py-2 pr-10 text-white outline outline-1 outline-white/10"
              />

              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg
                  v-if="!showPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 640 512"
                >
                  <path
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45z"
                  />
                </svg>
              </button>
            </div>

            <p v-if="errors.password" class="mt-1 text-sm text-red-400">
              {{ errors.password }}
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-100">
              {{ $t("confirmPassword") }}
            </label>
            <div class="relative mt-2">
              <input
                v-model="confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                class="mt-2 block w-full rounded-md bg-white/5 px-3 py-2 text-white outline outline-1 outline-white/10"
              />
              <button
                type="button"
                @click="toggleConfirmPassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg
                  v-if="!showConfirmPassword"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 576 512"
                >
                  <path
                    d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"
                  />
                </svg>

                <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 fill-current"
                  viewBox="0 0 640 512"
                >
                  <path
                    d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45z"
                  />
                </svg>
              </button>
              <p
                v-if="errors.confirmPassword"
                class="mt-1 text-sm text-red-400"
              >
                {{ errors.confirmPassword }}
              </p>
            </div>
          </div>
          <button
            type="submit"
            class="w-full rounded-md bg-indigo-500 py-2 text-white font-semibold hover:bg-indigo-400"
          >
            {{ $t("resetPassword") }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
