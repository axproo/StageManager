import type { User } from '@/types/user'

import usersData from '@/mocks/users.json'

interface MockUser extends User {
  password: string
}

const users = usersData as MockUser[]

export const userService = {
  getAll(): User[] {
    return users.map(({ password, ...user }) => user)
  },

  getById(id: number): User | undefined {
    const user = users.find((user) => user.id === id)

    if (!user) {
      return undefined
    }

    const { password, ...safeUser } = user

    return safeUser
  },

  getByEmail(email: string): User | undefined {
    const user = users.find((user) => user.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return undefined
    }

    const { password, ...safeUser } = user

    return safeUser
  },

  exists(email: string): boolean {
    return users.some((user) => user.email.toLowerCase() === email.toLowerCase())
  },

  checkPassword(email: string, password: string): boolean {
    const user = users.find((user) => user.email.toLowerCase() === email.toLowerCase())

    return user?.password === password
  },
}
