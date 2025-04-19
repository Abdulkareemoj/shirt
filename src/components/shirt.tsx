"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Decal, useTexture, Text } from "@react-three/drei";
import * as THREE from "three";
import { easing } from "maath";
import { useSpring, animated } from "@react-spring/three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

// Define the type for our GLTF result
type GLTFResult = GLTF & {
  nodes: {
    Shirt: THREE.Mesh;
    Collar: THREE.Mesh;
    LeftSleeve: THREE.Mesh;
    RightSleeve: THREE.Mesh;
  };
  materials: {
    ShirtMaterial: THREE.MeshStandardMaterial;
    CollarMaterial: THREE.MeshStandardMaterial;
    SleeveMaterial: THREE.MeshStandardMaterial;
  };
};

interface ShirtProps {
  color: string;
  accentColor1: string;
  accentColor2: string;
  logoUrl: string | null;
  logoPosition: string;
  textContent: string;
  textContent2: string;
  textColor: string;
  textStyle: string;
  hasOutline: boolean;
  outlineColor: string;
  isRotating?: boolean;
  animate?: boolean;
  lastColorChange?: number;
}

export default function Shirt({
  color,
  accentColor1,
  accentColor2,
  logoUrl,
  logoPosition,
  textContent,
  textContent2,
  textColor,
  textStyle,
  hasOutline,
  outlineColor,
  isRotating = true,
  animate = false,
  lastColorChange = 0,
}: ShirtProps) {
  const group = useRef<THREE.Group>(null);

  // Create a detailed shirt model using Three.js geometries
  const { nodes, materials } = useDetailedShirtModel();

  // References for materials to update colors
  const shirtMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const collarMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const leftSleeveMaterialRef = useRef<THREE.MeshStandardMaterial>(null);
  const rightSleeveMaterialRef = useRef<THREE.MeshStandardMaterial>(null);

  // Create textures for logo
  const logoTexture = useTexture(
    logoUrl || "/placeholder.svg?height=1&width=1"
  );

  // Animation springs for shirt components
  const [springs, api] = useSpring(() => ({
    scale: [1, 1, 1],
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  // Animation springs for text
  const [textSprings, textApi] = useSpring(() => ({
    scale: [1, 1, 1],
    opacity: 1,
    config: { mass: 1, tension: 280, friction: 60 },
  }));

  // Trigger animations when props change
  useEffect(() => {
    if (animate) {
      // Subtle "pop" animation
      api.start({
        scale: [1.03, 1.03, 1.03],
        position: [0, 0.05, 0],
        rotation: [0, 0, 0],
        config: { tension: 300, friction: 10 },
      });

      // Return to normal
      setTimeout(() => {
        api.start({
          scale: [1, 1, 1],
          position: [0, 0, 0],
          rotation: [0, 0, 0],
          config: { tension: 150, friction: 15 },
        });
      }, 300);

      // Text animation
      textApi.start({
        scale: [1.1, 1.1, 1.1],
        opacity: 0.7,
        config: { tension: 300, friction: 10 },
      });

      setTimeout(() => {
        textApi.start({
          scale: [1, 1, 1],
          opacity: 1,
          config: { tension: 150, friction: 15 },
        });
      }, 300);
    }
  }, [animate, api, textApi, lastColorChange, logoPosition, textStyle]);

  // Handle text positioning based on style
  const getTextPosition = () => {
    switch (textStyle) {
      case "curved":
        return [0, 0.05, 0.15];
      case "arched":
        return [0, 0.1, 0.15];
      default: // straight
        return [0, 0, 0.15];
    }
  };

  const getTextRotation = () => {
    switch (textStyle) {
      case "curved":
        return [-0.1, 0, 0];
      case "arched":
        return [0.1, 0, 0];
      default: // straight
        return [0, 0, 0];
    }
  };

  // Get logo position based on selected position
  const getLogoPosition = () => {
    switch (logoPosition) {
      case "chest":
        return [0, 0.1, 0.15];
      case "back":
        return [0, 0.1, -0.15];
      case "sleeve":
        return [0.25, 0.1, 0.12];
      case "sponsor":
        return [0, -0.2, 0.15];
      default:
        return [0, 0.1, 0.15];
    }
  };

  const getLogoScale = () => {
    switch (logoPosition) {
      case "sleeve":
        return 0.1;
      case "sponsor":
        return 0.15;
      default:
        return 0.2;
    }
  };

  // Subtle breathing animation
  useFrame((state, delta) => {
    if (group.current && !animate) {
      // Very subtle breathing effect
      const t = state.clock.getElapsedTime();
      group.current.position.y = Math.sin(t * 0.5) * 0.01;

      if (isRotating) {
        group.current.rotation.y += delta * 0.3;
      }
    }

    // Smoothly transition shirt color
    if (shirtMaterialRef.current) {
      easing.dampC(
        shirtMaterialRef.current.color,
        new THREE.Color(color),
        0.25,
        delta
      );
    }

    // Transition collar color
    if (collarMaterialRef.current) {
      easing.dampC(
        collarMaterialRef.current.color,
        new THREE.Color(accentColor1),
        0.25,
        delta
      );
    }

    // Transition sleeve colors
    if (leftSleeveMaterialRef.current && rightSleeveMaterialRef.current) {
      easing.dampC(
        leftSleeveMaterialRef.current.color,
        new THREE.Color(accentColor2),
        0.25,
        delta
      );
      easing.dampC(
        rightSleeveMaterialRef.current.color,
        new THREE.Color(accentColor2),
        0.25,
        delta
      );
    }
  });

  return (
    <animated.group
      ref={group}
      dispose={null}
      scale={springs.scale}
      position={springs.position}
      rotation={springs.rotation}
    >
      <group scale={[1.5, 1.5, 1.5]}>
        {/* Main shirt body */}
        <mesh geometry={nodes.Shirt.geometry} castShadow receiveShadow>
          <meshStandardMaterial
            ref={shirtMaterialRef}
            color={color}
            roughness={0.6}
            metalness={0.1}
          />

          {/* Front logo decal */}
          {logoUrl && logoPosition === "chest" && (
            <Decal
              position={new THREE.Vector3(...getLogoPosition())}
              rotation={[0, 0, 0]}
              scale={getLogoScale()}
              map={logoTexture}
            />
          )}

          {/* Back logo decal */}
          {logoUrl && logoPosition === "back" && (
            <Decal
              position={new THREE.Vector3(...getLogoPosition())}
              rotation={[0, Math.PI, 0]}
              scale={getLogoScale()}
              map={logoTexture}
            />
          )}

          {/* Sponsor logo decal */}
          {logoUrl && logoPosition === "sponsor" && (
            <Decal
              position={new THREE.Vector3(...getLogoPosition())}
              rotation={[0, 0, 0]}
              scale={getLogoScale()}
              map={logoTexture}
            />
          )}

          {/* Front number text */}
          <animated.group
            scale={textSprings.scale}
            opacity={textSprings.opacity}
          >
            <Text
              position={[0, -0.1, 0.15]}
              rotation={[0, 0, 0]}
              fontSize={0.2}
              color={textColor}
              anchorX="center"
              anchorY="middle"
              outlineWidth={hasOutline ? 0.01 : 0}
              outlineColor={outlineColor}
              font="/fonts/Inter_Bold.json"
            >
              {textContent}
            </Text>
          </animated.group>

          {/* Team name text */}
          <animated.group
            scale={textSprings.scale}
            opacity={textSprings.opacity}
          >
            <Text
              position={getTextPosition()}
              rotation={getTextRotation()}
              fontSize={0.08}
              color={textColor}
              anchorX="center"
              anchorY="middle"
              outlineWidth={hasOutline ? 0.005 : 0}
              outlineColor={outlineColor}
              font="/fonts/Inter_Bold.json"
              curveRadius={
                textStyle === "curved" ? 0.5 : textStyle === "arched" ? -0.5 : 0
              }
            >
              {textContent2}
            </Text>
          </animated.group>

          {/* Back number text */}
          <animated.group
            scale={textSprings.scale}
            opacity={textSprings.opacity}
          >
            <Text
              position={[0, 0, -0.15]}
              rotation={[0, Math.PI, 0]}
              fontSize={0.25}
              color={textColor}
              anchorX="center"
              anchorY="middle"
              outlineWidth={hasOutline ? 0.01 : 0}
              outlineColor={outlineColor}
              font="/fonts/Inter_Bold.json"
            >
              {textContent}
            </Text>
          </animated.group>
        </mesh>

        {/* Collar */}
        <mesh geometry={nodes.Collar.geometry} castShadow receiveShadow>
          <meshStandardMaterial
            ref={collarMaterialRef}
            color={accentColor1}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>

        {/* Left sleeve */}
        <mesh geometry={nodes.LeftSleeve.geometry} castShadow receiveShadow>
          <meshStandardMaterial
            ref={leftSleeveMaterialRef}
            color={accentColor2}
            roughness={0.6}
            metalness={0.1}
          />

          {/* Sleeve logo decal */}
          {logoUrl && logoPosition === "sleeve" && (
            <Decal
              position={new THREE.Vector3(0, 0, 0.12)}
              rotation={[0, -Math.PI / 2, 0]}
              scale={getLogoScale()}
              map={logoTexture}
            />
          )}
        </mesh>

        {/* Right sleeve */}
        <mesh geometry={nodes.RightSleeve.geometry} castShadow receiveShadow>
          <meshStandardMaterial
            ref={rightSleeveMaterialRef}
            color={accentColor2}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      </group>
    </animated.group>
  );
}

// Custom hook to create a detailed shirt model
function useDetailedShirtModel() {
  // Create geometries for a more detailed shirt
  const nodes = useMemo(() => {
    // Create a more detailed shirt body
    const shirtGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 16, 3);
    shirtGeometry.translate(0, 0, 0);
    // Modify vertices to create a more realistic shirt shape
    const shirtPositionAttribute = shirtGeometry.getAttribute("position");
    const shirtVertices = shirtPositionAttribute.array;
    for (let i = 0; i < shirtVertices.length; i += 3) {
      // Add some natural curvature to the shirt
      if (shirtVertices[i + 1] < 0) {
        // Taper the bottom
        shirtVertices[i] *= 0.9 + (shirtVertices[i + 1] + 0.4) * 0.25;
        shirtVertices[i + 2] *= 0.9 + (shirtVertices[i + 1] + 0.4) * 0.25;
      }

      // Add some natural bulge to the front
      if (shirtVertices[i + 2] > 0) {
        shirtVertices[i + 2] +=
          0.05 * Math.sin((shirtVertices[i + 1] + 0.4) * Math.PI);
      }
    }
    shirtPositionAttribute.needsUpdate = true;
    shirtGeometry.computeVertexNormals();

    // Create a collar
    const collarGeometry = new THREE.TorusGeometry(
      0.12,
      0.03,
      16,
      32,
      Math.PI * 1.5
    );
    collarGeometry.rotateX(Math.PI / 2);
    collarGeometry.translate(0, 0.35, 0);

    // Create left sleeve
    const leftSleeveGeometry = new THREE.CylinderGeometry(
      0.08,
      0.06,
      0.25,
      8,
      1,
      true
    );
    leftSleeveGeometry.rotateZ(Math.PI / 3);
    leftSleeveGeometry.translate(-0.25, 0.2, 0);

    // Create right sleeve
    const rightSleeveGeometry = new THREE.CylinderGeometry(
      0.08,
      0.06,
      0.25,
      8,
      1,
      true
    );
    rightSleeveGeometry.rotateZ(-Math.PI / 3);
    rightSleeveGeometry.translate(0.25, 0.2, 0);

    return {
      Shirt: { geometry: shirtGeometry } as unknown as THREE.Mesh,
      Collar: { geometry: collarGeometry } as unknown as THREE.Mesh,
      LeftSleeve: { geometry: leftSleeveGeometry } as unknown as THREE.Mesh,
      RightSleeve: { geometry: rightSleeveGeometry } as unknown as THREE.Mesh,
    };
  }, []);

  // Create materials
  const materials = useMemo(() => {
    return {
      ShirtMaterial: new THREE.MeshStandardMaterial({
        color: "#ffffff",
        roughness: 0.6,
        metalness: 0.1,
      }),
      CollarMaterial: new THREE.MeshStandardMaterial({
        color: "#4a90e2",
        roughness: 0.6,
        metalness: 0.1,
      }),
      SleeveMaterial: new THREE.MeshStandardMaterial({
        color: "#e74c3c",
        roughness: 0.6,
        metalness: 0.1,
      }),
    };
  }, []);

  return { nodes, materials };
}
