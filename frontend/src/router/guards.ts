import type { NavigationGuard } from "vue-router";

export const globalGuards: NavigationGuard = (to) => {
    const auth = true;
    
    /** Gestion des routes publiques */
    if (to.meta.public) {
        return true
    }

    /** Authentification requise */
    if  (!auth) {
        return {name: 'login', query: { redirect: to.fullPath}}
    }

    return true
}