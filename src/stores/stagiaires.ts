import { defineStore } from 'pinia'
import { stagiaireService } from '@/services/stagiaireService'
import type { Stagiaire } from '@/types'

export const useStagiairesStore = defineStore('stagiaires', {
  state: () => ({ items: [] as Stagiaire[], loaded: false }),
  actions: {
    async loadAll(force = false) {
      if (this.loaded && !force) return
      this.items = await stagiaireService.getAll()
      this.loaded = true
    },
    async create(data: Omit<Stagiaire, 'id'>, actorId: string) {
      const created = await stagiaireService.create(data, actorId)
      this.items.push(created)
      return created
    },
    async update(id: string, patch: Partial<Stagiaire>, actorId: string) {
      const updated = await stagiaireService.update(id, patch, actorId)
      const idx = this.items.findIndex((s) => s.id === id)
      if (idx >= 0) this.items[idx] = updated
      return updated
    },
    async remove(id: string, actorId: string) {
      await stagiaireService.remove(id, actorId)
      this.items = this.items.filter((s) => s.id !== id)
    },
  },
  getters: {
    byId: (state) => (id: string) => state.items.find((s) => s.id === id),
    byUserId: (state) => (userId: string) => state.items.find((s) => s.userId === userId),
    byTuteur: (state) => (tuteurId: string) => state.items.filter((s) => s.tuteurId === tuteurId),
  },
})
