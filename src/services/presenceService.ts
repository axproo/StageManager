import presencesData from '@/mocks/presences.json'
import type { Presence } from '@/types'
import { apiDelay, generateId } from './apiDelay'
import { activityLogService } from './activityLogService'
import { notificationService } from './notificationService'
import { stagiaireService } from './stagiaireService'

let presences: Presence[] = JSON.parse(JSON.stringify(presencesData))

export const presenceService = {
  async getAll(): Promise<Presence[]> {
    return apiDelay([...presences])
  },

  async getByStagiaire(stagiaireId: string): Promise<Presence[]> {
    return apiDelay(presences.filter((p) => p.stagiaireId === stagiaireId).sort((a, b) => b.date.localeCompare(a.date)))
  },

  async create(data: Omit<Presence, 'id'>, actorId: string): Promise<Presence> {
    const presence: Presence = { ...data, id: generateId('pr') }
    presences = [...presences, presence]
    await activityLogService.record(actorId, 'CREATE', 'presence', presence.id)
    await notifyIfNoteworthy(presence)
    return apiDelay(presence, 300)
  },

  async update(id: string, patch: Partial<Presence>, actorId: string): Promise<Presence> {
    presences = presences.map((p) => (p.id === id ? { ...p, ...patch } : p))
    const updated = presences.find((p) => p.id === id)!
    await activityLogService.record(actorId, 'UPDATE', 'presence', id)
    await notifyIfNoteworthy(updated)
    return apiDelay(updated, 300)
  },
}

/** Notifie le stagiaire uniquement pour un événement de présence significatif (absence/retard). */
async function notifyIfNoteworthy(presence: Presence) {
  if (presence.statut !== 'absent' && presence.statut !== 'retard') return
  const stagiaire = await stagiaireService.getById(presence.stagiaireId)
  if (!stagiaire) return
  const label = presence.statut === 'absent' ? 'absente' : 'en retard'
  await notificationService.notify(
    stagiaire.userId,
    `Votre présence du ${new Date(presence.date).toLocaleDateString('fr-FR')} a été enregistrée comme ${label}.`,
    'presence',
  )
}
