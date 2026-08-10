import { computed, type ComputedRef } from 'vue'
import type { Presence } from '@/types'

export interface AttendanceStats {
  total: number
  presents: number
  absences: number
  retards: number
  conges: number
  tauxPresence: number // %
  pointeAujourdhui: boolean
}

const TODAY = new Date().toISOString().slice(0, 10)

/** Statistiques de présence/absence — centralisées pour être réutilisées par tous
 *  les Dashboards (stagiaire, tuteur, responsable) sans recalcul dupliqué. */
export function useAttendanceStats(presences: ComputedRef<Presence[]>) {
  const stats = computed<AttendanceStats>(() => {
    const list = presences.value
    const presents = list.filter((p) => p.statut === 'present').length
    const absences = list.filter((p) => p.statut === 'absent').length
    const retards = list.filter((p) => p.statut === 'retard').length
    const conges = list.filter((p) => p.statut === 'conge').length
    const total = list.length
    const tauxPresence = total > 0 ? Math.round((presents / total) * 100) : 0
    const pointeAujourdhui = list.some((p) => p.date === TODAY)

    return { total, presents, absences, retards, conges, tauxPresence, pointeAujourdhui }
  })

  return { stats }
}
