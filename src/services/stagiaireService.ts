import stagiairesData from '@/mocks/stagiaires.json'
import type { Stagiaire } from '@/types'
import { apiDelay, generateId } from './apiDelay'
import { activityLogService } from './activityLogService'
import { notificationService } from './notificationService'
import { userService } from './userService'

let stagiaires: Stagiaire[] = JSON.parse(JSON.stringify(stagiairesData))

export const stagiaireService = {
  async getAll(): Promise<Stagiaire[]> {
    return apiDelay([...stagiaires])
  },

  async getById(id: string): Promise<Stagiaire | undefined> {
    return apiDelay(stagiaires.find((s) => s.id === id))
  },

  async create(data: Omit<Stagiaire, 'id'>, actorId: string): Promise<Stagiaire> {
    const stagiaire: Stagiaire = { ...data, id: generateId('stg') }
    stagiaires = [...stagiaires, stagiaire]
    await activityLogService.record(actorId, 'CREATE', 'stagiaire', stagiaire.id)

    // Notifie les Responsables Stage (événement réel : nouveau stagiaire)
    const responsables = userService._getAllSync().filter((u) => u.roleId === 'role-responsable')
    const owner = userService._getAllSync().find((u) => u.id === data.userId)
    for (const resp of responsables) {
      await notificationService.notify(
        resp.id,
        `Un nouveau stagiaire (${owner?.prenom ?? ''} ${owner?.nom ?? ''}) a été ajouté.`,
        'stagiaire',
      )
    }
    return apiDelay(stagiaire, 350)
  },

  async update(id: string, patch: Partial<Stagiaire>, actorId: string): Promise<Stagiaire> {
    const before = stagiaires.find((s) => s.id === id)
    stagiaires = stagiaires.map((s) => (s.id === id ? { ...s, ...patch } : s))
    const after = stagiaires.find((s) => s.id === id)!
    await activityLogService.record(actorId, 'UPDATE', 'stagiaire', id)

    // Notifie le stagiaire si un tuteur vient de lui être affecté (événement réel)
    if (patch.tuteurId && before?.tuteurId !== patch.tuteurId) {
      const tuteur = userService._getAllSync().find((u) => u.id === patch.tuteurId)
      await notificationService.notify(
        after.userId,
        `${tuteur ? `${tuteur.prenom} ${tuteur.nom}` : 'Un tuteur'} a été désigné comme votre encadrant.`,
        'stagiaire',
      )
    }
    return apiDelay(after, 300)
  },

  async remove(id: string, actorId: string): Promise<void> {
    stagiaires = stagiaires.filter((s) => s.id !== id)
    await activityLogService.record(actorId, 'DELETE', 'stagiaire', id)
    return apiDelay(undefined, 300)
  },
}
