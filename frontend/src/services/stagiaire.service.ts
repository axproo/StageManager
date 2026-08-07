import type { Stagiaire, StagiaireStatus } from '@/types/stagiaire'
import mockStagiaires from '@/mocks/stagiaires.json'
import { getStorage, setStorage } from '@/utils/storage'
import { STORAGE_KEYS } from '@/utils/storageKeys'

const STORAGE_KEY = STORAGE_KEYS.STAGIAIRES

function initializeStorage(): void {
  const stagiaires = getStorage<Stagiaire[]>(STORAGE_KEY, [])

  if (stagiaires.length === 0) {
    setStorage(STORAGE_KEY, mockStagiaires as Stagiaire[])
  }
}

initializeStorage()

export const stagiaireService = {
  getAll(): Stagiaire[] {
    return getStorage<Stagiaire[]>(STORAGE_KEY, [])
  },

  getById(id: number): Stagiaire | undefined {
    return stagiaireService.getAll().find((stagiaire) => stagiaire.id === id)
  },

  getByStatus(status: StagiaireStatus): Stagiaire[] {
    return stagiaireService.getAll().filter((stagiaire) => stagiaire.status === status)
  },

  create(stagiaire: Omit<Stagiaire, 'id' | 'createdAt'>): Stagiaire {
    const stagiaires = stagiaireService.getAll()

    const newStagiaire: Stagiaire = {
      ...stagiaire,

      id: Date.now(),

      createdAt: new Date().toISOString(),
    }

    stagiaires.push(newStagiaire)

    setStorage(STORAGE_KEY, stagiaires)

    return newStagiaire
  },

  updateStatus(id: number, status: StagiaireStatus): void {
    const stagiaires = stagiaireService.getAll()

    const stagiaire = stagiaires.find((item) => item.id === id)

    if (!stagiaire) return

    stagiaire.status = status

    setStorage(STORAGE_KEY, stagiaires)
  },

  delete(id: number): void {
    const stagiaires = stagiaireService.getAll().filter((stagiaire) => stagiaire.id !== id)

    setStorage(STORAGE_KEY, stagiaires)
  },
}
