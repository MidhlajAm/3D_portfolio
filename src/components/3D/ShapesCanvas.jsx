import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ContactShadows, Environment, RoundedBox } from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';

const SHAPES = [
  {
    id: 'blue-cylinder',
    type: 'cylinder',
    anchor: [-0.32, 0.28, 0],
    tabletAnchor: [-0.34, 0.28, 0],
    mobileAnchor: [-0.36, 0.31, 0],
    rotation: [0.36, 0.22, -0.48],
    scale: 0.74,
    color: '#168FE3',
    emissive: '#168FE3',
    motion: { speed: 1.05, amplitude: 0.13, phase: 0.4, spin: 0.08 },
  },
  {
    id: 'coral-pyramid',
    type: 'pyramid',
    anchor: [-0.35, 0.04, 0.12],
    tabletAnchor: [-0.36, 0.05, 0.12],
    mobileAnchor: [-0.36, 0.08, 0.12],
    rotation: [0.25, 0.65, -0.15],
    scale: 0.75,
    color: '#FF5C28',
    emissive: '#FF5C28',
    motion: { speed: 0.98, amplitude: 0.11, phase: 1.8, spin: -0.07 },
  },
  {
    id: 'lavender-sphere',
    type: 'sphere',
    anchor: [-0.27, -0.31, -0.04],
    tabletAnchor: [-0.29, -0.31, -0.04],
    mobileAnchor: [-0.34, -0.31, -0.04],
    rotation: [0, 0, 0],
    scale: 0.78,
    color: '#9D62D9',
    emissive: '#9D62D9',
    motion: { speed: 0.9, amplitude: 0.12, phase: 2.7, spin: 0.055 },
  },
  {
    id: 'gold-rounded-cube',
    type: 'roundedCube',
    anchor: [0.29, 0.29, 0.05],
    tabletAnchor: [0.32, 0.29, 0.05],
    mobileAnchor: [0.36, 0.31, 0.05],
    rotation: [0.48, -0.46, 0.36],
    scale: 0.72,
    color: '#F6A51E',
    emissive: '#F6A51E',
    motion: { speed: 1.0, amplitude: 0.12, phase: 3.4, spin: 0.075 },
  },
  {
    id: 'cyan-puffy-star',
    type: 'puffyStar',
    anchor: [0.34, 0.04, 0],
    tabletAnchor: [0.36, 0.04, 0],
    mobileAnchor: [0.36, 0.08, 0],
    rotation: [0.18, -0.3, 0.16],
    scale: 0.7,
    color: '#74DDE0',
    emissive: '#74DDE0',
    motion: { speed: 0.96, amplitude: 0.1, phase: 4.35, spin: -0.06 },
  },
  {
    id: 'lime-rounded-block',
    type: 'limeBlock',
    anchor: [0.29, -0.3, -0.05],
    tabletAnchor: [0.32, -0.31, -0.05],
    mobileAnchor: [0.35, -0.31, -0.05],
    rotation: [0.65, -0.42, 0.38],
    scale: 0.72,
    color: '#92D000',
    emissive: '#92D000',
    motion: { speed: 0.92, amplitude: 0.12, phase: 5.1, spin: 0.065 },
  },
];

function ShapeMaterial({ color, emissive }) {
  return (
    <meshPhysicalMaterial
      color={color}
      emissive={emissive ?? color}
      emissiveIntensity={0.05}
      metalness={0.02}
      roughness={0.15}
      clearcoat={0.6}
      clearcoatRoughness={0.1}
    />
  );
}

