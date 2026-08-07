import type { User } from '@/types/user'
import { removeStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/utils/storageKeys'
import { userService } from './user.service'

export interface LoginResponse {
  user: User
  token: string
}

export const authService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    const user = userService.getByEmail(email)

    if (!user) {
      throw new Error('Compte introuvable')
    }

    const isPasswordValid = userService.checkPassword(email, password)

    if (!isPasswordValid) {
      throw new Error('Mot de passe incorrect')
    }

    return {
      user,

      token: generateToken(),
    }
  },

  async checkAccount(email: string): Promise<boolean> {
    return userService.exists(email)
  },

  logout(): void {
    removeStorage(STORAGE_KEYS.AUTH_TOKEN)

    removeStorage(STORAGE_KEYS.AUTH_USER)

    removeStorage(STORAGE_KEYS.PROFILE_COMPLETED)
  },
}

function generateToken(): string {
  return `mock-jwt-token-${Date.now()}`
}
