export type Role = 'ADMIN' | 'RESPONSABLE RH' | 'ENCADRANT' | 'STAGIAIRE'

export interface RoleItem {
  id: number
  name: string
  description: string
}