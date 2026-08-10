import { defineStore } from 'pinia'
import { notificationService } from '@/services/notificationService'
import type { AppNotification } from '@/types'

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({ items: [] as AppNotification[], loaded: false }),
  getters: {
    unreadCount: (state) => state.items.filter((n) => !n.lu).length,
  },
  actions: {
    async loadForUser(userId: string, force = false) {
      if (this.loaded && !force) return
      this.items = await notificationService.getForUser(userId)
      this.loaded = true
    },
    async markAsRead(id: string) {
      await notificationService.markAsRead(id)
      const n = this.items.find((x) => x.id === id)
      if (n) n.lu = true
    },
    async markAllAsRead(userId: string) {
      await notificationService.markAllAsRead(userId)
      this.items.forEach((n) => (n.lu = true))
    },
    reset() {
      this.items = []
      this.loaded = false
    },
  },
})
