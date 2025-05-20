// Custom hook to create a detailed shirt model
import { useMemo } from "react";
import * as THREE from "three";

export function useDetailedShirtModel(): {
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
} {
  // Create geometries for a more detailed shirt
  const nodes = useMemo(() => {
    // Create a more detailed shirt body
    const shirtGeometry = new THREE.CylinderGeometry(0.3, 0.25, 0.8, 16, 3);
    shirtGeometry.translate(0, 0, 0);
    // Modify vertices to create a more realistic shirt shape
    const shirtPositionAttribute = shirtGeometry.getAttribute("position");
    const shirtVertices = shirtPositionAttribute.array as Float32Array;

    for (let i = 0; i < shirtVertices.length; i += 3) {
      const x = shirtVertices[i]!;
      const y = shirtVertices[i + 1]!;
      const z = shirtVertices[i + 2]!;

      let newX = x;
      let newZ = z;

      if (y < 0) {
        const factor = 0.9 + (y + 0.4) * 0.25;
        newX = x * factor;
        newZ = z * factor;
      }

      if (z > 0) {
        newZ += 0.05 * Math.sin((y + 0.4) * Math.PI);
      }

      shirtVertices[i] = newX;
      shirtVertices[i + 2] = newZ;
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
