export function validateRequired(value: string): string {
  if (!value.trim()) {
    return 'Ce champ est obligatoire.'
  }
  return ''
}

export function validateName(value: string): string {
  if (!value.trim()) {
    return 'Ce champ est obligatoire.'
  }

  const regex = /^[A-Za-zÀ-ÿ\s'-]{2,50}$/

  if (!regex.test(value)) {
    return 'Seules les lettres sont autorisées.'
  }
  return ''
}

export function validatePhone(value: string): string {
  if (!value.trim()) {
    return 'Le téléphone est obligatoire.'
  }

  const regex = /^\+?[0-9]{8,15}$/

  if (!regex.test(value)) {
    return 'Numéro de téléphone invalide.'
  }
  return ''
}

export function validateBirthDate(value: string): string {
  if (!value) {
    return 'La date de naissance est obligatoire.'
  }

  const birth = new Date(value)
  const today = new Date()

  if (birth > today) {
    return 'Date invalide.'
  }
  return ''
}
