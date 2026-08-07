import type { Role } from './role'

export type { Role } from './role'

export interface User {
  id: number

  name: string

  email: string

  role: Role

  createdAt?: string

  isActive?: boolean
}