// Builds a pyramid with rounded/chamfered vertical edges and a softly blunted
// tip, instead of the sharp creases you get from a plain coneGeometry. Uses
// the same quadratic-bezier corner-rounding technique as the puffy star,
// lofted from a wide rounded base up to a small rounded tip.
function createRoundedPyramidGeometry({
  baseRadius = 0.72,
  height = 1.05,
  sides = 4,
  cornerFraction = 0.34, // how rounded the vertical edges are (0 = sharp, ~0.4 = very puffy)
  heightSegments = 22,
  radialCornerSegments = 6,
  tipRadius = 0.045, // small flat tip instead of a sharp point
} = {}) {
  const positions = [];
  const indices = [];
  const startAngle = -Math.PI / 2 + Math.PI / sides;

  function buildOutline(cornerFrac) {
    const corners = [];
    for (let i = 0; i < sides; i += 1) {
      const angle = startAngle + (i * 2 * Math.PI) / sides;
      corners.push(new THREE.Vector2(Math.cos(angle), Math.sin(angle)));
    }
    const pts = [];
    corners.forEach((corner, index) => {
      const prev = corners[(index - 1 + corners.length) % corners.length];
      const next = corners[(index + 1) % corners.length];
      const toPrev = prev.clone().sub(corner);
      const toNext = next.clone().sub(corner);
      const start = corner.clone().add(toPrev.clone().multiplyScalar(cornerFrac));
      const end = corner.clone().add(toNext.clone().multiplyScalar(cornerFrac));
      for (let s = 0; s <= radialCornerSegments; s += 1) {
        const tt = s / radialCornerSegments;
        const a = start.clone().lerp(corner, tt);
        const b = corner.clone().lerp(end, tt);
        pts.push(a.lerp(b, tt));
      }
    });
    return pts;
  }

  const outline = buildOutline(cornerFraction);
  const ringCount = outline.length;

  // Constant-slope taper all the way to the tip. (A plateau-then-flatten curve
  // here creates a thin vertical "chimney" just below the cap, which reads as
  // a spike once lit — keeping the slope constant avoids that.)
  const layers = [];
  for (let i = 0; i <= heightSegments; i += 1) {
    const t = i / heightSegments;
    const y = -height / 2 + t * height;
    const r = THREE.MathUtils.lerp(baseRadius, tipRadius, t);
    layers.push({ y, r });
  }

  layers.forEach((layer) => {
    outline.forEach((p) => positions.push(p.x * layer.r, layer.y, p.y * layer.r));
  });

  const baseCenterIndex = layers.length * ringCount;
  positions.push(0, -height / 2, 0);
  const topCenterIndex = baseCenterIndex + 1;
  positions.push(0, height / 2, 0);

  for (let li = 0; li < layers.length - 1; li += 1) {
    for (let ri = 0; ri < ringCount; ri += 1) {
      const riNext = (ri + 1) % ringCount;
      const a = li * ringCount + ri;
      const b = li * ringCount + riNext;
      const c = (li + 1) * ringCount + ri;
      const d = (li + 1) * ringCount + riNext;
      indices.push(a, c, b, b, c, d);
    }
  }

  const lastLayer = layers.length - 1;
  for (let ri = 0; ri < ringCount; ri += 1) {
    const riNext = (ri + 1) % ringCount;
    indices.push(lastLayer * ringCount + riNext, lastLayer * ringCount + ri, topCenterIndex);
  }
  for (let ri = 0; ri < ringCount; ri += 1) {
    const riNext = (ri + 1) % ringCount;
    indices.push(ri, riNext, baseCenterIndex);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

// Builds a cylinder with softly rounded top/bottom rims (a "pill" profile)
// instead of the sharp 90° edges a plain cylinderGeometry has. Revolves a 2D
// profile — flat cap, quarter-circle rim, straight side, quarter-circle rim,
// flat cap — around the vertical axis.
function createRoundedCylinderGeometry({
  radius = 0.52,
  height = 1.15,
  rim = 0.16,
  radialSegments = 64,
  cornerSegments = 10,
} = {}) {
  const points = [];
  const halfHeight = height / 2;
  const straightR = Math.max(0.001, radius - rim);

  points.push(new THREE.Vector2(0, -halfHeight)); // bottom center
  points.push(new THREE.Vector2(straightR, -halfHeight)); // flat bottom
  for (let i = 1; i <= cornerSegments; i += 1) {
    const a = -Math.PI / 2 + (i / cornerSegments) * (Math.PI / 2);
    points.push(new THREE.Vector2(straightR + Math.cos(a) * rim, -halfHeight + rim + Math.sin(a) * rim));
  }
  // straight side is the implicit segment between the two corner arcs
  for (let i = 1; i <= cornerSegments; i += 1) {
    const a = (i / cornerSegments) * (Math.PI / 2);
    points.push(new THREE.Vector2(straightR + Math.cos(a) * rim, halfHeight - rim + Math.sin(a) * rim));
  }
  points.push(new THREE.Vector2(0, halfHeight)); // top center

  const geometry = new THREE.LatheGeometry(points, radialSegments);
  geometry.computeVertexNormals();
  return geometry;
}

function RoundedCylinderMesh({ color, emissive }) {
  const geometry = useMemo(() => createRoundedCylinderGeometry(), []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <ShapeMaterial color={color} emissive={emissive} />
    </mesh>
  );
}

function PyramidMesh({ color, emissive }) {
  const geometry = useMemo(() => createRoundedPyramidGeometry(), []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <ShapeMaterial color={color} emissive={emissive} />
    </mesh>
  );
}

function createPuffyStarGeometry() {
  const starShape = new THREE.Shape();
  const points = [];
  const outerRadius = 0.82;
  const innerRadius = 0.38;
  const cornerSoftness = 0.24;
  const startAngle = -Math.PI / 2;

  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = startAngle + (i * Math.PI) / 5;
    points.push(new THREE.Vector2(Math.cos(angle) * radius, Math.sin(angle) * radius));
  }

  points.forEach((point, index) => {
    const previous = points[(index - 1 + points.length) % points.length];
    const next = points[(index + 1) % points.length];
    const start = point.clone().lerp(previous, cornerSoftness);
    const end = point.clone().lerp(next, cornerSoftness);

    if (index === 0) starShape.moveTo(start.x, start.y);
    else starShape.lineTo(start.x, start.y);

    starShape.quadraticCurveTo(point.x, point.y, end.x, end.y);
  });

  const geometry = new THREE.ExtrudeGeometry(starShape, {
    depth: 0.38,
    bevelEnabled: true,
    bevelThickness: 0.12,
    bevelSize: 0.12,
    bevelSegments: 16,
    curveSegments: 24,
  });

  geometry.center();
  geometry.computeVertexNormals();

  return geometry;
}

function PuffyStarMesh({ color, emissive }) {
  const geometry = useMemo(() => createPuffyStarGeometry(), []);

  return (
    <mesh geometry={geometry} castShadow receiveShadow>
      <ShapeMaterial color={color} emissive={emissive} />
    </mesh>
  );
}

function ShapeGeometry({ type, color, emissive }) {
  if (type === 'cylinder') {
    return <RoundedCylinderMesh color={color} emissive={emissive} />;
  }

  if (type === 'pyramid') {
    return <PyramidMesh color={color} emissive={emissive} />;
  }

  if (type === 'sphere') {
    return (
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.72, 64, 64]} />
        <ShapeMaterial color={color} emissive={emissive} />
      </mesh>
    );
  }

  if (type === 'roundedCube') {
    return (
      <RoundedBox args={[0.95, 0.95, 0.95]} radius={0.18} smoothness={8} castShadow receiveShadow>
        <ShapeMaterial color={color} emissive={emissive} />
      </RoundedBox>
    );
  }

  if (type === 'limeBlock') {
    return (
      <RoundedBox args={[0.92, 0.92, 0.92]} radius={0.26} smoothness={12} castShadow receiveShadow>
        <ShapeMaterial color={color} emissive={emissive} />
      </RoundedBox>
    );
  }

  return <PuffyStarMesh color={color} emissive={emissive} />;
}

