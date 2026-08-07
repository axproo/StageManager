<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },

  title: {
    type: String,
    default: '',
  },

  width: {
    type: String,
    default: 'max-w-2xl',
  },

  persistent: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])

const close = () => {
  if (!props.persistent) {
    emit('update:modelValue', false)
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200"
      leave-active-class="transition duration-150"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        @click="close"
      >
        <div :class="[width, 'w-full bg-white rounded-2xl shadow-2xl overflow-hidden']" @click.stop>
          <!-- Header -->
          <div class="flex items-center justify-between px-6 py-4 border-b">
            <h2 class="text-lg font-semibold">
              {{ title }}
            </h2>

            <button class="text-gray-500 hover:text-gray-800 text-2xl" @click="close">×</button>
          </div>

          <!-- Body -->
          <div class="p-6">
            <slot />
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="px-6 py-4 border-t flex justify-end gap-3">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
