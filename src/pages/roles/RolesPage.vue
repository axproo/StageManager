<script setup lang="ts">
import { onMounted, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import RoleForm from '@/components/forms/RoleForm.vue'
import { useCatalogStore } from '@/stores/catalog'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'
import type { Role } from '@/types'

const catalog = useCatalogStore()
const auth = useAuthStore()
const perms = usePermissions()

onMounted(() => catalog.loadAll())

const columns = [
  { key: 'name', label: 'Nom' },
  { key: 'description', label: 'Description' },
  { key: 'permissions', label: 'Permissions' },
  { key: 'actions', label: 'Actions', align: 'right' as const },
]

const modalOpen = ref(false)
const editing = ref<Role | null>(null)
const saving = ref(false)
const errorMsg = ref('')
const confirmDelete = ref<Role | null>(null)

function openCreate() {
  editing.value = null
  modalOpen.value = true
}
function openEdit(r: Role) {
  editing.value = r
  modalOpen.value = true
}

async function handleSubmit(data: Omit<Role, 'id' | 'systeme'>) {
  if (!auth.user) return
  saving.value = true
  if (editing.value) await catalog.updateRole(editing.value.id, data, auth.user.id)
  else await catalog.createRole(data, auth.user.id)
  saving.value = false
  modalOpen.value = false
}

async function handleDelete() {
  if (!confirmDelete.value || !auth.user) return
  errorMsg.value = ''
  try {
    await catalog.removeRole(confirmDelete.value.id, auth.user.id)
    confirmDelete.value = null
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : 'Erreur.'
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Gestion des rôles</h1>
      <BaseButton v-if="perms.can('roles:create')" @click="openCreate">+ Nouveau rôle</BaseButton>
    </div>

    <BaseCard :padded="false">
      <div class="p-5">
        <BaseTable :columns="columns">
          <tr v-for="r in catalog.roles" :key="r.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">{{ r.nom }}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ r.description }}</td>
            <td class="px-4 py-3 text-slate-500">{{ r.permissions.length }} permission(s)</td>
            <td class="px-4 py-3">
              <div class="flex justify-end gap-2">
                <BaseButton v-if="perms.can('roles:update')" size="sm" variant="outlined" @click="openEdit(r)">Modifier</BaseButton>
                <BaseButton v-if="perms.can('roles:delete')" size="sm" variant="danger" :disabled="r.systeme" @click="confirmDelete = r">
                  Supprimer
                </BaseButton>
              </div>
            </td>
          </tr>
        </BaseTable>
      </div>
    </BaseCard>

    <BaseModal :open="modalOpen" :title="editing ? 'Modifier le rôle' : 'Nouveau rôle'" size="lg" @close="modalOpen = false">
      <RoleForm :initial="editing" :saving="saving" @submit="handleSubmit" @cancel="modalOpen = false" />
    </BaseModal>

    <BaseModal :open="!!confirmDelete" title="Confirmer la suppression" size="sm" @close="confirmDelete = null">
      <p class="mb-3 text-sm text-slate-600 dark:text-slate-300">Supprimer le rôle <strong>{{ confirmDelete?.nom }}</strong> ?</p>
      <StatusBadge v-if="errorMsg" tone="red" class="mb-3 block w-fit">{{ errorMsg }}</StatusBadge>
      <div class="flex justify-end gap-3">
        <BaseButton variant="secondary" @click="confirmDelete = null">Annuler</BaseButton>
        <BaseButton variant="danger" @click="handleDelete">Supprimer</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
