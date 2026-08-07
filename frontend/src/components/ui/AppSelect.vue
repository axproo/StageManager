<script setup lang="ts">
const model = defineModel()

defineProps({
  label: {
    type: String,
    default: '',
  },

  options: {
    type: Array as () => {
      label: string
      value: string | number
    }[],
    default: () => [],
  },

  placeholder: {
    type: String,
    default: 'Sélectionner',
  },

  disabled: {
    type: Boolean,
    default: false,
  },

  variant: {
    type: String,
    default: 'default',
  },

  error: {
    type: Boolean,
    default: false,
  },

  success: {
    type: Boolean,
    default: false,
  },

  errorMessage: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="w-full">
    <!-- Label -->

    <label
      v-if="label"
      class="block mb-2 text-sm font-medium"
      :class="variant === 'glass' ? 'text-white' : 'text-gray-700'"
    >
      {{ label }}
    </label>

    <div class="relative">
      <select
        v-model="model"
        :disabled="disabled"
        class="w-full px-4 py-3 rounded-xl outline-none transition appearance-none pr-10"
        :class="[
          /* Style normal / glass */

          variant === 'glass'
            ? `bg-white/10
text-white
backdrop-blur-md
focus:ring-2
focus:ring-cyan-300`
            : `bg-white
text-gray-900
focus:ring-2
focus:ring-blue-500
focus:border-blue-500`,

          /* Validation */

          error
            ? 'border-2 border-red-500'
            : success
              ? 'border-2 border-green-500'
              : variant === 'glass'
                ? 'border border-cyan-300/40'
                : 'border border-gray-300',

          /* Disabled */

          disabled ? 'bg-gray-100 cursor-not-allowed opacity-60' : '',
        ]"
      >
        <option disabled value="">
          {{ placeholder }}
        </option>

        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Icône succès -->

      <span
        v-if="success"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-green-500 font-bold pointer-events-none"
      >
        ✔
      </span>
    </div>

    <!-- Message erreur -->

    <p v-if="error && errorMessage" class="mt-1 text-sm text-red-400">
      {{ errorMessage }}
    </p>
  </div>
</template>
