export interface InternshipType {
  label: string
  value: string
}

export const internshipTypes: InternshipType[] = [
  {
    label: "Stage d'initiation",
    value: 'initiation',
  },

  {
    label: 'Stage de perfectionnement',
    value: 'perfectionnement',
  },

  {
    label: 'Projet de fin d’études',
    value: 'pfe',
  },
]
