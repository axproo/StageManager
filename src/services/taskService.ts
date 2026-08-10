import tachesData from '@/mocks/taches.json'
import type { Tache } from '@/types'
import { apiDelay, generateId } from './apiDelay'
import { activityLogService } from './activityLogService'
import { notificationService } from './notificationService'

let taches: Tache[] = JSON.parse(JSON.stringify(tachesData))

export const taskService = {
  async getAll(): Promise<Tache[]> {
    return apiDelay([...taches])
  },

  async getByAssignee(userId: string): Promise<Tache[]> {
    return apiDelay(taches.filter((t) => t.assigneA === userId))
  },

  async create(data: Omit<Tache, 'id'>, actorId: string): Promise<Tache> {
    const tache: Tache = { ...data, id: generateId('tk') }
    taches = [...taches, tache]
    await activityLogService.record(actorId, 'CREATE', 'tache', tache.id)
    await notificationService.notify(tache.assigneA, `Une nouvelle tâche vous a été assignée : "${tache.titre}".`, 'tache')
    return apiDelay(tache, 300)
  },

  async update(id: string, patch: Partial<Tache>, actorId: string): Promise<Tache> {
    taches = taches.map((t) => (t.id === id ? { ...t, ...patch } : t))
    const updated = taches.find((t) => t.id === id)!
    await activityLogService.record(actorId, 'UPDATE', 'tache', id)
    if (patch.statut === 'termine') {
      await notificationService.notify(updated.creePar, `La tâche "${updated.titre}" a été marquée comme terminée.`, 'tache')
    }
    return apiDelay(updated, 300)
  },

  async remove(id: string, actorId: string): Promise<void> {
    taches = taches.filter((t) => t.id !== id)
    await activityLogService.record(actorId, 'DELETE', 'tache', id)
    return apiDelay(undefined, 300)
  },
}
