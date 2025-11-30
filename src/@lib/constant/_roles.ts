export type TRole = (typeof Roles)[keyof typeof Roles];

export const Roles = {
  SUPER_ADMIN: 'super_admin',
  // ADMIN: 'Admin',
} as const;
