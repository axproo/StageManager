import { computed, ref, watch } from 'vue'

import {
  validateName,
  validatePhone,
  validateBirthDate,
  validateRequired,
} from '@/utils/validators'

import type { ProfileFormData } from '@/types/profile'

type ProfileErrors = Partial<Record<keyof ProfileFormData, string>>

const initialForm: ProfileFormData = {
  nom: '',
  prenom: '',
  email: '',
  telephone: '',
  dateNaissance: '',
  adresse: '',

  universite: '',
  formation: '',
  departement: '',

  typeStage: '',
  dateDebut: '',
  dateFin: '',

  photo: null,
  cv: null,
  lettreMotivation: null,

  password: '',
  confirmPassword: '',
}

const requiredFields: (keyof ProfileFormData)[] = [
  'nom',
  'prenom',
  'email',
  'telephone',
  'dateNaissance',
  'adresse',

  'universite',
  'formation',
  'departement',

  'typeStage',
  'dateDebut',
  'dateFin',

  'password',
  'confirmPassword',
]

export function useProfileForm(onSubmit: (data: ProfileFormData) => void) {
  const form = ref<ProfileFormData>({
    ...initialForm,
  })

  const errors = ref<ProfileErrors>({})

  watch(
    () => form.value.nom,
    (value) => {
      errors.value.nom = validateName(value)
    }
  )

  watch(
    () => form.value.prenom,
    (value) => {
      errors.value.prenom = validateName(value)
    }
  )

  watch(
    () => form.value.telephone,
    (value) => {
      errors.value.telephone = validatePhone(value)
    }
  )

  watch(
    () => form.value.dateNaissance,
    (value) => {
      errors.value.dateNaissance = validateBirthDate(value)
    }
  )

  watch(
    () => form.value.email,
    (value) => {
      if (!value) {
        errors.value.email = ''
        return
      }

      errors.value.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Email invalide'
    }
  )

  requiredFields.forEach((field) => {
    watch(
      () => form.value[field],

      (value) => {
        if (
          ![
            'nom',
            'prenom',
            'email',
            'telephone',
            'dateNaissance',
            'password',
            'confirmPassword',
          ].includes(field)
        ) {
          errors.value[field] = validateRequired(String(value))
        }
      }
    )
  })

  watch(
    () => form.value.password,

    (value) => {
      errors.value.password =
        value.length >= 6 ? '' : 'Le mot de passe doit contenir au moins 6 caractères'
    }
  )

  watch(
    () => form.value.confirmPassword,

    (value) => {
      errors.value.confirmPassword =
        value === form.value.password ? '' : 'Les mots de passe ne correspondent pas'
    }
  )

  function isValid(field: keyof ProfileFormData) {
    return Boolean(form.value[field]) && errors.value[field] === ''
  }

  const isFormValid = computed(() => {
    const completed = requiredFields.every((field) => Boolean(form.value[field]))

    const noErrors = Object.values(errors.value).every((error) => error === '')

    return completed && noErrors
  })

  function validateForm() {
    requiredFields.forEach((field) => {
      if (!form.value[field]) {
        errors.value[field] = 'Ce champ est obligatoire'
      }
    })

    return Object.values(errors.value).every((error) => error === '')
  }

  function submitForm() {
    if (!validateForm()) {
      return
    }

    onSubmit(form.value)
  }

  return {
    form,

    errors,

    isFormValid,

    isValid,

    submitForm,
  }
}
