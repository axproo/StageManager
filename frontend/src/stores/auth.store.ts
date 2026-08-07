import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { getStorage, setStorage, removeStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/utils/storageKeys'
import { ROLES } from '@/utils/constants'

type Role = typeof ROLES.ADMIN | typeof ROLES.RH | typeof ROLES.ENCADRANT | typeof ROLES.STAGIAIRE

interface AuthState {
  user: User | null

  token: string | null

  profileCompleted: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: getStorage<User | null>(STORAGE_KEYS.AUTH_USER, null),

    token: getStorage<string | null>(STORAGE_KEYS.AUTH_TOKEN, null),

    profileCompleted: getStorage<boolean>(STORAGE_KEYS.PROFILE_COMPLETED, false),
  }),

  getters: {
    isAuthenticated(state): boolean {
      return Boolean(state.token)
    },

    role(state): Role | null {
      return state.user?.role ?? null
    },

    hasRole(state) {
      return (roles: Role[]): boolean => {
        if (!state.user) {
          return false
        }

        return roles.includes(state.user.role as Role)
      }
    },
  },

  actions: {
    login(user: User, token: string): void {
      this.user = user

      this.token = token

      setStorage(STORAGE_KEYS.AUTH_TOKEN, token)

      setStorage(STORAGE_KEYS.AUTH_USER, user)

      if (user.role === ROLES.STAGIAIRE) {
        this.profileCompleted = getStorage<boolean>(STORAGE_KEYS.PROFILE_COMPLETED, false)
      } else {
        this.profileCompleted = true
      }
    },

    completeProfile(): void {
      this.profileCompleted = true

      setStorage(STORAGE_KEYS.PROFILE_COMPLETED, true)
    },

    logout(): void {
      this.user = null

      this.token = null

      this.profileCompleted = false

      removeStorage(STORAGE_KEYS.AUTH_TOKEN)

      removeStorage(STORAGE_KEYS.AUTH_USER)

      removeStorage(STORAGE_KEYS.PROFILE_COMPLETED)
    },
  },
})
