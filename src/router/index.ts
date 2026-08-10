import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import type { Permission } from '@/types'

const routes: RouteRecordRaw[] = [
  // Racine : toujours une destination concrète
  {
    path: '/',
    redirect: () => {
      const auth = useAuthStore()
      return auth.isAuthenticated ? '/dashboard' : '/login'
    },
  },
  // Zone publique (auth)
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: { public: true },
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
      },
    ],
  },
  // Zone authentifiée
  {
    path: '/',
    component: () => import('@/layouts/AppLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/DashboardPage.vue'),
      },
      {
        path: 'users',
        name: 'users',
        component: () => import('@/pages/users/UsersPage.vue'),
        meta: { permission: 'users:read' as Permission },
      },
      {
        path: 'roles',
        name: 'roles',
        component: () => import('@/pages/roles/RolesPage.vue'),
        meta: { permission: 'roles:read' as Permission },
      },
      {
        path: 'departments',
        name: 'departments',
        component: () => import('@/pages/departments/DepartmentsPage.vue'),
        meta: { permission: 'departments:read' as Permission },
      },
      {
        path: 'stagiaires',
        name: 'stagiaires',
        component: () => import('@/pages/stagiaires/StagiairesPage.vue'),
        meta: { permission: 'stagiaires:read' as Permission },
      },
      {
        path: 'stagiaires/:id',
        name: 'stagiaire-detail',
        component: () => import('@/pages/stagiaires/StagiaireDetailPage.vue'),
        meta: { permission: 'stagiaires:read' as Permission },
      },
      {
        path: 'stagiaires/:id/attestation',
        name: 'stagiaire-attestation',
        component: () => import('@/pages/stagiaires/AttestationPage.vue'),
        meta: { permission: 'stagiaires:read' as Permission },
      },
      {
        path: 'presences',
        name: 'presences',
        component: () => import('@/pages/presences/PresencesPage.vue'),
        meta: { permission: 'presences:read' as Permission },
      },
      {
        path: 'taches',
        name: 'taches',
        component: () => import('@/pages/taches/TachesPage.vue'),
        meta: { permission: 'taches:read' as Permission },
      },
      {
        path: 'settings',
        name: 'settings',
        component: () => import('@/pages/settings/SettingsPage.vue'),
      },
      {
        path: 'activity-log',
        name: 'activity-log',
        component: () => import('@/pages/activity-log/ActivityLogPage.vue'),
        meta: { permission: 'activityLog:read' as Permission },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/common/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  // Routes protégées
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  // Permission granulaire
  const requiredPermission = to.meta.permission as Permission | undefined
  if (requiredPermission && !auth.hasPermission(requiredPermission)) {
    return { name: 'dashboard' }
  }

  // Déjà connecté → pas de page login
  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
