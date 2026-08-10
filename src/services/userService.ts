import usersData from '@/mocks/users.json'
import type { User } from '@/types'
import { apiDelay, generateId } from './apiDelay'
import { activityLogService } from './activityLogService'

let users: User[] = JSON.parse(JSON.stringify(usersData))

export const userService = {
  async getAll(): Promise<User[]> {
    return apiDelay([...users])
  },

  async getById(id: string): Promise<User | undefined> {
    return apiDelay(users.find((u) => u.id === id))
  },

  async findByEmail(email: string): Promise<User | undefined> {
    return apiDelay(users.find((u) => u.email.toLowerCase() === email.toLowerCase()), 0)
  },

  async create(data: Omit<User, 'id' | 'createdAt' | 'avatarInitials'>, actorId: string): Promise<User> {
    const user: User = {
      ...data,
      id: generateId('u'),
      avatarInitials: `${data.prenom[0] ?? ''}${data.nom[0] ?? ''}`.toUpperCase(),
      createdAt: new Date().toISOString(),
    }
    users = [...users, user]
    await activityLogService.record(actorId, 'CREATE', 'user', user.id)
    return apiDelay(user, 350)
  },

  async update(id: string, patch: Partial<User>, actorId: string): Promise<User> {
    users = users.map((u) => (u.id === id ? { ...u, ...patch } : u))
    await activityLogService.record(actorId, 'UPDATE', 'user', id)
    return apiDelay(users.find((u) => u.id === id)!, 300)
  },

  async remove(id: string, actorId: string): Promise<void> {
    users = users.filter((u) => u.id !== id)
    await activityLogService.record(actorId, 'DELETE', 'user', id)
    return apiDelay(undefined, 300)
  },

  /** Accès interne synchrone, utilisé par authService (même source de vérité). */
  _getAllSync(): User[] {
    return users
  },
}
