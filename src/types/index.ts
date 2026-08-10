// ---------------------------------------------------------------------------
// Rôles & Permissions
// ---------------------------------------------------------------------------

/** Une permission est une chaîne "module:action". Vérifiée dynamiquement contre
 *  le tableau `permissions` du rôle de l'utilisateur connecté (ISSUE-203). */
export type Permission =
  | 'users:read' | 'users:create' | 'users:update' | 'users:delete'
  | 'roles:read' | 'roles:create' | 'roles:update' | 'roles:delete'
  | 'departments:read' | 'departments:create' | 'departments:update' | 'departments:delete'
  | 'stagiaires:read' | 'stagiaires:create' | 'stagiaires:update' | 'stagiaires:delete'
  | 'presences:read' | 'presences:create' | 'presences:update'
  | 'taches:read' | 'taches:create' | 'taches:update' | 'taches:delete'
  | 'activityLog:read'
  | 'settings:global'

export interface Role {
  id: string
  nom: string
  description: string
  permissions: Permission[]
  /** Rôle système = ne peut pas être supprimé (garantit qu'il reste toujours au moins un Administrateur possible) */
  systeme?: boolean
}

export interface User {
  id: string
  prenom: string
  nom: string
  email: string
  motDePasse: string // mock uniquement — jamais dans un vrai backend
  roleId: string
  departmentId: string | null
  statut: 'actif' | 'inactif'
  avatarInitials: string
  /** Photo de profil (mock frontend uniquement : data URL base64, pas de stockage serveur). Fallback sur avatarInitials si absente. */
  avatarUrl?: string
  createdAt: string
}

export interface AuthSession {
  userId: string
  authenticatedAt: string
}

// ---------------------------------------------------------------------------
// Départements
// ---------------------------------------------------------------------------

export interface Department {
  id: string
  nom: string
  description: string
  responsableId: string | null
}

// ---------------------------------------------------------------------------
// Stagiaires
// ---------------------------------------------------------------------------

export type StagiaireStatut = 'a_venir' | 'en_cours' | 'termine'
export type StageModalite = 'presentiel' | 'distanciel' | 'hybride'

export interface Stagiaire {
  id: string
  userId: string
  departmentId: string
  tuteurId: string | null
  dateDebut: string
  dateFin: string
  sujetStage: string
  statut: StagiaireStatut
  modalite: StageModalite
}

// ---------------------------------------------------------------------------
// Présences
// ---------------------------------------------------------------------------

export type PresenceStatut = 'present' | 'absent' | 'retard' | 'conge'
export type PresenceMode = 'presentiel' | 'en_ligne'

export interface Presence {
  id: string
  stagiaireId: string
  date: string
  statut: PresenceStatut
  /** Mode de la journée — surtout pertinent pour un stage hybride (ISSUE-206 enrichi). */
  mode: PresenceMode
  heureArrivee: string | null
  heureDepart: string | null
  saisiPar: string | null
}

// ---------------------------------------------------------------------------
// Tâches
// ---------------------------------------------------------------------------

export type TacheStatut = 'a_faire' | 'en_cours' | 'termine'
export type TachePriorite = 'basse' | 'moyenne' | 'haute'

export interface Tache {
  id: string
  titre: string
  description: string
  assigneA: string // userId (stagiaire)
  creePar: string // userId (tuteur/responsable)
  statut: TacheStatut
  priorite: TachePriorite
  dateEcheance: string
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------

export type NotificationType = 'tache' | 'presence' | 'stagiaire' | 'systeme'

export interface AppNotification {
  id: string
  userId: string
  message: string
  type: NotificationType
  lu: boolean
  createdAt: string
}

// ---------------------------------------------------------------------------
// Journal d'activité
// ---------------------------------------------------------------------------

export type ActivityAction = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT'

export interface ActivityLogEntry {
  id: string
  userId: string
  action: ActivityAction
  cibleType: string
  cibleId: string | null
  date: string
}
