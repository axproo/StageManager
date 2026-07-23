import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { globalGuards } from "./guards.ts";

let routerInstance: any;

declare module 'vue-router' {
    interface RouteMeta {
        public?: boolean;
        moduleId?: string;
        requiredPermissions?: string[];
        title?: string;
        group?: string;
        icon?: string;
    }
}

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/LoginPage.vue'),
        meta: { public: true, title: 'Login'}
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('../pages/RegisterPage.vue'),
        meta: { public: true, title: 'Register'}
    },
    {
        path: "/",
        component: () => import('../layouts/AppLayouts.vue'),
        children: [
            {
                path: 'redirect',
                name: 'home-redirect',
                component: () => import('../pages/HomeRedirect.vue'),
                meta: { public: false, title: 'Home Redirect'}
            },
            {
                path: 'Dashboard',
                name: 'dashboard',
                component: () => import('../pages/Dashboard.vue'),
                meta: { public: false, title: 'Dashboard'}
            },
        ]
    }
]

async function createDynamicRouter() {

    /** Création des routes statiiques et dynamiques */
    routerInstance = createRouter({
        history: createWebHistory(import.meta.env.VITE_API_BASE_URL || '/'),
        routes
    })
    
    routerInstance.beforeEach(globalGuards)
    return routerInstance;
}
export default createDynamicRouter