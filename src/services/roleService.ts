import rolesData from '@/mocks/roles.json'
import type { Role } from '@/types'
import { apiDelay, apiReject, generateId } from './apiDelay'
import { activityLogService } from './activityLogService'
import { userService } from './userService'

let roles: Role[] = JSON.parse(JSON.stringify(rolesData))

export const roleService = {
  async getAll(): Promise<Role[]> {
    return apiDelay([...roles])
  },

  async getById(id: string): Promise<Role | undefined> {
    return apiDelay(roles.find((r) => r.id === id))
  },

  async create(data: Omit<Role, 'id' | 'systeme'>, actorId: string): Promise<Role> {
    const role: Role = { ...data, id: generateId('role') }
    roles = [...roles, role]
    await activityLogService.record(actorId, 'CREATE', 'role', role.id)
    return apiDelay(role, 300)
  },

  async update(id: string, patch: Partial<Role>, actorId: string): Promise<Role> {
    roles = roles.map((r) => (r.id === id ? { ...r, ...patch } : r))
    await activityLogService.record(actorId, 'UPDATE', 'role', id)
    return apiDelay(roles.find((r) => r.id === id)!, 300)
  },

  async remove(id: string, actorId: string): Promise<void> {
    const target = roles.find((r) => r.id === id)
    if (target?.systeme) return apiReject('Ce rôle système ne peut pas être supprimé.')
    const stillUsed = userService._getAllSync().some((u) => u.roleId === id)
    if (stillUsed) return apiReject('Impossible de supprimer un rôle encore assigné à des utilisateurs.')
    roles = roles.filter((r) => r.id !== id)
    await activityLogService.record(actorId, 'DELETE', 'role', id)
    return apiDelay(undefined, 300)
  },
}
