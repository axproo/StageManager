<script setup lang="ts">
import { AppButton, AppInput } from '@/components/ui'

const email = defineModel<string>({
  default: '',
})

const props = defineProps<{
  title: string
  description: string
  buttonText: string
}>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()
</script>

<template>
  <div
    class="w-full min-h-screen flex items-center justify-center px-6 py-10 bg-gradient-to-br from-slate-950 via-blue-950 to-cyan-800"
  >
    <!-- Carte Glass -->

    <div
      class="w-full max-w-md bg-cyan-900/20 backdrop-blur-2xl rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.35)] border border-cyan-300/30 p-10"
    >
      <!-- Logo -->

      <div class="flex justify-center mb-6">
        <div
          class="w-28 h-28 rounded-full overflow-hidden border-4 border-cyan-300 bg-white/10 shadow-lg"
        >
          <img src="/axproo-logo.jpeg" alt="AXPROO" class="w-full h-full object-cover" />
        </div>
      </div>

      <!-- Titre -->

      <h1 class="text-3xl font-bold text-center text-cyan-300 mb-3">
        {{ props.title }}
      </h1>

      <!-- Description -->

      <p class="text-center text-white/70 mb-8">
        {{ props.description }}
      </p>

      <!-- Formulaire -->

      <form class="space-y-5" @submit.prevent="emit('submit')">
        <AppInput
          v-model="email"
          type="email"
          label="Adresse email"
          placeholder="exemple@axproo.com"
          variant="glass"
          required
        />

        <AppButton type="submit" class="w-full">
          {{ props.buttonText }}
        </AppButton>
      </form>
    </div>
  </div>
</template>
