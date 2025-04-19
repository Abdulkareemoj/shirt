import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  Palette,
  Shirt,
  Star,
  ShirtIcon as TShirt,
  Upload,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import LandingHero from "~/components/landing-hero";
import FeatureCard from "~/components/feature-card";
import TestimonialCard from "~/components/testimonial-card";
import PricingCard from "~/components/pricing-card";
import ShirtPreview from "~/components/shirt-preview";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <LandingHero />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className=" px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Powerful Customization Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our 3D shirt customizer gives you complete control over your
              design with intuitive tools and real-time preview.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Palette className="h-10 w-10 text-primary" />}
              title="Rich Color Options"
              description="Choose from unlimited colors for your shirt, collar, sleeves, and text with our intuitive color picker."
            />
            <FeatureCard
              icon={<Upload className="h-10 w-10 text-primary" />}
              title="Custom Logo Upload"
              description="Upload your own logos and place them precisely where you want on your custom shirt design."
            />
            <FeatureCard
              icon={<TShirt className="h-10 w-10 text-primary" />}
              title="3D Real-time Preview"
              description="See your design come to life with our interactive 3D preview that updates in real-time as you make changes."
            />
            <FeatureCard
              icon={<ArrowRight className="h-10 w-10 text-primary" />}
              title="Multiple Viewing Angles"
              description="Examine your design from every angle with front, back, and side views to ensure perfection."
            />
            <FeatureCard
              icon={<Shirt className="h-10 w-10 text-primary" />}
              title="Text & Number Customization"
              description="Add names, numbers, and team text with various styles, positions, and outline options."
            />
            <FeatureCard
              icon={<Star className="h-10 w-10 text-primary" />}
              title="Professional Quality"
              description="Our detailed 3D models ensure what you see is what you get when your custom shirt arrives."
            />
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-muted/50">
        <div className=" px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-4">
                See The Customizer In Action
              </h2>
              <p className="text-muted-foreground mb-6">
                Our intuitive 3D shirt customizer gives you complete creative
                control. Change colors, add logos, text, and numbers, all while
                seeing your design update in real-time from any angle.
              </p>
              <ul className="space-y-2 mb-8">
                {[
                  "Interactive 3D preview with smooth animations",
                  "Unlimited color combinations for all shirt elements",
                  "Custom logo placement on chest, back, sleeve, or sponsor position",
                  "Text styling with curved, arched, or straight options",
                  "Download your design or save it for later",
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg">
                  <Link href="/customize">Try It Now</Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Link href="/gallery">View Gallery</Link>
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden border shadow-lg">
              <ShirtPreview />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className=" px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Creating your custom shirt is simple with our easy-to-use design
              tool.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Design Your Shirt</h3>
              <p className="text-muted-foreground">
                Use our 3D customizer to create your perfect shirt design with
                colors, logos, and text.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Review & Finalize</h3>
              <p className="text-muted-foreground">
                Preview your design from all angles and make any final
                adjustments before ordering.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Receive Your Custom Shirt
              </h3>
              <p className="text-muted-foreground">
                We'll produce your custom shirt with premium materials and ship
                it directly to you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/50">
        <div className=" px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what customers think about
              our 3D shirt customizer.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="The 3D preview is incredible! I could see exactly how my team jerseys would look before ordering."
              author="Sarah Johnson"
              role="Basketball Team Coach"
              rating={5}
            />
            <TestimonialCard
              quote="I was able to design custom shirts for our company event in minutes. The quality was outstanding."
              author="Michael Chen"
              role="Event Coordinator"
              rating={5}
            />
            <TestimonialCard
              quote="The ability to upload our logo and see it from different angles made all the difference."
              author="David Rodriguez"
              role="Small Business Owner"
              rating={4}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className=" px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that works best for you and your team.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard
              title="Individual"
              price="$29.99"
              description="Perfect for personal use or gifts"
              features={[
                "Single shirt design",
                "All customization options",
                "High-quality materials",
                "Free shipping",
                "7-day delivery",
              ]}
              buttonText="Order Now"
              buttonVariant="outline"
            />
            <PricingCard
              title="Team"
              price="$24.99"
              description="Great for small teams and groups"
              features={[
                "5-15 identical shirts",
                "All customization options",
                "Premium materials",
                "Free shipping",
                "10-day delivery",
                "Bulk discount applied",
              ]}
              buttonText="Order Now"
              buttonVariant="default"
              highlighted={true}
            />
            <PricingCard
              title="League"
              price="$19.99"
              description="Ideal for large organizations"
              features={[
                "16+ identical shirts",
                "All customization options",
                "Premium materials",
                "Free shipping",
                "14-day delivery",
                "Maximum bulk discount",
                "Dedicated support",
              ]}
              buttonText="Contact Sales"
              buttonVariant="outline"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className=" px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Ready to Design Your Custom Shirt?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Start creating your perfect custom shirt today with our powerful 3D
            customizer. No design experience needed!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/customize">
              Start Designing Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-12">
        <div className=" px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-3">3D Shirt Customizer</h3>
              <p className="text-muted-foreground">
                Create perfect custom shirts with our powerful 3D design tool.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/gallery"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Gallery
                  </Link>
                </li>
                <li>
                  <Link
                    href="/customize"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Customizer
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} 3D Shirt Customizer. All rights
              reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Facebook</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
