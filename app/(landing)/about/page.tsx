"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { siteConfig } from "~/lib/site";
import type { Metadata } from "next";

const metadata: Metadata = {
  title: "About Us",
  description: `Learn more about ${siteConfig.name} and how we help you put something interesting on a shirt.`,
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="space-y-12">
        <section className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            About {siteConfig.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            Empowering creativity through powerful document and image editing
            tools.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Our Story</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p>
                Founded in 2023, {siteConfig.name} was born from a simple
                observation: document and image editing tools were either too
                complex for casual users or too limited for professionals. We
                set out to bridge this gap by creating a powerful yet intuitive
                platform that makes document and image editing accessible to
                everyone.
              </p>
              <p>
                Our team of designers, developers, and document specialists has
                worked tirelessly to create a suite of tools that simplifies
                complex editing tasks without sacrificing functionality. What
                started as a simple PDF editor has grown into a comprehensive
                platform used by individuals and businesses worldwide.
              </p>
            </div>
            <div className="bg-muted rounded-lg p-6 h-64 flex items-center justify-center">
              <p className="text-center text-muted-foreground italic">
                Company timeline illustration
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Our Mission</h2>
          <div className="bg-primary/5 border border-primary/10 rounded-lg p-6">
            <p className="text-lg">
              To democratize document and image editing by providing powerful,
              intuitive tools that help people create, edit, and share their
              ideas with the world.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Simplicity</h3>
                <p className="text-muted-foreground">
                  We believe powerful tools don't have to be complicated. We
                  strive to make our platform intuitive and accessible to users
                  of all skill levels.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">Innovation</h3>
                <p className="text-muted-foreground">
                  We're constantly pushing the boundaries of what's possible,
                  integrating cutting-edge technologies to provide the best
                  editing experience.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-lg font-medium mb-2">User-Centric</h3>
                <p className="text-muted-foreground">
                  Every feature we build starts with our users' needs. We
                  actively listen to feedback and continuously improve our
                  platform based on how people actually use it.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center space-y-2">
                <div className="w-32 h-32 mx-auto rounded-full bg-muted flex items-center justify-center">
                  <span className="text-3xl font-medium text-muted-foreground">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <h3 className="font-medium">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">
            Join Our Team
          </h2>
          <p>
            We're always looking for talented individuals who are passionate
            about creating amazing tools. Check out our open positions and join
            us in our mission to make document and image editing accessible to
            everyone.
          </p>
          <Button size="lg">View Open Positions</Button>
        </section>
      </div>
    </div>
  );
}

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
  },
  {
    name: "Aisha Patel",
    role: "Head of Product",
  },
  {
    name: "David Rodriguez",
    role: "Lead Designer",
  },
];
