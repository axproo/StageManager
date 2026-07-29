<script setup>
import { reactive, watch, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import ButtonUi from "@components/ui/buttons/ButtonUi.vue";

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const { t } = useI18n();
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};
const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};
const props = defineProps({
  user: {
    type: Object,
    default: () => ({
      email: "",
      name: "",
      lastName: "",
      password: "",
    }),
  },

  isEdit: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["submit"]);

const form = reactive({
  email: "",
  name: "",
  lastName: "",
  password: "",
});

const errors = reactive({
  email: "",
  name: "",
  lastName: "",
  password: "",
});
console.log(props.user);
const buttonText = computed(() =>
  props.isEdit ? t("updateAccount") : t("createAccount"),
);
watch(
  () => props.user,
  (value) => {
    Object.assign(form, value);
  },
  { immediate: true },
);

function validate() {
  errors.email = "";
  errors.name = "";
  errors.lastName = "";
  errors.password = "";

  let valid = true;

  if (!form.email) {
    errors.email = t("requiredEmail");
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = t("invalidFormat");
    valid = false;
  }

  if (!form.name) {
    errors.name = t("requiredName");
    valid = false;
  }

  if (!form.lastName) {
    errors.lastName = t("requiredLastName");
    valid = false;
  }

  // Only validate password during signup
  if (!props.isEdit) {
    if (!form.password) {
      errors.password = t("requiredPassword");
      valid = false;
    } else if (form.password.length < 6) {
      errors.password = t("passwordLength");
      valid = false;
    }
  }

  return valid;
}

function submitForm() {
  if (!validate()) return;
  console.log(form);
  emit("submit", { ...form });
}
</script>

<template>
  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" @submit.prevent="submitForm">
      <div>
        <label class="block text-sm font-medium text-gray-100">
          {{ $t("email") }}
        </label>

        <input
          v-model="form.email"
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
          v-model="form.name"
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
          v-model="form.lastName"
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

        <div class="relative mt-2">
          <input
            v-model="form.password"
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
            v-model="form.confirmPassword"
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
          <p v-if="errors.confirmPassword" class="mt-1 text-sm text-red-400">
            {{ errors.confirmPassword }}
          </p>
        </div>
      </div>
      <ButtonUi :title="buttonText" variant="primary" />
    </form>
  </div>
</template>
