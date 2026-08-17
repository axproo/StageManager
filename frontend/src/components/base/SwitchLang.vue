<script setup>
import { useI18n } from "vue-i18n";
import { ref } from "vue";

defineProps({
  scrolled: Boolean,
  bluePage: Boolean,
});
const { locale } = useI18n();
const isLanguageOpen = ref(false);
const switchLanguage = (lang) => {
  locale.value = lang;
  isLanguageOpen.value = false; // ferme après sélection
};
</script>
<template>
  <div class="absolute top-4 right-4 z-50">
    <div class="relative">
      <!-- Button -->
      <button
        :class="[
          'flex items-center justify-center p-2 rounded-full transition-colors',
          scrolled || bluePage
            ? 'text-white hover:text-gray-300'
            : 'text-gray-800 hover:text-gray-600',
        ]"
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
</template>
