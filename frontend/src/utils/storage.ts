export function getStorage<T>(key: string, defaultValue: T): T {
  const data = localStorage.getItem(key)

  if (!data) {
    return defaultValue
  }

  try {
    return JSON.parse(data) as T
  } catch {
    return defaultValue
  }
}

export function setStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

export function removeStorage(key: string): void {
  localStorage.removeItem(key)
}

export function clearStorage(): void {
  localStorage.clear()
}
