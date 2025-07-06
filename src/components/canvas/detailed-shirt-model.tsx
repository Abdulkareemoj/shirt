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
  // Create materials once
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

  // Create geometries and meshes once
  const nodes = useMemo(() => {
    // Shirt geometry
    const shirtGeometry = new THREE.CylinderGeometry(0.35, 0.3, 1.1, 24, 6);

    // Modify vertices for more realistic shape
    const positionAttr = shirtGeometry.getAttribute("position");
    const vertices = positionAttr.array as Float32Array;

    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i]!;
      const y = vertices[i + 1]!;
      const z = vertices[i + 2]!;

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

      vertices[i] = newX;
      vertices[i + 2] = newZ;
    }

    positionAttr.needsUpdate = true;
    shirtGeometry.computeVertexNormals();

    // Collar geometry
    const collarGeometry = new THREE.TorusGeometry(0.15, 0.025, 16, 32);
    collarGeometry.rotateX(Math.PI / 2);
    collarGeometry.translate(0, 0.55, 0);

    // Left sleeve geometry
    const leftSleeveGeometry = new THREE.CylinderGeometry(
      0.12,
      0.1,
      0.25,
      16,
      2,
      true
    );
    leftSleeveGeometry.rotateZ(Math.PI / 2.5);
    leftSleeveGeometry.translate(-0.38, 0.3, 0);

    // Right sleeve geometry
    const rightSleeveGeometry = new THREE.CylinderGeometry(
      0.12,
      0.1,
      0.25,
      16,
      2,
      true
    );
    rightSleeveGeometry.rotateZ(-Math.PI / 2.5);
    rightSleeveGeometry.translate(0.38, 0.3, 0);

    // Create meshes with materials
    const Shirt = new THREE.Mesh(shirtGeometry, materials.ShirtMaterial);
    const Collar = new THREE.Mesh(collarGeometry, materials.CollarMaterial);
    const LeftSleeve = new THREE.Mesh(
      leftSleeveGeometry,
      materials.SleeveMaterial
    );
    const RightSleeve = new THREE.Mesh(
      rightSleeveGeometry,
      materials.SleeveMaterial
    );

    return { Shirt, Collar, LeftSleeve, RightSleeve };
  }, [materials]);

  return { nodes, materials };
}
