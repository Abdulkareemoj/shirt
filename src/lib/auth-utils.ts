// import { auth } from "~/server/auth";
// import { redirect } from "next/navigation";
// import type { Role } from "@prisma/client";

// // Check if user is authenticated
// export async function requireAuth() {
//   const session = await auth();

//   if (!session?.user) {
//     redirect("/signin");
//   }

//   return session.user;
// }

// // Check if user has required role
// export async function requireRole(allowedRoles: Role[]) {
//   const user = await requireAuth();

//   if (!allowedRoles.includes(user.role)) {
//     redirect("/unauthorized");
//   }

//   return user;
// }

// // Check if user is admin
// export async function requireAdmin() {
//   return requireRole(["ADMIN"]);
// }

// // Get current user role
// export async function getUserRole(): Promise<Role | null> {
//   const session = await auth();
//   return session?.user?.role || null;
// }

// // Check if user has specific role
// export async function hasRole(role: Role): Promise<boolean> {
//   const userRole = await getUserRole();
//   return userRole === role;
// }

// // Check if user has any of the specified roles
// export async function hasAnyRole(roles: Role[]): Promise<boolean> {
//   const userRole = await getUserRole();
//   return userRole ? roles.includes(userRole) : false;
// }
