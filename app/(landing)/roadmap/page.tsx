"use client";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  MapPin,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Progress } from "~/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { siteConfig } from "~/lib/site";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "Roadmap",
  description: `Explore the product roadmap of ${siteConfig.name} and see what's coming next in our development plans.`,
};

export default function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="space-y-8">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <MapPin className="h-6 w-6 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              Product Roadmap
            </h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Explore our plans for future development and upcoming features.
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold tracking-tight">
              Development Timeline
            </h2>
            <Link
              href="/changelog"
              className="text-sm text-primary hover:underline"
            >
              View Changelog →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  Current Quarter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  April - June 2025
                </p>
                <ul className="space-y-2 text-sm">
                  {currentQuarterItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1">
                        {item.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Circle className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <div>
                        <span className="font-medium">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-amber-500" />
                  Next Quarter
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  July - September 2025
                </p>
                <ul className="space-y-2 text-sm">
                  {nextQuarterItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1">
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <span className="font-medium">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-500" />
                  Future Plans
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  October 2025 and beyond
                </p>
                <ul className="space-y-2 text-sm">
                  {futurePlansItems.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="mt-1">
                        <Circle className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <span className="font-medium">{item.title}</span>
                        {item.description && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Feature Categories
          </h2>
          <Tabs defaultValue="document" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="document">Document Editing</TabsTrigger>
              <TabsTrigger value="image">Image Editing</TabsTrigger>
              <TabsTrigger value="collaboration">Collaboration</TabsTrigger>
              <TabsTrigger value="integration">Integrations</TabsTrigger>
            </TabsList>
            <TabsContent value="document" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Upcoming Document Features
                </h3>
                {documentFeatures.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feature.title}</span>
                        <Badge
                          variant={
                            feature.status === "in-progress"
                              ? "default"
                              : "outline"
                          }
                        >
                          {feature.status === "in-progress"
                            ? "In Progress"
                            : "Planned"}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature.eta}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <Progress value={feature.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="image" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Upcoming Image Features</h3>
                {imageFeatures.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feature.title}</span>
                        <Badge
                          variant={
                            feature.status === "in-progress"
                              ? "default"
                              : "outline"
                          }
                        >
                          {feature.status === "in-progress"
                            ? "In Progress"
                            : "Planned"}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature.eta}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <Progress value={feature.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="collaboration" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Upcoming Collaboration Features
                </h3>
                {collaborationFeatures.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feature.title}</span>
                        <Badge
                          variant={
                            feature.status === "in-progress"
                              ? "default"
                              : "outline"
                          }
                        >
                          {feature.status === "in-progress"
                            ? "In Progress"
                            : "Planned"}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature.eta}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <Progress value={feature.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="integration" className="mt-6 space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Upcoming Integration Features
                </h3>
                {integrationFeatures.map((feature, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{feature.title}</span>
                        <Badge
                          variant={
                            feature.status === "in-progress"
                              ? "default"
                              : "outline"
                          }
                        >
                          {feature.status === "in-progress"
                            ? "In Progress"
                            : "Planned"}
                        </Badge>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature.eta}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                    <Progress value={feature.progress} className="h-2" />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold tracking-tight">
            Feature Requests
          </h2>
          <p>
            We value your input! Have a feature you'd like to see in{" "}
            {siteConfig.name}? Let us know and we'll consider adding it to our
            roadmap.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Submit Feature Request
            </Link>
            <Link
              href="#"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              View Popular Requests
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

const currentQuarterItems = [
  {
    title: "AI-Powered Image Enhancement",
    description: "Automatically improve image quality with one click",
    completed: true,
  },
  {
    title: "PDF Form Creation Tools",
    description: "Create fillable PDF forms with various field types",
    completed: true,
  },
  {
    title: "Collaborative Editing",
    description: "Real-time document collaboration with team members",
    completed: false,
  },
  {
    title: "Advanced OCR Improvements",
    description: "Better text recognition in scanned documents",
    completed: false,
  },
];

const nextQuarterItems = [
  {
    title: "Mobile App Release",
    description: "Native mobile applications for iOS and Android",
  },
  {
    title: "Document Translation",
    description: "Translate documents to multiple languages",
  },
  {
    title: "Advanced Chart Creator",
    description: "Create and edit charts within documents",
  },
  {
    title: "Accessibility Improvements",
    description: "Enhanced screen reader support and keyboard navigation",
  },
];

const futurePlansItems = [
  {
    title: "AI Document Summarization",
    description: "Automatically generate summaries of long documents",
  },
  {
    title: "Video Editing Tools",
    description:
      "Expand our platform to include basic video editing capabilities",
  },
  {
    title: "Enterprise Workflow Integration",
    description: "Connect with enterprise document management systems",
  },
  {
    title: "Advanced Security Features",
    description: "Document watermarking, encryption, and access controls",
  },
];

const documentFeatures = [
  {
    title: "Advanced PDF Form Builder",
    description:
      "Create complex, interactive PDF forms with conditional logic and validation",
    status: "in-progress",
    progress: 75,
    eta: "May 2025",
  },
  {
    title: "Document Comparison Tool",
    description: "Compare two versions of a document and highlight differences",
    status: "in-progress",
    progress: 40,
    eta: "June 2025",
  },
  {
    title: "Legal Document Templates",
    description: "Professionally designed templates for common legal documents",
    status: "planned",
    progress: 15,
    eta: "Q3 2025",
  },
  {
    title: "Document Translation",
    description:
      "Translate documents to multiple languages while preserving formatting",
    status: "planned",
    progress: 10,
    eta: "Q3 2025",
  },
];

const imageFeatures = [
  {
    title: "AI Background Removal",
    description: "One-click background removal for product and portrait images",
    status: "in-progress",
    progress: 80,
    eta: "May 2025",
  },
  {
    title: "Batch Image Processing",
    description: "Apply edits to multiple images simultaneously",
    status: "in-progress",
    progress: 60,
    eta: "June 2025",
  },
  {
    title: "Advanced Photo Filters",
    description: "Professional-grade filters and effects for images",
    status: "planned",
    progress: 20,
    eta: "Q3 2025",
  },
  {
    title: "Image to Vector Conversion",
    description: "Convert raster images to scalable vector graphics",
    status: "planned",
    progress: 5,
    eta: "Q4 2025",
  },
];

const collaborationFeatures = [
  {
    title: "Real-time Collaboration",
    description: "Edit documents simultaneously with team members",
    status: "in-progress",
    progress: 90,
    eta: "May 2025",
  },
  {
    title: "Advanced Commenting System",
    description: "Rich text comments with @mentions and threading",
    status: "in-progress",
    progress: 50,
    eta: "June 2025",
  },
  {
    title: "Team Workspaces",
    description: "Organize projects and documents by team",
    status: "planned",
    progress: 25,
    eta: "Q3 2025",
  },
  {
    title: "Document Approval Workflows",
    description: "Create custom approval processes for documents",
    status: "planned",
    progress: 10,
    eta: "Q4 2025",
  },
];

const integrationFeatures = [
  {
    title: "Google Workspace Integration",
    description: "Seamlessly work with Google Docs, Sheets, and Drive",
    status: "in-progress",
    progress: 70,
    eta: "May 2025",
  },
  {
    title: "Microsoft 365 Integration",
    description: "Connect with Microsoft Word, Excel, and OneDrive",
    status: "in-progress",
    progress: 45,
    eta: "June 2025",
  },
  {
    title: "Slack Integration",
    description: "Share and collaborate on documents directly from Slack",
    status: "planned",
    progress: 20,
    eta: "Q3 2025",
  },
  {
    title: "Zapier Integration",
    description: "Connect DocEditor with thousands of apps through Zapier",
    status: "planned",
    progress: 15,
    eta: "Q3 2025",
  },
];
