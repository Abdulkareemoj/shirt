"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { CalendarIcon, Package } from "lucide-react";
import Link from "next/link";

// Mock data for upcoming orders
const upcomingOrders = [
  {
    id: "ORD-8124",
    status: "Processing",
    items: 2,
    estimatedDelivery: "Apr 28, 2023",
  },
  {
    id: "ORD-9157",
    status: "Shipped",
    items: 1,
    estimatedDelivery: "Apr 30, 2023",
  },
];

export default function UpcomingOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Orders</CardTitle>
        <CardDescription>Track your pending and shipped orders</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingOrders.map((order) => (
            <div key={order.id} className="rounded-lg border p-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{order.id}</h4>
                <Badge
                  variant={order.status === "Shipped" ? "default" : "outline"}
                >
                  {order.status}
                </Badge>
              </div>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <Package className="mr-1 h-4 w-4" />
                <span>{order.items} items</span>
              </div>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <span>Est. delivery: {order.estimatedDelivery}</span>
              </div>
              <div className="mt-4">
                <Button asChild variant="outline" size="sm" className="w-full">
                  <Link href={`/dashboard/orders/${order.id}`}>
                    Track Order
                  </Link>
                </Button>
              </div>
            </div>
          ))}
          {upcomingOrders.length === 0 && (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
              <Package className="h-8 w-8 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">
                No upcoming orders
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
