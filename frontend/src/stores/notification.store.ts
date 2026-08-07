import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Notification } from '@/types/notification'
import { getStorage, setStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/utils/storageKeys'

export const useNotificationStore = defineStore('notification', () => {
  // ===========================
  // State
  // ===========================

  const notifications = ref<Notification[]>(
    getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, [])
  )

  // ===========================
  // Helpers
  // ===========================

  function saveNotifications(): void {
    setStorage(STORAGE_KEYS.NOTIFICATIONS, notifications.value)
  }

  // ===========================
  // Actions
  // ===========================

  function addNotification(notification: Omit<Notification, 'id' | 'read' | 'createdAt'>): void {
    notifications.value.unshift({
      id: Date.now(),

      read: false,

      createdAt: new Date().toISOString(),

      ...notification,
    })

    saveNotifications()
  }

  function loadNotifications(): void {
    notifications.value = getStorage<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, [])
  }

  function markAsRead(id: number): void {
    const notification = notifications.value.find((item) => item.id === id)

    if (!notification) return

    notification.read = true

    saveNotifications()
  }

  function markAllAsRead(): void {
    notifications.value = notifications.value.map((notification) => ({
      ...notification,

      read: true,
    }))

    saveNotifications()
  }

  function removeNotification(id: number): void {
    notifications.value = notifications.value.filter((notification) => notification.id !== id)

    saveNotifications()
  }

  // ===========================
  // Getters
  // ===========================

  const unreadCount = computed(
    () => notifications.value.filter((notification) => !notification.read).length
  )

  return {
    // State

    notifications,

    // Getters

    unreadCount,

    // Actions

    addNotification,

    loadNotifications,

    markAsRead,

    markAllAsRead,

    removeNotification,
  }
})
