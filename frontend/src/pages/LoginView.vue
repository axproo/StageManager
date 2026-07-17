<script setup>
import { useAppStore } from "@stores/user.store";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const router = useRouter();
const store = useAppStore();
const { locale } = useI18n();

function handleLogin() {
  store.login("John"); // Update the store
  router.push("/dashboard"); // Redirect to dashboard
}
</script>

<template>
  <div class="min-h-screen flex bg-gray-900">
    <!-- Partie gauche : Login -->
    <div
      class="w-full lg:w-2/5 flex flex-col justify-center px-6 py-12 lg:px-12"
    >
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          src="../assets/logo.jpg"
          alt="Your Company"
          class="mx-auto h-24 w-24 rounded-full object-cover"
        />

        <h2
          class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white"
        >
          {{ $t("login") }}
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" class="space-y-6">
          <div>
            <label
              for="email"
              class="block text-sm/6 font-medium text-gray-100"
            >
              {{ $t("email") }}
            </label>

            <div class="mt-2">
              <input
                id="email"
                type="email"
                name="email"
                required
                autocomplete="email"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label
                for="password"
                class="block text-sm/6 font-medium text-gray-100"
              >
                {{ $t("password") }}
              </label>
            </div>

            <div class="mt-2">
              <input
                id="password"
                type="password"
                name="password"
                required
                autocomplete="current-password"
                class="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
              />
            </div>
            <a
              href="#"
              class="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
            >
              {{ $t("forgotPassword") }}
            </a>
          </div>

          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            >
              {{ $t("signIn") }}
            </button>
          </div>
          <div
            class="py-3 flex items-center text-sm text-white before:flex-1 before:border-t before:border-stone-200 before:me-6 after:flex-1 after:border-t after:border-stone-200 after:ms-6 dark:text-neutral-200 dark:before:border-neutral-600 dark:after:border-neutral-600"
          >
            {{ $t("or") }}
          </div>
          <button
            type="button"
            class="py-2.5 px-3 w-full inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-stone-200 bg-white text-stone-800 shadow-2xs hover:bg-stone-50 focus:outline-hidden focus:bg-stone-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
          >
            <svg
              class="shrink-0 size-4"
              width="33"
              height="32"
              viewBox="0 0 33 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_4132_5805adfqfqdq121)">
                <path
                  d="M32.2566 16.36C32.2566 15.04 32.1567 14.08 31.9171 13.08H16.9166V19.02H25.7251C25.5454 20.5 24.5866 22.72 22.4494 24.22L22.4294 24.42L27.1633 28.1L27.4828 28.14C30.5189 25.34 32.2566 21.22 32.2566 16.36Z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M16.9166 32C21.231 32 24.8463 30.58 27.5028 28.12L22.4694 24.2C21.1111 25.14 19.3135 25.8 16.9366 25.8C12.7021 25.8 9.12677 23 7.84844 19.16L7.66867 19.18L2.71513 23L2.65521 23.18C5.2718 28.4 10.6648 32 16.9166 32Z"
                  fill="#34A853"
                ></path>
                <path
                  d="M7.82845 19.16C7.48889 18.16 7.28915 17.1 7.28915 16C7.28915 14.9 7.48889 13.84 7.80848 12.84V12.62L2.81499 8.73999L2.6552 8.81999C1.55663 10.98 0.937439 13.42 0.937439 16C0.937439 18.58 1.55663 21.02 2.63522 23.18L7.82845 19.16Z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M16.9166 6.18C19.9127 6.18 21.9501 7.48 23.0886 8.56L27.6027 4.16C24.8263 1.58 21.231 0 16.9166 0C10.6648 0 5.27181 3.6 2.63525 8.82L7.80851 12.84C9.10681 8.98 12.6821 6.18 16.9166 6.18Z"
                  fill="#EB4335"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_4132_5805adfqfqdq121">
                  <rect
                    width="32"
                    height="32"
                    fill="white"
                    transform="translate(0.937439)"
                  ></rect>
                </clipPath>
              </defs>
            </svg>
            {{ $t("signInWithGoogle") }}
          </button>
        </form>

        <p class="mt-10 text-center text-sm text-gray-400">
          {{ $t("notMember") }}
          <a
            href="#"
            class="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {{ $t("createAccount") }}
          </a>
        </p>
      </div>
    </div>

    <!-- Partie droite : Image -->
    <div class="hidden lg:block lg:w-3/5 overflow-hidden">
      <img
        src="../assets/desktop.jpg"
        alt="Login illustration"
        class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  </div>
</template>
