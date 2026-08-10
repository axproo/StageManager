import type { User } from '@/types'
import { apiDelay, apiReject } from './apiDelay'
import { userService } from './userService'
import { activityLogService } from './activityLogService'

export const authService = {
  async login(email: string, password: string): Promise<User> {
    const user = userService._getAllSync().find((u) => u.email.toLowerCase() === email.toLowerCase())
    if (!user || user.motDePasse !== password) return apiReject('Identifiants invalides.')
    if (user.statut === 'inactif') return apiReject('Ce compte a été désactivé. Contactez un administrateur.')
    await activityLogService.record(user.id, 'LOGIN', 'session', null)
    return apiDelay(user, 450)
  },

  async logout(userId: string): Promise<void> {
    await activityLogService.record(userId, 'LOGOUT', 'session', null)
  },
}
