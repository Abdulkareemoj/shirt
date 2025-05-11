import { requireAdmin } from "~/lib/auth-utils";
import { db } from "~/server/db";
import { notFound } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Link from "next/link";
import { RoleBadge } from "~/components/role-badge";
import UserRoleForm from "~/components/admin/user-role-form";

export default async function AdminEditUserPage({
  params,
}: {
  params: { id: string };
}) {
  // This will redirect if the user is not an admin
  await requireAdmin();

  // Fetch the user
  const user = await db.user.findUnique({
    where: { id: params.id },
  });

  if (!user) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <div className="mb-6">
        <Link href="/admin/users" className="text-primary hover:underline">
          ← Back to Users
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">Edit User</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
            <CardDescription>Basic information about the user</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Name
                </h3>
                <p className="text-base">{user.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Email
                </h3>
                <p className="text-base">{user.email}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Current Role
                </h3>
                <div className="mt-1">
                  <RoleBadge role={user.role} />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Created
                </h3>
                <p className="text-base">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Change User Role</CardTitle>
            <CardDescription>Update the user's permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <UserRoleForm userId={user.id} currentRole={user.role} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
