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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

// Mock data for designs
const designs = [
  {
    id: "design-1",
    name: "Team Jersey",
    preview: "/placeholder.svg?height=100&width=100",
    created: "2 days ago",
    status: "Draft",
  },
  {
    id: "design-2",
    name: "Basketball Uniform",
    preview: "/placeholder.svg?height=100&width=100",
    created: "1 week ago",
    status: "Completed",
  },
  {
    id: "design-3",
    name: "Soccer Jersey",
    preview: "/placeholder.svg?height=100&width=100",
    created: "2 weeks ago",
    status: "Completed",
  },
  {
    id: "design-4",
    name: "Football Jersey",
    preview: "/placeholder.svg?height=100&width=100",
    created: "3 weeks ago",
    status: "Completed",
  },
];

export default function RecentDesigns() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredDesigns =
    activeTab === "all"
      ? designs
      : designs.filter((design) =>
          activeTab === "drafts"
            ? design.status === "Draft"
            : design.status === "Completed"
        );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Recent Designs</CardTitle>
          <CardDescription>Manage your recent shirt designs</CardDescription>
        </div>
        <Button asChild size="sm">
          <Link href="/customize">Create New</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Designs</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value={activeTab} className="space-y-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredDesigns.map((design) => (
                <div
                  key={design.id}
                  className="group relative overflow-hidden rounded-md border"
                >
                  <Link
                    href={`/customize?design=${design.id}`}
                    className="block"
                  >
                    <div className="aspect-square bg-muted p-2">
                      <img
                        src={design.preview || "/placeholder.svg"}
                        alt={design.name}
                        className="h-full w-full object-cover transition-all group-hover:scale-105"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium">{design.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-muted-foreground">
                          {design.created}
                        </p>
                        <span
                          className={`text-xs font-medium ${
                            design.status === "Draft"
                              ? "text-amber-500"
                              : "text-emerald-500"
                          }`}
                        >
                          {design.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="absolute right-2 top-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 bg-white/80 backdrop-blur-sm"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
            {filteredDesigns.length === 0 && (
              <div className="flex h-[200px] flex-col items-center justify-center rounded-md border border-dashed">
                <p className="text-sm text-muted-foreground">
                  No designs found
                </p>
                <Button asChild variant="link" size="sm" className="mt-2">
                  <Link href="/customize">Create a new design</Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
