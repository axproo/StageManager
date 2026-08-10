import { computed, type ComputedRef } from 'vue'
import type { Stagiaire } from '@/types'

export interface StageProgress {
  dureeTotaleJours: number
  joursEcoules: number
  joursRestants: number
  pourcentage: number
  estTermine: boolean
  estBientotTermine: boolean // ≤ 7 jours restants
}

/**
 * Calcul de progression d'un stage à partir de dateDebut/dateFin.
 * Centralisé ici pour ne JAMAIS dupliquer ce calcul dans plusieurs composants
 * (Dashboard stagiaire, fiche détail, alertes...).
 */
export function useStageProgress(stagiaire: ComputedRef<Stagiaire | undefined>) {
  const progress = computed<StageProgress | null>(() => {
    const s = stagiaire.value
    if (!s) return null

    const start = new Date(s.dateDebut).getTime()
    const end = new Date(s.dateFin).getTime()
    const now = Date.now()
    const dayMs = 24 * 60 * 60 * 1000

    const dureeTotaleJours = Math.max(1, Math.round((end - start) / dayMs))
    const joursEcoulesRaw = Math.round((now - start) / dayMs)
    const joursEcoules = Math.min(Math.max(joursEcoulesRaw, 0), dureeTotaleJours)
    const joursRestants = Math.max(dureeTotaleJours - joursEcoules, 0)
    const pourcentage = Math.round((joursEcoules / dureeTotaleJours) * 100)

    return {
      dureeTotaleJours,
      joursEcoules,
      joursRestants,
      pourcentage: Math.min(100, Math.max(0, pourcentage)),
      estTermine: now > end,
      estBientotTermine: joursRestants <= 7 && joursRestants > 0 && now <= end,
    }
  })

  return { progress }
}
