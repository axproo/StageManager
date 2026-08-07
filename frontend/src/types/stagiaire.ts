export type StagiaireStatus = 'PENDING' | 'ACTIVE' | 'REFUSED'

export interface Stagiaire {
  id: number

  // Informations personnelles

  nom: string

  prenom: string

  email: string

  telephone: string

  dateNaissance: string

  adresse: string

  // Informations académiques

  formation: string

  universite: string

  departement: string

  // Informations stage

  typeStage: string

  dateDebut: string

  dateFin: string

  // Documents

  photo?: string | null

  cv?: string | null

  lettreMotivation?: string | null

  // Gestion

  status: StagiaireStatus

  createdAt: string
}
