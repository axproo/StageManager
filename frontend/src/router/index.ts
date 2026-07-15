import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import LoginView from '../views/LoginView.vue'
import ErrorView from '../views/ErrorView.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/dashboard',
			name: 'dashboard',
			component: DashboardView
		},
        {
			path: '/login',
			name: 'login',
			component: LoginView
		},
        {
			path: '/error',
			name: 'error',
			component: ErrorView
		},
	]
})

export default router