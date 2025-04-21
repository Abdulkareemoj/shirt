import Link from "next/link"
import { ArrowLeft, Shield, Lock, Server, FileCheck, AlertTriangle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "~/components/ui/accordion"

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <div className="space-y-12">
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Security</h1>
          </div>
          <p className="text-xl text-muted-foreground">
            Your data security and privacy are our top priorities. Learn how we protect your information.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Data Encryption
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                All data is encrypted in transit and at rest using industry-standard AES-256 encryption.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Secure Infrastructure
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our platform runs on SOC 2 compliant cloud infrastructure with multiple layers of security.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Regular Audits
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We conduct regular security audits and penetration testing to identify and address vulnerabilities.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Compliance & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-start gap-4 p-4 border rounded-lg">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-semibold text-primary">
                    {cert.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Security Practices</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="access-control">
              <AccordionTrigger>Access Control</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We implement strict access controls based on the principle of least privilege. Only authorized
                  personnel have access to production systems, and all access is logged and monitored. We use
                  multi-factor authentication for all administrative access.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="data-protection">
              <AccordionTrigger>Data Protection</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Your documents and images are encrypted both in transit and at rest. We use TLS 1.2+ for all data in
                  transit and AES-256 encryption for data at rest. Our backup systems are also encrypted to ensure your
                  data remains protected.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="vulnerability-management">
              <AccordionTrigger>Vulnerability Management</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We maintain a comprehensive vulnerability management program that includes regular scanning,
                  penetration testing, and code reviews. Security updates are applied promptly, and we have a
                  responsible disclosure program for reporting security issues.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="incident-response">
              <AccordionTrigger>Incident Response</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  We have a documented incident response plan that is regularly tested and updated. Our team is trained
                  to quickly identify, contain, and remediate security incidents. We commit to transparent communication
                  with affected users in the event of a security breach.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="employee-security">
              <AccordionTrigger>Employee Security</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  All employees undergo background checks and security training. We maintain a security-first culture
                  with regular training sessions and awareness programs. Access to customer data is strictly limited and
                  audited.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Security Incident Reporting</h2>
          <div className="bg-muted p-6 rounded-lg space-y-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-medium">Found a security vulnerability?</h3>
            </div>
            <p>
              We take security issues seriously. If you believe you've found a security vulnerability in our service,
              please report it to us immediately. We appreciate your help in keeping our platform secure.
            </p>
            <p className="font-medium">Email: security@doceditor.com</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Security Updates</h2>
          <div className="space-y-4">
            {securityUpdates.map((update, index) => (
              <div key={index} className="flex gap-4 border-b pb-4 last:border-0">
                <div className="flex-shrink-0">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{update.title}</h3>
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">{update.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

const certifications = [
  {
    name: "SOC 2 Type II",
    description:
      "We've completed SOC 2 Type II audits, verifying our security controls around customer data protection.",
  },
  {
    name: "GDPR Compliant",
    description: "Our platform and processes are designed to comply with the EU General Data Protection Regulation.",
  },
  {
    name: "ISO 27001",
    description:
      "We follow ISO 27001 standards for establishing, implementing, and maintaining information security management systems.",
  },
  {
    name: "HIPAA Compliant",
    description:
      "For enterprise customers, we offer HIPAA compliance options for handling protected health information.",
  },
]

const securityUpdates = [
  {
    title: "Enhanced Authentication Security",
    date: "April 1, 2025",
    description:
      "Implemented additional security measures for authentication, including improved rate limiting and suspicious activity detection.",
  },
  {
    title: "Security Patch for PDF Processing Engine",
    date: "March 15, 2025",
    description: "Applied critical security updates to our PDF processing engine to address potential vulnerabilities.",
  },
  {
    title: "Completed Annual Security Audit",
    date: "February 22, 2025",
    description: "Successfully completed our annual comprehensive security audit with no critical findings.",
  },
]
