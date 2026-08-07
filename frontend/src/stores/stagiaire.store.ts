import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { stagiaireService } from '@/services/stagiaire.service'
import type { Stagiaire, StagiaireStatus } from '@/types/stagiaire'
import { STAGIAIRE_STATUS } from '@/utils/constants'

export const useStagiaireStore = defineStore('stagiaire', () => {
  // ===========================
  // State
  // ===========================

  const stagiaires = ref<Stagiaire[]>(stagiaireService.getAll())

  const search = ref('')

  // ===========================
  // Helpers
  // ===========================

  function getByStatus(status: StagiaireStatus): Stagiaire[] {
    return stagiaires.value.filter((stagiaire) => stagiaire.status === status)
  }

  function getById(id: number): Stagiaire | undefined {
    return stagiaires.value.find((stagiaire) => stagiaire.id === id)
  }

  // ===========================
  // Actions
  // ===========================

  function loadStagiaires(): void {
    stagiaires.value = stagiaireService.getAll()
  }

  function addStagiaire(stagiaire: Omit<Stagiaire, 'id' | 'createdAt'>): void {
    stagiaireService.create(stagiaire)

    loadStagiaires()
  }

  function approveStagiaire(id: number): void {
    stagiaireService.updateStatus(id, STAGIAIRE_STATUS.ACTIVE)

    loadStagiaires()
  }

  function rejectStagiaire(id: number): void {
    stagiaireService.updateStatus(id, STAGIAIRE_STATUS.REFUSED)

    loadStagiaires()
  }

  function deleteStagiaire(id: number): void {
    stagiaireService.delete(id)

    loadStagiaires()
  }

  // ===========================
  // Getters
  // ===========================

  const pendingStagiaires = computed(() => getByStatus(STAGIAIRE_STATUS.PENDING))

  const activeStagiaires = computed(() => getByStatus(STAGIAIRE_STATUS.ACTIVE))

  const refusedStagiaires = computed(() => getByStatus(STAGIAIRE_STATUS.REFUSED))

  const filteredPendingStagiaires = computed(() => {
    const keyword = search.value.trim().toLowerCase()

    if (!keyword) {
      return pendingStagiaires.value
    }

    return pendingStagiaires.value.filter((stagiaire) => {
      return (
        stagiaire.nom.toLowerCase().includes(keyword) ||
        stagiaire.prenom.toLowerCase().includes(keyword) ||
        stagiaire.email.toLowerCase().includes(keyword) ||
        stagiaire.formation.toLowerCase().includes(keyword) ||
        stagiaire.departement.toLowerCase().includes(keyword)
      )
    })
  })

  const stats = computed(() => ({
    total: stagiaires.value.length,

    pending: pendingStagiaires.value.length,

    active: activeStagiaires.value.length,

    refused: refusedStagiaires.value.length,
  }))

  return {
    // State

    stagiaires,

    search,

    // Getters

    pendingStagiaires,

    activeStagiaires,

    refusedStagiaires,

    filteredPendingStagiaires,

    stats,

    pendingCount: computed(() => stats.value.pending),

    activeCount: computed(() => stats.value.active),

    refusedCount: computed(() => stats.value.refused),

    // Helpers

    getById,

    // Actions

    loadStagiaires,

    addStagiaire,

    approveStagiaire,

    rejectStagiaire,

    deleteStagiaire,
  }
})
