"use client";

import { useRef, useEffect } from "react";
import { useThree, useFrame } from "@react-three/fiber";
import { useSpring } from "@react-spring/three";
import * as THREE from "three";

interface SceneCameraProps {
  currentView: string;
  isRotating: boolean;
}

export default function SceneCamera({
  currentView,
  isRotating,
}: SceneCameraProps) {
  const { camera } = useThree();
  const cameraRef = useRef(camera);

  // Store the target position based on the current view
  const targetPosition = useRef(new THREE.Vector3(0, 0, 2.5));

  // Create a spring for smooth camera transitions
  const [spring, api] = useSpring(() => ({
    position: [0, 0, 2.5],
    config: { mass: 1, tension: 180, friction: 30 },
  }));

  // Update target position when view changes
  useEffect(() => {
    switch (currentView) {
      case "front":
        targetPosition.current.set(0, 0, 2.5);
        break;
      case "back":
        targetPosition.current.set(0, 0, -2.5);
        break;
      case "left":
        targetPosition.current.set(-2.5, 0, 0);
        break;
      case "right":
        targetPosition.current.set(2.5, 0, 0);
        break;
      default:
        targetPosition.current.set(0, 0, 0);
    }

    // Animate to the new position
    api.start({
      position: [
        targetPosition.current.x,
        targetPosition.current.y,
        targetPosition.current.z,
      ],
    });
  }, [currentView, api]);

  // Apply the spring values to the camera
  useFrame(() => {
    if (!isRotating) {
      const [x, y, z] = spring.position.get();
      camera.position.set(x, y, z);
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
}
