import activityData from '@/mocks/activityLog.json'
import type { ActivityAction, ActivityLogEntry } from '@/types'
import { apiDelay, generateId } from './apiDelay'

let entries: ActivityLogEntry[] = JSON.parse(JSON.stringify(activityData))

export const activityLogService = {
  async getAll(): Promise<ActivityLogEntry[]> {
    return apiDelay([...entries].sort((a, b) => b.date.localeCompare(a.date)))
  },

  /** Enregistre une action métier importante. Appelé par les autres services — ne trace pas les clics UI. */
  async record(userId: string, action: ActivityAction, cibleType: string, cibleId: string | null): Promise<void> {
    const entry: ActivityLogEntry = {
      id: generateId('al'),
      userId,
      action,
      cibleType,
      cibleId,
      date: new Date().toISOString(),
    }
    entries = [...entries, entry]
    return apiDelay(undefined, 0)
  },
}
