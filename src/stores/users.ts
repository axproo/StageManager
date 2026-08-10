import { defineStore } from 'pinia'
import { userService } from '@/services/userService'
import type { User } from '@/types'

export const useUsersStore = defineStore('users', {
  state: () => ({ items: [] as User[], loaded: false }),
  actions: {
    async loadAll(force = false) {
      if (this.loaded && !force) return
      this.items = await userService.getAll()
      this.loaded = true
    },
    async create(data: Omit<User, 'id' | 'createdAt' | 'avatarInitials'>, actorId: string) {
      const created = await userService.create(data, actorId)
      this.items.push(created)
      return created
    },
    async update(id: string, patch: Partial<User>, actorId: string) {
      const updated = await userService.update(id, patch, actorId)
      const idx = this.items.findIndex((u) => u.id === id)
      if (idx >= 0) this.items[idx] = updated
      return updated
    },
    async remove(id: string, actorId: string) {
      await userService.remove(id, actorId)
      this.items = this.items.filter((u) => u.id !== id)
    },
  },
  getters: {
    byId: (state) => (id: string) => state.items.find((u) => u.id === id),
  },
})
