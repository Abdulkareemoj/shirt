"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Check, Package, ShirtIcon, ShoppingCart } from "lucide-react";

// Mock data for activity
const activities = [
  {
    id: 1,
    type: "design",
    message: "You created a new design",
    time: "2 hours ago",
    icon: ShirtIcon,
  },
  {
    id: 2,
    type: "order",
    message: "Your order has been placed",
    time: "1 day ago",
    icon: ShoppingCart,
  },
  {
    id: 3,
    type: "shipment",
    message: "Your order has been shipped",
    time: "3 days ago",
    icon: Package,
  },
  {
    id: 4,
    type: "delivery",
    message: "Your order has been delivered",
    time: "1 week ago",
    icon: Check,
  },
];

export default function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest actions and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-0.5 rounded-full bg-muted p-2">
                <activity.icon className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
