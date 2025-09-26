import type { Metadata } from "next";
import DashboardHeader from "~/components/dashboard/dashboard-header";
import DashboardStats from "~/components/dashboard/dashboard-stats";
import RecentDesigns from "~/components/dashboard/recent-designs";
import OrderHistory from "~/components/dashboard/order-history";
import ActivityFeed from "~/components/dashboard/activity-feed";
import PopularTemplates from "~/components/dashboard/popular-templates";
import UpcomingOrders from "~/components/dashboard/upcoming-orders";

const metadata: Metadata = {
  title: "Dashboard | 3D Shirt Customizer",
  description: "View your designs, orders, and account information",
};

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 space-y-6">
        <DashboardHeader />
        <DashboardStats />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <RecentDesigns />
          </div>
          <div>
            <PopularTemplates />
          </div>
        </div>

        {/* <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <OrderHistory />
          </div>
          <div className="space-y-6">
            <ActivityFeed />
          </div>
        </div> */}
      </div>
    </div>
  );
}
