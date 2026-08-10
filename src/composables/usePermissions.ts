import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { Permission, Stagiaire, Tache } from '@/types'

/**
 * Centralise la logique de permission à 3 niveaux (navigation, affichage, actions) —
 * pour que les guards de route, les v-if des templates et les services/stores
 * appliquent tous la même règle (voir directive #6 de la spec).
 */
export function usePermissions() {
  const auth = useAuthStore()

  const can = (permission: Permission): boolean => auth.hasPermission(permission)

  const isAdmin = computed(() => auth.role?.id === 'role-admin')
  const isResponsable = computed(() => auth.role?.id === 'role-responsable')
  const isTuteur = computed(() => auth.role?.id === 'role-tuteur')
  const isStagiaire = computed(() => auth.role?.id === 'role-stagiaire')

  /** Un stagiaire est-il dans le périmètre de l'utilisateur connecté ? (scope ligne par ligne) */
  function canAccessStagiaire(stagiaire: Stagiaire): boolean {
    if (isAdmin.value || isResponsable.value) return true
    if (isTuteur.value) return stagiaire.tuteurId === auth.user?.id
    if (isStagiaire.value) return stagiaire.userId === auth.user?.id
    return false
  }

  /** Une tâche est-elle dans le périmètre de l'utilisateur connecté ? */
  function canAccessTache(tache: Tache): boolean {
    if (isAdmin.value || isResponsable.value) return true
    if (isTuteur.value) return tache.creePar === auth.user?.id
    if (isStagiaire.value) return tache.assigneA === auth.user?.id
    return false
  }

  /** Un stagiaire connecté ne peut modifier QUE le statut de sa propre tâche, rien d'autre. */
  function canEditTacheFully(tache: Tache): boolean {
    if (isAdmin.value) return can('taches:update')
    if (isTuteur.value) return can('taches:update') && tache.creePar === auth.user?.id
    return false
  }

  return { can, isAdmin, isResponsable, isTuteur, isStagiaire, canAccessStagiaire, canAccessTache, canEditTacheFully }
}
