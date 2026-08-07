import { ROLES } from '@/utils/constants'
import type { SidebarMenuItem } from '@/types/sidebar'

export const sidebarMenu: SidebarMenuItem[] = [
  {
    name: 'Tableau de bord',
    to: '/dashboard',
    icon: '🏠',
    roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT, ROLES.STAGIAIRE],
  },

  {
    name: 'Utilisateurs',
    to: '/users',
    icon: '👥',
    roles: [ROLES.ADMIN],
  },

  {
    name: 'Rôles',
    to: '/roles',
    icon: '🛡️',
    roles: [ROLES.ADMIN],
  },

  {
    name: 'Permissions',
    to: '/permissions',
    icon: '🔐',
    roles: [ROLES.ADMIN],
  },

  {
    name: 'Utilisateurs & Rôles',
    to: '/user-roles',
    icon: '👤',
    roles: [ROLES.ADMIN],
  },

  {
    name: 'Départements',
    to: '/departments',
    icon: '🏢',
    roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT],
  },

  {
    name: 'Demandes stagiaires',
    to: '/stagiaires/demandes',
    icon: '🔔',
    roles: [ROLES.ADMIN],
    badge: 'pendingRequests',
    notification: true
  },

  {
    name: 'Stagiaires',
    to: '/stagiaires',
    icon: '🎓',
    roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT],
  },

  {
    name: 'Présences',
    to: '/presence',
    icon: '✅',
    roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT, ROLES.STAGIAIRE],
  },

  {
    name: 'Paramètres',
    to: '/settings',
    icon: '⚙️',
    roles: [ROLES.ADMIN],
  },
]
