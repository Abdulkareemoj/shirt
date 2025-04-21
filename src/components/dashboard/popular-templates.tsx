"use client";

import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

// Mock data for templates
const templates = [
  {
    id: "template-1",
    name: "Basketball Jersey",
    preview: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "template-2",
    name: "Soccer Jersey",
    preview: "/placeholder.svg?height=60&width=60",
  },
  {
    id: "template-3",
    name: "Football Jersey",
    preview: "/placeholder.svg?height=60&width=60",
  },
];

export default function PopularTemplates() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Popular Templates</CardTitle>
        <CardDescription>Start with a pre-designed template</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {templates.map((template) => (
            <div key={template.id} className="flex items-center gap-4">
              <div className="h-[60px] w-[60px] overflow-hidden rounded-md border">
                <img
                  src={template.preview || "/placeholder.svg"}
                  alt={template.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{template.name}</h4>
                <p className="text-xs text-muted-foreground">
                  Start with this template
                </p>
              </div>
              <Button asChild size="sm" variant="outline">
                <Link href={`/customize?template=${template.id}`}>Use</Link>
              </Button>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Button asChild variant="link" size="sm">
            <Link href="/templates">View all templates</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
