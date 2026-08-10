import { defineStore } from 'pinia'
import { taskService } from '@/services/taskService'
import type { Tache } from '@/types'

export const useTachesStore = defineStore('taches', {
  state: () => ({ items: [] as Tache[], loaded: false }),
  actions: {
    async loadAll(force = false) {
      if (this.loaded && !force) return
      this.items = await taskService.getAll()
      this.loaded = true
    },
    async create(data: Omit<Tache, 'id'>, actorId: string) {
      const created = await taskService.create(data, actorId)
      this.items.push(created)
      return created
    },
    async update(id: string, patch: Partial<Tache>, actorId: string) {
      const updated = await taskService.update(id, patch, actorId)
      const idx = this.items.findIndex((t) => t.id === id)
      if (idx >= 0) this.items[idx] = updated
      return updated
    },
    async remove(id: string, actorId: string) {
      await taskService.remove(id, actorId)
      this.items = this.items.filter((t) => t.id !== id)
    },
  },
  getters: {
    byAssignee: (state) => (userId: string) => state.items.filter((t) => t.assigneA === userId),
    byCreator: (state) => (userId: string) => state.items.filter((t) => t.creePar === userId),
  },
})
