"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";

// Define the type for our GLTF result
type GLTFResult = GLTF & {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.MeshStandardMaterial;
  };
};

interface UseShirtModelProps {
  modelUrl?: string;
}

export function useShirtModel({
  modelUrl = "/models/shirt.glb", // Default fallback model
}: UseShirtModelProps = {}) {
  // Load the GLTF model
  const gltf = useGLTF(modelUrl) as unknown as GLTFResult;

  // Extract and prepare the model data
  const modelData = useMemo(() => {
    if (!gltf) return null;

    // Find the main shirt mesh (usually the largest mesh or named appropriately)
    const meshes = Object.values(gltf.nodes).filter(
      (node) => node instanceof THREE.Mesh
    );
    const mainMesh =
      meshes.find(
        (mesh) =>
          mesh.name.toLowerCase().includes("shirt") ||
          mesh.name.toLowerCase().includes("body") ||
          mesh.name.toLowerCase().includes("main")
      ) || meshes[0]; // Fallback to first mesh

    // Find additional parts if they exist
    const collar = meshes.find(
      (mesh) =>
        mesh.name.toLowerCase().includes("collar") ||
        mesh.name.toLowerCase().includes("neck")
    );

    const leftSleeve = meshes.find(
      (mesh) =>
        mesh.name.toLowerCase().includes("sleeve") &&
        (mesh.name.toLowerCase().includes("left") ||
          mesh.name.toLowerCase().includes("l_"))
    );

    const rightSleeve = meshes.find(
      (mesh) =>
        mesh.name.toLowerCase().includes("sleeve") &&
        (mesh.name.toLowerCase().includes("right") ||
          mesh.name.toLowerCase().includes("r_"))
    );

    // If no specific sleeves found, look for any sleeve meshes
    const sleeves = meshes.filter((mesh) =>
      mesh.name.toLowerCase().includes("sleeve")
    );

    return {
      nodes: {
        Shirt: mainMesh,
        Collar: collar,
        LeftSleeve: leftSleeve || sleeves[0],
        RightSleeve: rightSleeve || sleeves[1] || sleeves[0],
        // Include all meshes for flexibility
        ...gltf.nodes,
      },
      materials: gltf.materials,
      scene: gltf.scene,
    };
  }, [gltf]);

  return modelData;
}

// Preload the default model
useGLTF.preload("/models/shirt.glb");
