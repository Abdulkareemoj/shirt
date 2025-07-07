// import { requireAdmin } from "~/lib/auth-utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { db } from "~/server/db";
// import { RoleBadge } from "~/components/role-badge";

export default async function AdminDashboard() {
  // This will redirect if the user is not an admin
  // const admin = await requireAdmin();

  // Fetch user statistics
  const userCount = await db.user.count();
  const adminCount = await db.user.count({ where: { role: "ADMIN" } });
  //   const designerCount = await db.user.count({ where: { role: "DESIGNER" } });
  const regularUserCount = await db.user.count({ where: { role: "USER" } });

  // Fetch recent users
  const recentUsers = await db.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        {/* Welcome, {admin.name}. You have admin privileges. */}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown of users by role</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-blue-500" />
                  <span>Regular Users</span>
                </div>
                <span className="font-medium">{regularUserCount}</span>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="mr-2 h-3 w-3 rounded-full bg-red-500" />
                  <span>Administrators</span>
                </div>
                <span className="font-medium">{adminCount}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Latest user registrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {user.name?.charAt(0).toUpperCase() || "U"}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </div>
                  {/* <RoleBadge role={user.role} /> */}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
