import type { Role } from './role'

export interface SidebarMenuItem {
  name: string
  icon: string
  to: string
  roles: Role[]
  notification?: boolean
  badge?: string
}