function getResponsiveTransform(shape, viewport) {
  const isMobile = viewport.width < 4.8;
  const isTablet = viewport.width >= 4.8 && viewport.width < 7;
  const anchor = isMobile ? shape.mobileAnchor : isTablet ? shape.tabletAnchor : shape.anchor;
  const scaleMultiplier = THREE.MathUtils.clamp(viewport.width / 7.35, 0.58, 1.08);
  const verticalGuard = isMobile ? 0.9 : 0.96;

  return {
    position: [viewport.width * anchor[0], viewport.height * anchor[1] * verticalGuard, anchor[2]],
    scale: shape.scale * scaleMultiplier,
    motionScale: scaleMultiplier,
  };
}
function FloatingShape({ shape }) {
  const groupRef = useRef(null);
  const { viewport } = useThree();
  const responsive = getResponsiveTransform(shape, viewport);

  useFrame(({ clock, pointer }) => {
    if (!groupRef.current) return;

    const elapsed = clock.getElapsedTime();
    const { amplitude, phase, speed, spin } = shape.motion;
    const floatWave = Math.sin(elapsed * speed + phase);
    const slowWave = Math.sin(elapsed * speed * 0.55 + phase);
    const targetX = shape.rotation[0] + slowWave * 0.075 + pointer.y * 0.08;
    const targetY = shape.rotation[1] + elapsed * spin + Math.cos(elapsed * speed * 0.45 + phase) * 0.055 + pointer.x * 0.1;
    const targetZ = shape.rotation[2] + Math.sin(elapsed * speed * 0.42 + phase) * 0.06;

    groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, responsive.position[0], 0.08);
    groupRef.current.position.y = responsive.position[1] + floatWave * amplitude * responsive.motionScale;
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, responsive.position[2], 0.08);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.045);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.045);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetZ, 0.045);
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, responsive.scale, 0.08));
  });

  return (
    <group ref={groupRef} position={responsive.position} rotation={shape.rotation} scale={responsive.scale}>
      <ShapeGeometry type={shape.type} color={shape.color} emissive={shape.emissive} />
    </group>
  );
}

function ShapesScene() {
  const shapes = useMemo(() => SHAPES, []);

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[4, 5, 6]}
        intensity={1.8}
        castShadow
        shadow-bias={-0.0004}
        shadow-mapSize={[2048, 2048]}
      />
      <directionalLight position={[-4, 2, 3]} intensity={0.6} color="#ffffff" />

      {shapes.map((shape) => (
        <FloatingShape key={shape.id} shape={shape} />
      ))}

      <ContactShadows
        position={[0, -2.18, 0]}
        opacity={0.28}
        blur={2.5}
        scale={8}
        far={4.5}
        resolution={1024}
        color="#cbd5e1"
      />
      <Environment preset="studio" environmentIntensity={0.7} />
    </>
  );
}

export default function ShapesCanvas() {
  return (
    <Canvas
      className="absolute inset-0 z-10 h-full w-full"
      camera={{ position: [0, 0, 10], fov: 30 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      shadows
    >
      <ShapesScene />
    </Canvas>
  );
}