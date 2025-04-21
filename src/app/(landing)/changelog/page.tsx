import Link from "next/link";
import { ArrowLeft, Tag, Bug, Sparkles, Zap, AlertCircle } from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { siteConfig } from "~/lib/site";
export default function ChangelogPage() {
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
          <h1 className="text-4xl font-bold tracking-tight">Changelog</h1>
          <p className="text-xl text-muted-foreground">
            Stay up to date with the latest improvements and updates to{" "}
            {siteConfig.name}.
          </p>
        </section>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Updates</TabsTrigger>
              <TabsTrigger value="features">New Features</TabsTrigger>
              <TabsTrigger value="improvements">Improvements</TabsTrigger>
              <TabsTrigger value="fixes">Bug Fixes</TabsTrigger>
            </TabsList>
            <Link
              href="/roadmap"
              className="text-sm text-primary hover:underline"
            >
              View Roadmap →
            </Link>
          </div>

          <TabsContent value="all" className="mt-6 space-y-8">
            {releases.map((release) => (
              <div key={release.version} className="space-y-4">
                <div className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold tracking-tight">
                    Version {release.version}
                  </h2>
                  <Badge variant="outline" className="ml-2">
                    {release.date}
                  </Badge>
                </div>

                {release.summary && (
                  <p className="text-muted-foreground">{release.summary}</p>
                )}

                <div className="space-y-6 mt-4">
                  {release.features && release.features.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        New Features
                      </h3>
                      <ul className="space-y-2">
                        {release.features.map((feature, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.improvements && release.improvements.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        Improvements
                      </h3>
                      <ul className="space-y-2">
                        {release.improvements.map((improvement, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-amber-500">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.fixes && release.fixes.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Bug className="h-4 w-4 text-green-500" />
                        Bug Fixes
                      </h3>
                      <ul className="space-y-2">
                        {release.fixes.map((fix, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-green-500">•</span>
                            <span>{fix}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {release.breaking && release.breaking.length > 0 && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-destructive" />
                        Breaking Changes
                      </h3>
                      <ul className="space-y-2">
                        {release.breaking.map((item, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-destructive">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="features" className="mt-6 space-y-8">
            {releases.map(
              (release) =>
                release.features &&
                release.features.length > 0 && (
                  <div
                    key={`${release.version}-features`}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Version {release.version}
                      </h2>
                      <Badge variant="outline" className="ml-2">
                        {release.date}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-primary" />
                        New Features
                      </h3>
                      <ul className="space-y-2">
                        {release.features.map((feature, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-primary">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
            )}
          </TabsContent>

          <TabsContent value="improvements" className="mt-6 space-y-8">
            {releases.map(
              (release) =>
                release.improvements &&
                release.improvements.length > 0 && (
                  <div
                    key={`${release.version}-improvements`}
                    className="space-y-4"
                  >
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Version {release.version}
                      </h2>
                      <Badge variant="outline" className="ml-2">
                        {release.date}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Zap className="h-4 w-4 text-amber-500" />
                        Improvements
                      </h3>
                      <ul className="space-y-2">
                        {release.improvements.map((improvement, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-amber-500">•</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
            )}
          </TabsContent>

          <TabsContent value="fixes" className="mt-6 space-y-8">
            {releases.map(
              (release) =>
                release.fixes &&
                release.fixes.length > 0 && (
                  <div key={`${release.version}-fixes`} className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5 text-primary" />
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Version {release.version}
                      </h2>
                      <Badge variant="outline" className="ml-2">
                        {release.date}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <h3 className="text-lg font-medium flex items-center gap-2">
                        <Bug className="h-4 w-4 text-green-500" />
                        Bug Fixes
                      </h3>
                      <ul className="space-y-2">
                        {release.fixes.map((fix, index) => (
                          <li key={index} className="flex gap-2">
                            <span className="text-green-500">•</span>
                            <span>{fix}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )
            )}
          </TabsContent>
        </Tabs>

        <div className="border-t pt-8">
          <p className="text-center text-muted-foreground">
            Looking for older releases?{" "}
            <Link href="#" className="text-primary hover:underline">
              View archive
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const releases = [
  {
    version: "2.4.0",
    date: "April 10, 2025",
    summary:
      "This release introduces AI-powered image editing tools and improves PDF form handling.",
    features: [
      "AI Image Enhancement: Automatically improve image quality with one click",
      "Smart Object Removal: Remove unwanted objects from images with AI assistance",
      "Background Replacement: Easily swap image backgrounds with preset options or custom uploads",
    ],
    improvements: [
      "50% faster PDF rendering for large documents",
      "Improved form field detection in scanned PDFs",
      "Enhanced color picker with recently used colors and hex input",
    ],
    fixes: [
      "Fixed an issue where certain image formats wouldn't display correctly",
      "Resolved a bug causing occasional crashes when merging large PDFs",
      "Fixed text alignment issues in exported PDFs with custom fonts",
    ],
  },
  {
    version: "2.3.0",
    date: "March 15, 2025",
    features: [
      "PDF Form Creation: Create fillable PDF forms with various field types",
      "Signature Requests: Send documents for electronic signature",
      "Template Library: Access 50+ new document templates",
    ],
    improvements: [
      "Redesigned document properties panel for better usability",
      "Improved search functionality with highlighted results",
      "Added keyboard shortcuts for common actions",
    ],
    fixes: [
      "Fixed an issue with text selection in rotated PDFs",
      "Resolved a bug affecting image quality when exporting to JPEG",
      "Fixed pagination issues in the document viewer",
    ],
  },
  {
    version: "2.2.0",
    date: "February 22, 2025",
    features: [
      "Collaborative Editing: Real-time document collaboration",
      "Version History: Track and restore previous versions of your documents",
      "Comments & Annotations: Add comments and annotations to documents",
    ],
    improvements: [
      "Improved loading times for the dashboard",
      "Enhanced mobile responsiveness across all tools",
      "Updated UI for better accessibility",
    ],
    fixes: [
      "Fixed an issue with document sharing permissions",
      "Resolved a bug affecting PDF text extraction",
      "Fixed image cropping precision on high-resolution displays",
    ],
  },
  {
    version: "2.1.0",
    date: "January 18, 2025",
    features: [
      "Batch Processing: Edit multiple files simultaneously",
      "OCR Improvements: Better text recognition in scanned documents",
      "Advanced Image Filters: New professional-grade image filters",
    ],
    improvements: [
      "Redesigned project management interface",
      "Faster document upload and processing",
      "Improved export options with more format choices",
    ],
    fixes: [
      "Fixed an issue with font embedding in exported PDFs",
      "Resolved a bug affecting image rotation preservation",
      "Fixed memory usage issues when handling large files",
    ],
    breaking: [
      "API changes for document processing endpoints - see developer docs for details",
    ],
  },
];
