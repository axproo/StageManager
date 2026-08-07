```vue
<script setup lang="ts">
import { ref, watch } from 'vue'

import { AppButton, AppInput, AppTextarea } from '@/components/ui'

import type { RoleItem } from '@/types/role'

const props = defineProps<{
  role?: RoleItem | null
}>()

const emit = defineEmits<{
  save: [role: Omit<RoleItem, 'id'>]
  close: []
}>()

const form = ref({
  name: '',
  description: '',
})

watch(
  () => props.role,
  (role) => {
    if (role) {
      form.value = {
        name: role.name,
        description: role.description,
      }
    } else {
      form.value = {
        name: '',
        description: '',
      }
    }
  },
  {
    immediate: true,
  }
)

function submit() {
  if (!form.value.name.trim() || !form.value.description.trim()) {
    return
  }

  emit('save', {
    name: form.value.name.trim(),
    description: form.value.description.trim(),
  })

  form.value = {
    name: '',
    description: '',
  }
}

function close() {
  emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4"
  >
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
      <h2 class="mb-6 text-2xl font-bold text-slate-800">
        {{ props.role ? 'Modifier le rôle' : 'Ajouter un rôle' }}
      </h2>

      <form class="space-y-5" @submit.prevent="submit">
        <AppInput v-model="form.name" label="Nom du rôle" placeholder="Ex : Administrateur RH" />

        <AppTextarea
          v-model="form.description"
          label="Description"
          placeholder="Description du rôle"
          :rows="4"
        />

        <div class="flex justify-end gap-3">
          <AppButton
            type="button"
            class="bg-gray-200 text-gray-800 hover:bg-gray-300"
            @click="close"
          >
            Annuler
          </AppButton>

          <AppButton type="submit" class="bg-blue-600 text-white hover:bg-blue-700">
            Enregistrer
          </AppButton>
        </div>
      </form>
    </div>
  </div>
</template>
```
