export const ROLE_VALUES = [
  "STUDENT",
  "LECTURER",
  "HEAD_OF_DEPARTMENT",
] as const;

export type Role = (typeof ROLE_VALUES)[number];

export interface AuthUser {
  id: number | string;
  fullName: string;
  email: string;
  role: Role;
  studentCode?: string;
  lecturerCode?: string;
  phoneNumber?: string;
  major?: string;
  heDaoTao?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResult {
  accessToken: string;
  user: AuthUser;
}
