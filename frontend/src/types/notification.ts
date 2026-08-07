export type NotificationType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'STAGIAIRE_REQUEST'

export interface Notification {
  id: number

  title: string

  message: string

  read: boolean

  createdAt: string

  type?: NotificationType

  stagiaireId?: number

  userId?: number
}
