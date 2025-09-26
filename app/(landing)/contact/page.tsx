"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import type { Metadata } from "next";
import { siteConfig } from "~/lib/site";

const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with the ${siteConfig.name} team for support, inquiries, or feedback. We're here to help!`,
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.email({
    message: "Please enter a valid email address.",
  }),
  department: z.string({
    error: "Please select a department.",
  }),
  subject: z.string().min(5, {
    message: "Subject must be at least 5 characters.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      department: "",
      subject: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setSubmitError(null);

    // Simulate API call
    setTimeout(() => {
      try {
        console.log(values);
        setIsSubmitted(true);
        setIsSubmitting(false);
      } catch (error) {
        setSubmitError(
          "There was a problem submitting your inquiry. Please try again."
        );
        setIsSubmitting(false);
      }
    }, 1500);
  }

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
          <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions or need assistance? We're here to help.
          </p>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="space-y-6">
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Thank you for contacting us!
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    We've received your inquiry and will get back to you as soon
                    as possible, usually within 24-48 hours.
                  </AlertDescription>
                </Alert>
                <Button onClick={() => setIsSubmitted(false)} className="mt-4">
                  Submit another inquiry
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {submitError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}

                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="your.email@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Department</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select the department you want to contact" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="support">
                                Customer Support
                              </SelectItem>
                              <SelectItem value="sales">
                                Sales & Billing
                              </SelectItem>
                              <SelectItem value="technical">
                                Technical Support
                              </SelectItem>
                              <SelectItem value="feedback">
                                Product Feedback
                              </SelectItem>
                              <SelectItem value="partnership">
                                Partnership Inquiries
                              </SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Selecting the right department helps us route your
                            inquiry to the right team.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Brief description of your inquiry"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Please provide details about your inquiry..."
                              className="min-h-[150px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="mr-2">Submitting</span>
                          <svg
                            className="animate-spin h-4 w-4"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Submit Inquiry
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Contact Information</h2>
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4 flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-sm text-muted-foreground">
                        For general inquiries:
                      </p>
                      <a
                        href="mailto:info@doceditor.com"
                        className="text-sm text-primary hover:underline"
                      >
                        info@doceditor.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-2">
                        For support:
                      </p>
                      <a
                        href="mailto:support@doceditor.com"
                        className="text-sm text-primary hover:underline"
                      >
                        support@doceditor.com
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Call Us</h3>
                      <p className="text-sm text-muted-foreground">
                        Customer Support:
                      </p>
                      <p className="text-sm">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Monday - Friday: 9am - 6pm EST
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 flex items-start gap-3">
                    <MessageSquare className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-medium">Live Chat</h3>
                      <p className="text-sm text-muted-foreground">
                        Chat with our support team in real-time through the app
                        when you're logged in.
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available 24/7 for Pro and Enterprise plans.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="response-time">
                  <AccordionTrigger>
                    How quickly will I get a response?
                  </AccordionTrigger>
                  <AccordionContent>
                    We aim to respond to all inquiries within 24-48 hours during
                    business days. For urgent matters, please use the live chat
                    feature available in the app for faster assistance.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="billing-issues">
                  <AccordionTrigger>
                    I have a billing issue. Who should I contact?
                  </AccordionTrigger>
                  <AccordionContent>
                    For billing inquiries, please select "Sales & Billing" from
                    the department dropdown in the contact form, or email
                    billing@doceditor.com directly. Include your account email
                    and any relevant invoice numbers for faster resolution.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="feature-request">
                  <AccordionTrigger>
                    How do I request a new feature?
                  </AccordionTrigger>
                  <AccordionContent>
                    We love hearing your ideas! Select "Product Feedback" from
                    the department dropdown and describe the feature you'd like
                    to see. You can also visit our roadmap page to see what
                    features are already planned and submit new ideas there.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="enterprise">
                  <AccordionTrigger>
                    Do you offer enterprise solutions?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, we offer customized enterprise solutions with dedicated
                    support, custom integrations, and enhanced security
                    features. Select "Sales & Billing" from the department
                    dropdown and mention your enterprise requirements, or email
                    enterprise@doceditor.com directly.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
