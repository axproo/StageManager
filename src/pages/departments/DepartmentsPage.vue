<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import DepartmentForm from '@/components/forms/DepartmentForm.vue'
import { useCatalogStore } from '@/stores/catalog'
import { useUsersStore } from '@/stores/users'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'
import type { Department } from '@/types'

const catalog = useCatalogStore()
const users = useUsersStore()
const auth = useAuthStore()
const perms = usePermissions()

onMounted(() => Promise.all([catalog.loadAll(), users.loadAll()]))

const memberCount = computed(() => (deptId: string) => users.items.filter((u) => u.departmentId === deptId).length)

const columns = [
  { key: 'name', label: 'Nom' },
  { key: 'description', label: 'Description' },
  { key: 'responsable', label: 'Responsable' },
  { key: 'members', label: 'Membres', align: 'center' as const },
  { key: 'actions', label: 'Actions', align: 'right' as const },
]

const modalOpen = ref(false)
const editing = ref<Department | null>(null)
const saving = ref(false)
const errorMsg = ref('')
const confirmDelete = ref<Department | null>(null)

function openCreate() {
  editing.value = null
  modalOpen.value = true
}
function openEdit(d: Department) {
  editing.value = d
  modalOpen.value = true
}

async function handleSubmit(data: Omit<Department, 'id'>) {
  if (!auth.user) return
  saving.value = true
  if (editing.value) await catalog.updateDepartment(editing.value.id, data, auth.user.id)
  else await catalog.createDepartment(data, auth.user.id)
  saving.value = false
  modalOpen.value = false
}

async function handleDelete() {
  if (!confirmDelete.value || !auth.user) return
  errorMsg.value = ''
  try {
    await catalog.removeDepartment(confirmDelete.value.id, auth.user.id)
    confirmDelete.value = null
  } catch (e) {
    errorMsg.value = e instanceof Error ? e.message : 'Erreur.'
  }
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Gestion des départements</h1>
      <BaseButton v-if="perms.can('departments:create')" @click="openCreate">+ Nouveau département</BaseButton>
    </div>

    <BaseCard :padded="false">
      <div class="p-5">
        <BaseTable :columns="columns">
          <tr v-for="d in catalog.departments" :key="d.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="px-4 py-3 font-medium text-slate-900 dark:text-white">{{ d.nom }}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ d.description }}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ d.responsableId ? `${users.byId(d.responsableId)?.prenom} ${users.byId(d.responsableId)?.nom}` : '—' }}</td>
            <td class="px-4 py-3 text-center text-slate-600 dark:text-slate-300">{{ memberCount(d.id) }}</td>
            <td class="px-4 py-3">
              <div class="flex justify-end gap-2">
                <BaseButton v-if="perms.can('departments:update')" size="sm" variant="outlined" @click="openEdit(d)">Modifier</BaseButton>
                <BaseButton v-if="perms.can('departments:delete')" size="sm" variant="danger" @click="confirmDelete = d">Supprimer</BaseButton>
              </div>
            </td>
          </tr>
        </BaseTable>
      </div>
    </BaseCard>

    <BaseModal :open="modalOpen" :title="editing ? 'Modifier le département' : 'Nouveau département'" @close="modalOpen = false">
      <DepartmentForm :initial="editing" :saving="saving" @submit="handleSubmit" @cancel="modalOpen = false" />
    </BaseModal>

    <BaseModal :open="!!confirmDelete" title="Confirmer la suppression" size="sm" @close="confirmDelete = null">
      <p class="mb-3 text-sm text-slate-600 dark:text-slate-300">Supprimer le département <strong>{{ confirmDelete?.nom }}</strong> ?</p>
      <StatusBadge v-if="errorMsg" tone="red" class="mb-3 block w-fit">{{ errorMsg }}</StatusBadge>
      <div class="flex justify-end gap-3">
        <BaseButton variant="secondary" @click="confirmDelete = null">Annuler</BaseButton>
        <BaseButton variant="danger" @click="handleDelete">Supprimer</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
