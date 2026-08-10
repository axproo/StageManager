import notificationsData from '@/mocks/notifications.json'
import type { AppNotification, NotificationType } from '@/types'
import { apiDelay, generateId } from './apiDelay'

let notifications: AppNotification[] = JSON.parse(JSON.stringify(notificationsData))

export const notificationService = {
  async getForUser(userId: string): Promise<AppNotification[]> {
    return apiDelay(
      notifications.filter((n) => n.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    )
  },

  /** Crée une notification liée à un vrai événement métier (appelé par les autres services). */
  async notify(userId: string, message: string, type: NotificationType): Promise<void> {
    const notif: AppNotification = {
      id: generateId('nt'),
      userId,
      message,
      type,
      lu: false,
      createdAt: new Date().toISOString(),
    }
    notifications = [...notifications, notif]
    return apiDelay(undefined, 0)
  },

  /** Comme `notify`, mais évite les doublons pour un même message déjà envoyé aujourd'hui
   *  (utilisé par les notifications "intelligentes" recalculées à chaque connexion). */
  async notifyOnce(userId: string, message: string, type: NotificationType): Promise<void> {
    const today = new Date().toISOString().slice(0, 10)
    const alreadySent = notifications.some(
      (n) => n.userId === userId && n.message === message && n.createdAt.slice(0, 10) === today,
    )
    if (alreadySent) return
    await this.notify(userId, message, type)
  },

  async markAsRead(id: string): Promise<void> {
    notifications = notifications.map((n) => (n.id === id ? { ...n, lu: true } : n))
    return apiDelay(undefined, 150)
  },

  async markAllAsRead(userId: string): Promise<void> {
    notifications = notifications.map((n) => (n.userId === userId ? { ...n, lu: true } : n))
    return apiDelay(undefined, 200)
  },
}
