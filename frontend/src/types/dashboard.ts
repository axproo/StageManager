import type { StagiaireStatus } from './stagiaire'

export interface DashboardStat {
  title: string

  value: number

  icon: string

  color: string
}

export interface DashboardActivity {
  id?: number

  text: string

  time: string
}

export interface DashboardStagiaire {
  id: number

  nom: string

  departement: string

  date: string

  statut: StagiaireStatus
}
