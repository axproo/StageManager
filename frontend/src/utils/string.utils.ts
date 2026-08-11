/**
 * Retourne les initiales d'une personne à partir de son prénom et nom.
 * Gère les cas où l'un des deux est vide.
 */
export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.trim()[0] ?? "";
  const last = lastName?.trim()[0] ?? "";
  const initials = `${first}${last}`.toUpperCase();
  return initials || "?";
}