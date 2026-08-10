import { computed, ref } from 'vue'
import { useUsersStore } from '@/stores/users'
import { useStagiairesStore } from '@/stores/stagiaires'
import { useTachesStore } from '@/stores/taches'
import { useCatalogStore } from '@/stores/catalog'
import { usePermissions } from './usePermissions'

export interface SearchResult {
  id: string
  category: 'users' | 'stagiaires' | 'taches' | 'departments'
  label: string
  sublabel: string
  to: string
}

/** Recherche multi-entités (ISSUE-211) — ne renvoie que ce que le rôle connecté peut consulter. */
export function useGlobalSearch() {
  const query = ref('')
  const users = useUsersStore()
  const stagiaires = useStagiairesStore()
  const taches = useTachesStore()
  const catalog = useCatalogStore()
  const perms = usePermissions()

  const results = computed<SearchResult[]>(() => {
    const q = query.value.trim().toLowerCase()
    if (q.length < 2) return []
    const out: SearchResult[] = []

    if (perms.can('users:read')) {
      for (const u of users.items) {
        if (`${u.prenom} ${u.nom} ${u.email}`.toLowerCase().includes(q)) {
          out.push({ id: u.id, category: 'users', label: `${u.prenom} ${u.nom}`, sublabel: u.email, to: '/users' })
        }
      }
    }

    for (const s of stagiaires.items) {
      if (!perms.canAccessStagiaire(s)) continue
      const owner = users.byId(s.userId)
      if (owner && `${owner.prenom} ${owner.nom} ${s.sujetStage}`.toLowerCase().includes(q)) {
        out.push({ id: s.id, category: 'stagiaires', label: `${owner.prenom} ${owner.nom}`, sublabel: s.sujetStage, to: '/stagiaires' })
      }
    }

    for (const t of taches.items) {
      if (!perms.canAccessTache(t)) continue
      if (t.titre.toLowerCase().includes(q)) {
        out.push({ id: t.id, category: 'taches', label: t.titre, sublabel: t.description, to: '/taches' })
      }
    }

    if (perms.can('departments:read')) {
      for (const d of catalog.departments) {
        if (d.nom.toLowerCase().includes(q)) {
          out.push({ id: d.id, category: 'departments', label: d.nom, sublabel: d.description, to: '/departments' })
        }
      }
    }

    return out.slice(0, 20)
  })

  return { query, results }
}
