import { defineStore } from 'pinia'
import { activityLogService } from '@/services/activityLogService'
import type { ActivityAction, ActivityLogEntry } from '@/types'

export const useActivityLogStore = defineStore('activityLog', {
  state: () => ({ items: [] as ActivityLogEntry[], loaded: false }),
  actions: {
    async loadAll(force = false) {
      if (this.loaded && !force) return
      this.items = await activityLogService.getAll()
      this.loaded = true
    },
    /** Enregistre un événement métier ponctuel (photo, pointage, attestation...) — réutilise le même journal, pas un second système. */
    async record(userId: string, action: ActivityAction, cibleType: string, cibleId: string | null = null) {
      await activityLogService.record(userId, action, cibleType, cibleId)
      if (this.loaded) this.items = await activityLogService.getAll()
    },
  },
})
