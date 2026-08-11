export type StatusVariant = "amber" | "green" | "red" | "blue" | "gray";

interface StatusConfig {
  label: string;
  variant: StatusVariant;
  icon: string;
  bg: string;
  text: string;
  ring: string;
}

/**
 * Mapping unique statut -> couleur/icône/label.
 * Toute nouvelle page (Interns, Attendance, Tasks...) doit utiliser cette
 * table plutôt que de redéfinir ses propres couleurs.
 */
export const STATUS_CONFIG: Record<string, StatusConfig> = {
  PENDING: { label: "En attente", variant: "amber", icon: "clock", bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100" },
  APPROVED: { label: "Acceptée", variant: "green", icon: "check", bg: "bg-green-50", text: "text-green-600", ring: "ring-green-100" },
  REJECTED: { label: "Refusée", variant: "red", icon: "x", bg: "bg-red-50", text: "text-red-600", ring: "ring-red-100" },
  ONGOING: { label: "Ongoing", variant: "blue", icon: "check-circle", bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
  UPCOMING: { label: "Upcoming", variant: "gray", icon: "clock", bg: "bg-gray-100", text: "text-gray-600", ring: "ring-gray-200" },
  PRESENT: { label: "Present", variant: "green", icon: "check", bg: "bg-green-50", text: "text-green-600", ring: "ring-green-100" },
  LATE: { label: "Late", variant: "amber", icon: "clock", bg: "bg-amber-50", text: "text-amber-600", ring: "ring-amber-100" },
  ABSENT: { label: "Absent", variant: "red", icon: "x", bg: "bg-red-50", text: "text-red-600", ring: "ring-red-100" },
  LEAVE: { label: "Leave", variant: "blue", icon: "clock", bg: "bg-blue-50", text: "text-blue-600", ring: "ring-blue-100" },
};