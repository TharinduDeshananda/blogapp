enum UserRole {
  ADMIN,
  USER,
}

export function getUserRoleEnumFromString(roleStr: string | null) {
  if (!roleStr) return null;
  switch (roleStr) {
    case "ADMIN":
      return UserRole.ADMIN;
    case "USER":
      return UserRole.USER;
    default:
      return null;
  }
}

export default UserRole;
