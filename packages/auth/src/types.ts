export type UserRole = "ADMIN" | "STAGIAIRE";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginPayload {
  email: string;
  password: string;
}
