"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Center,
  ContactShadows,
  PresentationControls,
} from "@react-three/drei";
import Shirt from "./shirt";
import { motion } from "motion/react";
import Link from "next/link";

export default function ShirtPreview() {
  const [mounted, setMounted] = useState(false);
  const [currentColor, setCurrentColor] = useState(0);
  const colors = ["#ffffff", "#000000", "#e74c3c", "#3498db", "#2ecc71"];
  const accentColors = ["#4a90e2", "#e74c3c", "#f1c40f", "#9b59b6", "#1abc9c"];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentColor((prev) => (prev + 1) % colors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [colors.length]);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative">
      {/* Navigation buttons overlay */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-4">
        <Link
          href="/customize"
          className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-primary rounded-md shadow-md hover:bg-primary/10 transition-colors text-sm font-medium"
        >
          Start Customizing
        </Link>
        <Link
          href="/gallery"
          className="px-4 py-2 bg-white/90 backdrop-blur-sm border border-primary rounded-md shadow-md hover:bg-primary/10 transition-colors text-sm font-medium"
        >
          View Gallery
        </Link>
      </div>

      <Canvas
        camera={{ position: [0, 0, 2.5], fov: 25 }}
        className="w-full h-full"
      >
        <color attach="background" args={["#f8f9fa"]} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[1, 1, 1]} intensity={1} castShadow />
        <directionalLight position={[-1, -1, -1]} intensity={0.5} />

        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0, -0.3, 0]}
            polar={[-Math.PI / 3, Math.PI / 3]}
            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            snap={true}
          >
            <Center>
              <Shirt
                color={colors[currentColor] ?? "#ffffff"}
                accentColor1={accentColors[currentColor] ?? "#4a90e2"}
                accentColor2={
                  accentColors[(currentColor + 2) % accentColors.length] ??
                  "#e74c3c"
                }
                logoUrl={null}
                logoPosition="chest"
                textContent="3"
                textContent2="CUSTOMIZER"
                textColor={currentColor === 0 ? "#000000" : "#ffffff"}
                textStyle="curved"
                hasOutline={currentColor !== 0}
                outlineColor="#ffffff"
                isRotating={true}
                animate={true}
              />
            </Center>
            <ContactShadows
              position={[0, -1, 0]}
              opacity={0.5}
              scale={10}
              blur={1.5}
              far={1}
            />
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
      </Canvas>

      <motion.div
        className="absolute bottom-4 left-4 right-4 bg-background/80 backdrop-blur-sm p-3 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-sm font-medium text-center">
          Interactive 3D preview - Try our full customizer!
        </p>
      </motion.div>
    </div>
  );
}
