<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Confirmation',
  },
  message: {
    type: String,
    default: 'Êtes-vous sûr de vouloir continuer ?',
  },
  confirmText: {
    type: String,
    default: 'Confirmer',
  },
  cancelText: {
    type: String,
    default: 'Annuler',
  },
})
const emit = defineEmits(['update:modelValue', 'confirm', 'cancel'])

const close = () => {
  emit('update:modelValue', false)
}
const confirm = () => {
  emit('confirm')

  close()
}
const cancel = () => {
  emit('cancel')

  close()
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
    >
      <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        <!-- Title -->

        <h2 class="text-xl font-semibold text-gray-800">
          {{ title }}
        </h2>

        <!-- Message -->

        <p class="mt-3 text-gray-600">
          {{ message }}
        </p>

        <!-- Buttons -->

        <div class="mt-6 flex justify-end gap-3">
          <button
            @click="cancel"
            class="px-5 py-2 rounded-xl border text-gray-700 hover:bg-gray-100 transition"
          >
            {{ cancelText }}
          </button>

          <button
            @click="confirm"
            class="px-5 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>
