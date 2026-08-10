<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import BaseCard from '@/components/base/BaseCard.vue'
import BaseTable from '@/components/base/BaseTable.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import BaseModal from '@/components/base/BaseModal.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'
import UserForm from '@/components/forms/UserForm.vue'
import { useUsersStore } from '@/stores/users'
import { useCatalogStore } from '@/stores/catalog'
import { useAuthStore } from '@/stores/auth'
import { usePermissions } from '@/composables/usePermissions'
import type { User } from '@/types'

const users = useUsersStore()
const catalog = useCatalogStore()
const auth = useAuthStore()
const perms = usePermissions()

onMounted(async () => {
  await Promise.all([users.loadAll(), catalog.loadAll()])
})

const search = ref('')
const filtered = computed(() =>
  users.items.filter((u) =>
    `${u.prenom} ${u.nom} ${u.email}`.toLowerCase().includes(search.value.toLowerCase()),
  ),
)

const columns = [
  { key: 'user', label: 'Utilisateur' },
  { key: 'role', label: 'Rôle' },
  { key: 'department', label: 'Département' },
  { key: 'status', label: 'Statut' },
  { key: 'actions', label: 'Actions', align: 'right' as const },
]

const modalOpen = ref(false)
const editing = ref<User | null>(null)
const saving = ref(false)
const confirmDelete = ref<User | null>(null)

function openCreate() {
  editing.value = null
  modalOpen.value = true
}
function openEdit(u: User) {
  editing.value = u
  modalOpen.value = true
}

async function handleSubmit(data: Omit<User, 'id' | 'createdAt' | 'avatarInitials'>) {
  if (!auth.user) return
  saving.value = true
  if (editing.value) await users.update(editing.value.id, data, auth.user.id)
  else await users.create(data, auth.user.id)
  saving.value = false
  modalOpen.value = false
}

async function toggleStatus(u: User) {
  if (!auth.user) return
  await users.update(u.id, { statut: u.statut === 'actif' ? 'inactif' : 'actif' }, auth.user.id)
}

async function handleDelete() {
  if (!confirmDelete.value || !auth.user) return
  await users.remove(confirmDelete.value.id, auth.user.id)
  confirmDelete.value = null
}
</script>

<template>
  <div>
    <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 class="text-2xl font-semibold text-slate-900 dark:text-white">Gestion des utilisateurs</h1>
      <BaseButton v-if="perms.can('users:create')" @click="openCreate">+ Nouvel utilisateur</BaseButton>
    </div>

    <BaseCard class="mb-5" :padded="true">
      <BaseInput v-model="search" placeholder="Rechercher par nom ou email..." />
    </BaseCard>

    <BaseCard :padded="false">
      <div class="p-5">
        <BaseTable :columns="columns">
          <tr v-for="u in filtered" :key="u.id" class="hover:bg-slate-50 dark:hover:bg-slate-800/40">
            <td class="flex items-center gap-3 px-4 py-3">
              <UserAvatar :initials="u.avatarInitials" :avatar-url="u.avatarUrl" size="sm" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">{{ u.prenom }} {{ u.nom }}</p>
                <p class="text-xs text-slate-500">{{ u.email }}</p>
              </div>
            </td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ catalog.roleById(u.roleId)?.nom }}</td>
            <td class="px-4 py-3 text-slate-600 dark:text-slate-300">{{ catalog.departmentById(u.departmentId ?? '')?.nom ?? '—' }}</td>
            <td class="px-4 py-3">
              <StatusBadge :tone="u.statut === 'actif' ? 'green' : 'grey'">{{ u.statut === 'actif' ? 'Actif' : 'Inactif' }}</StatusBadge>
            </td>
            <td class="px-4 py-3">
              <div class="flex justify-end gap-2">
                <BaseButton v-if="perms.can('users:update')" size="sm" variant="outlined" @click="openEdit(u)">Modifier</BaseButton>
                <BaseButton v-if="perms.can('users:update')" size="sm" variant="secondary" @click="toggleStatus(u)">
                  {{ u.statut === 'actif' ? 'Désactiver' : 'Activer' }}
                </BaseButton>
                <BaseButton v-if="perms.can('users:delete')" size="sm" variant="danger" @click="confirmDelete = u">Supprimer</BaseButton>
              </div>
            </td>
          </tr>
          <tr v-if="filtered.length === 0"><td colspan="5" class="px-4 py-8 text-center text-sm text-slate-400">Aucun utilisateur</td></tr>
        </BaseTable>
      </div>
    </BaseCard>

    <BaseModal :open="modalOpen" :title="editing ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'" @close="modalOpen = false">
      <UserForm :initial="editing" :saving="saving" @submit="handleSubmit" @cancel="modalOpen = false" />
    </BaseModal>

    <BaseModal :open="!!confirmDelete" title="Confirmer la suppression" size="sm" @close="confirmDelete = null">
      <p class="mb-5 text-sm text-slate-600 dark:text-slate-300">
        Supprimer définitivement <strong>{{ confirmDelete?.prenom }} {{ confirmDelete?.nom }}</strong> ? Cette action est irréversible.
      </p>
      <div class="flex justify-end gap-3">
        <BaseButton variant="secondary" @click="confirmDelete = null">Annuler</BaseButton>
        <BaseButton variant="danger" @click="handleDelete">Supprimer</BaseButton>
      </div>
    </BaseModal>
  </div>
</template>
