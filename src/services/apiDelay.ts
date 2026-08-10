/** Simule la latence réseau d'un vrai backend, pour que le code appelant soit
 *  déjà écrit comme s'il consommait une vraie API (facilite le futur branchement). */
export function apiDelay<T>(value: T, ms = 300): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export function apiReject(message: string, ms = 300): Promise<never> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error(message)), ms))
}

let counter = 0
export function generateId(prefix: string): string {
  counter += 1
  return `${prefix}-${Date.now().toString(36)}${counter}`
}
