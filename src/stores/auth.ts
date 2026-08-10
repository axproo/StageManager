import { defineStore } from 'pinia'
import { authService } from '@/services/authService'
import { userService } from '@/services/userService'
import { roleService } from '@/services/roleService'
import type { Permission, Role, User } from '@/types'

const SESSION_KEY = 'sm_session'

interface StoredSession {
  userId: string
}

function readSession(): StoredSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  return raw ? (JSON.parse(raw) as StoredSession) : null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    role: null as Role | null,
    initializing: true,
    loading: false,
    error: '',
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  actions: {
    /** À appeler une fois au démarrage de l'app pour restaurer la session depuis sessionStorage. */
    async restoreSession() {
      this.initializing = true
      const session = readSession()
      if (session) {
        const user = await userService.getById(session.userId)
        if (user && user.statut === 'actif') {
          this.user = user
          this.role = (await roleService.getById(user.roleId)) ?? null
        } else {
          sessionStorage.removeItem(SESSION_KEY)
        }
      }
      this.initializing = false
    },

    async login(email: string, password: string) {
      this.loading = true
      this.error = ''
      try {
        const user = await authService.login(email, password)
        this.user = user
        this.role = (await roleService.getById(user.roleId)) ?? null
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }))
        return { ok: true as const }
      } catch (e) {
        this.error = e instanceof Error ? e.message : 'Erreur de connexion.'
        return { ok: false as const, error: this.error }
      } finally {
        this.loading = false
      }
    },

    async logout() {
      if (this.user) await authService.logout(this.user.id)
      this.user = null
      this.role = null
      sessionStorage.removeItem(SESSION_KEY)
    },

    async updateProfile(patch: Partial<User>) {
      if (!this.user) return
      const updated = await userService.update(this.user.id, patch, this.user.id)
      this.user = updated
    },

    /** Vérifie une permission contre le rôle actuellement connecté (ISSUE-203 → ISSUE-111 étendu). */
    hasPermission(permission: Permission): boolean {
      return this.role?.permissions.includes(permission) ?? false
    },
  },
})
