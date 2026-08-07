export interface ProfileDocuments {
  photo: File | null

  cv: File | null

  lettreMotivation: File | null
}

export interface ProfileFormData extends ProfileDocuments {
  // Informations personnelles

  nom: string

  prenom: string

  email: string

  telephone: string

  dateNaissance: string

  adresse: string

  // Informations académiques

  universite: string

  formation: string

  departement: string

  // Informations stage

  typeStage: string

  dateDebut: string

  dateFin: string

  // Compte

  password: string

  confirmPassword: string
}

export interface StagiaireProfile extends ProfileFormData {}
