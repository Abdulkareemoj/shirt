"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function LandingHero() {
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => {
  //   setMounted(true);
  // }, []);

  // if (!mounted) return null;

  return (
    <section className="relative bg-gradient-to-b from-muted/50 to-muted py-24 md:py-32">
      <div className=" px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Design Custom Shirts in Stunning 3D
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-lg">
              Create perfect custom shirts with our powerful 3D design tool. See
              your design from every angle before you order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <Link href="/customize">
                  Start Designing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="relative h-[400px] lg:h-[500px] rounded-lg overflow-hidden border shadow-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10 rounded-lg" />
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/placeholder.svg?height=500&width=800"
            >
              <source src="#" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                <h3 className="text-lg font-semibold mb-2">
                  Interactive 3D Preview
                </h3>
                <p className="text-sm text-muted-foreground">
                  See your design from every angle in real-time
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
