"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import { Menu, X, Shirt } from "lucide-react";
import { UserButton } from "@daveyplate/better-auth-ui";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 md:px-6 flex h-16 items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2">
            <span>
              <Shirt className="text-xl font-bold text-primary" />
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="#demo"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Demo
          </Link>
          <Link
            href="#testimonials"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {/* <ThemeToggle /> */}
          <Button asChild className="hidden md:inline-flex">
            <Link href="/customizer">Start Designing</Link>
          </Button>
          {/* <UserButton /> */}
          {/* Mobile Menu Button */}
          <Button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4 bg-background border-t">
            <Link
              href="#features"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Features
            </Link>
            <Link
              href="#demo"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Demo
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              onClick={closeMenu}
            >
              Pricing
            </Link>
            <Button asChild className="w-full mt-2">
              <Link href="/auth/signin" onClick={closeMenu}>
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
