import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'
import type { Role } from '@/types/role'
import { ROLES } from '@/utils/constants'

// ===============================
// Pages publiques
// ===============================

import Home from '@/pages/public/Home.vue'
import NotFound from '@/pages/public/NotFound.vue'

// ===============================
// Auth
// ===============================

import Login from '@/pages/auth/Login.vue'
import CompleteProfile from '@/pages/auth/CompleteProfile.vue'
import CheckAccount from '@/pages/auth/CheckAccount.vue'

// ===============================
// Admin / Dashboard
// ===============================

import Dashboard from '@/pages/admin/Dashboard.vue'
import Users from '@/pages/admin/Users.vue'
import Roles from '@/pages/admin/Roles.vue'
import Permissions from '@/pages/admin/Permissions.vue'
import UserRoles from '@/pages/admin/UserRoles.vue'
import Departments from '@/pages/admin/Departments.vue'
import Stagiaires from '@/pages/admin/Stagiaires.vue'
import PendingStagiaires from '@/pages/admin/PendingStagiaires.vue'
import Presence from '@/pages/admin/Presence.vue'
import Settings from '@/pages/admin/Settings.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    // ===============================
    // PUBLIC
    // ===============================

    {
      path: '/',
      name: 'Home',
      component: Home,
    },

    {
      path: '/auth',
      name: 'CheckAccount',
      component: CheckAccount,
    },

    {
      path: '/login',
      name: 'Login',
      component: Login,
    },

    {
      path: '/complete-profile',
      name: 'CompleteProfile',
      component: CompleteProfile,
    },

    // ===============================
    // DASHBOARD
    // ===============================

    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT, ROLES.STAGIAIRE],
      },
    },

    // ===============================
    // USERS
    // ===============================

    {
      path: '/users',
      name: 'Users',
      component: Users,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN],
      },
    },

    // ===============================
    // ROLES
    // ===============================

    {
      path: '/roles',
      name: 'Roles',
      component: Roles,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN],
      },
    },

    {
      path: '/permissions',
      name: 'Permissions',
      component: Permissions,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN],
      },
    },

    {
      path: '/user-roles',
      name: 'UserRoles',
      component: UserRoles,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN],
      },
    },

    // ===============================
    // STAGIAIRES
    // ===============================

    {
      path: '/departments',
      name: 'Departments',
      component: Departments,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT],
      },
    },

    {
      path: '/stagiaires',
      name: 'Stagiaires',
      component: Stagiaires,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT],
      },
    },

    {
      path: '/stagiaires/demandes',
      name: 'PendingStagiaires',
      component: PendingStagiaires,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN],
      },
    },

    // ===============================
    // PRESENCE
    // ===============================

    {
      path: '/presence',
      name: 'Presence',
      component: Presence,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN, ROLES.RH, ROLES.ENCADRANT, ROLES.STAGIAIRE],
      },
    },

    // ===============================
    // SETTINGS
    // ===============================

    {
      path: '/settings',
      name: 'Settings',
      component: Settings,

      meta: {
        requiresAuth: true,

        roles: [ROLES.ADMIN],
      },
    },

    // ===============================
    // 404
    // ===============================

    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

// ===============================
// Protection globale des routes
// ===============================

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return {
      name: 'Login',
    }
  }

  if (to.meta.roles) {
    const roles = to.meta.roles as Role[]

    if (!authStore.hasRole(roles)) {
      return '/dashboard'
    }
  }

  return true
})

export default router
