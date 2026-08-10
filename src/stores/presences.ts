import { defineStore } from 'pinia'
import { presenceService } from '@/services/presenceService'
import type { Presence } from '@/types'

export const usePresencesStore = defineStore('presences', {
  state: () => ({ items: [] as Presence[], loaded: false }),
  actions: {
    async loadAll(force = false) {
      if (this.loaded && !force) return
      this.items = await presenceService.getAll()
      this.loaded = true
    },
    async create(data: Omit<Presence, 'id'>, actorId: string) {
      const created = await presenceService.create(data, actorId)
      this.items.push(created)
      return created
    },
    async update(id: string, patch: Partial<Presence>, actorId: string) {
      const updated = await presenceService.update(id, patch, actorId)
      const idx = this.items.findIndex((p) => p.id === id)
      if (idx >= 0) this.items[idx] = updated
      return updated
    },
  },
  getters: {
    byStagiaire: (state) => (stagiaireId: string) =>
      state.items.filter((p) => p.stagiaireId === stagiaireId).sort((a, b) => b.date.localeCompare(a.date)),
  },
})
