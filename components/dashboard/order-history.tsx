"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import { ChevronRight, Download, Eye } from "lucide-react";

// Mock data for orders
const orders = [
  {
    id: "ORD-7192",
    date: "Apr 23, 2023",
    status: "Delivered",
    items: 3,
    total: "$149.97",
  },
  {
    id: "ORD-8124",
    date: "Mar 14, 2023",
    status: "Processing",
    items: 2,
    total: "$99.98",
  },
  {
    id: "ORD-6419",
    date: "Feb 28, 2023",
    status: "Delivered",
    items: 1,
    total: "$49.99",
  },
  {
    id: "ORD-5291",
    date: "Jan 12, 2023",
    status: "Delivered",
    items: 4,
    total: "$199.96",
  },
];

export default function OrderHistory() {
  const [visibleOrders] = useState(orders);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View and manage your recent orders</CardDescription>
        </div>
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard/orders">View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visibleOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      order.status === "Delivered"
                        ? "default"
                        : order.status === "Processing"
                        ? "outline"
                        : "secondary"
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell className="text-right">{order.total}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View order</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download invoice</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-center py-4">
          <Button variant="outline" size="sm" className="gap-1">
            Load More <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
