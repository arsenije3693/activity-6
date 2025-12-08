let fakeRole: "guest" | "user" | "admin" = "guest";

export function setRoleOverride(role: "guest" | "user" | "admin") {
  fakeRole = role;
}

export function getRoleOverride() {
  return fakeRole;
}
