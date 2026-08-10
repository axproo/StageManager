import { notificationService } from '@/services/notificationService'
import { useStageProgress } from './useStageProgress'
import { computed } from 'vue'
import type { Stagiaire, Tache, User } from '@/types'

/**
 * Évalue des conditions métier réelles (pointage manquant, stage bientôt terminé,
 * tâche en retard) et crée des notifications via le système EXISTANT (notifyOnce
 * évite les doublons). Ne crée pas un second système de notifications.
 */
export async function runSmartNotifications(params: {
  user: User
  myStagiaire?: Stagiaire
  pointeAujourdhui: boolean
  myLateTasks: Tache[]
}) {
  const { user, myStagiaire, pointeAujourdhui, myLateTasks } = params

  if (myStagiaire && myStagiaire.statut === 'en_cours' && !pointeAujourdhui) {
    await notificationService.notifyOnce(user.id, "Vous n'avez pas encore pointé votre présence aujourd'hui.", 'presence')
  }

  if (myStagiaire) {
    const stagiaireRef = computed(() => myStagiaire)
    const { progress } = useStageProgress(stagiaireRef)
    if (progress.value?.estBientotTermine) {
      await notificationService.notifyOnce(
        user.id,
        `Votre stage se termine dans ${progress.value.joursRestants} jour(s).`,
        'stagiaire',
      )
    }
  }

  for (const t of myLateTasks) {
    await notificationService.notifyOnce(user.id, `La tâche "${t.titre}" est en retard.`, 'tache')
  }
}
