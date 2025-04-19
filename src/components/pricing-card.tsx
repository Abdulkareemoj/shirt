"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import Link from "next/link";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant: "default" | "outline";
  highlighted?: boolean;
}

export default function PricingCard({
  title,
  price,
  description,
  features,
  buttonText,
  buttonVariant,
  highlighted = false,
}: PricingCardProps) {
  return (
    <motion.div
      className={`rounded-lg border ${
        highlighted ? "border-primary shadow-lg" : "border-border shadow-sm"
      } overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`p-6 ${
          highlighted
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground"
        }`}
      >
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <p className="text-sm mb-4">{description}</p>
        <div className="flex items-baseline mb-4">
          <span className="text-3xl font-bold">{price}</span>
          <span className="ml-1 text-sm">per shirt</span>
        </div>
      </div>
      <div className="p-6 bg-background">
        <ul className="space-y-3 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex">
              <Check className="h-5 w-5 text-primary mr-2 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button variant={buttonVariant} className="w-full" asChild>
          <Link href="/customize">{buttonText}</Link>
        </Button>
      </div>
    </motion.div>
  );
}
